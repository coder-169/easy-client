import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dob: { type: String, required: true },
    cnic: { type: String, required: true },
    avatar: { type: String, default: null },
    isVerified: {
      type: Boolean,
      default: false,
    },
    code: {
      code: {
        type: String,
      },
      expiry: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
