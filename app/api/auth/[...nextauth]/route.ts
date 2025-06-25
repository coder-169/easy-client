import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/app/models/User";
import dbConnect from "@/utils/db";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "johnboe@gmail.com",
        },
        username: { label: "Username", type: "text", placeholder: "JohnBoe" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials: { username: string; password: string }) {
        await dbConnect();

        if (!credentials.username || !credentials.password) {
          throw new Error("Missing credentials");
        }
        const user = await User.findOne({
          $or: [
            {
              username: { $regex: credentials.username, $options: "i" },
            },
            {
              email: { $regex: credentials.username, $options: "i" },
            },
          ],
        });
        if (!user) {
          throw new Error("Invalid credentials");
        }

        const passMatch = await bcrypt.compare(
          credentials?.password,
          user.password
        );
        // const passMatch = await bcrypt.compare(
        //   credentials.password,
        //   user.password
        // );
        if (!passMatch) throw new Error("Invalid credentials");

        return user;
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 7 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({
      session,
    }: {
      session: { user: { email: string; username: string } };
    }) {
      await dbConnect();
      // Enhanced pipeline to get complete user data with account info
      const pipeline = [
        {
          $match: {
            $or: [
              { email: session.user.email },
              { username: session.user.username },
            ],
          },
        },
        {
          $lookup: {
            from: "accounts", // The collection to join
            localField: "_id", // User's _id
            foreignField: "accountId", // Account's accountId (linked to user._id)
            as: "userAccount",
          },
        },
        {
          $unwind: {
            path: "$userAccount",
            preserveNullAndEmptyArrays: false, // Only include users with accounts
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: ["$userAccount", "$$ROOT"], // Merge account first (account fields will overwrite if names clash)
            },
          },
        },
        {
          $project: {
            userAccount: 0, // Remove the redundant array
          },
        },
      ];

      const result = await User.aggregate(pipeline).exec();

      if (!result) {
        throw new Error("User not found");
      }


      // Merge all data into the session.user object
      session.user = {
        ...session.user, // Keep original session data
        ...result[0], // Add all the user and account data
      };

      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
