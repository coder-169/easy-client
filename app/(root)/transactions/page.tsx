// "use client";
// import AnimatedCounter from "@/app/components/AnimatedCounter";
// import Heading from "@/app/components/Heading";
// import ProtectedRoute from "@/app/components/ProtectedRoute";
// import TransactionsTableEth from "@/app/components/TransactionTableEth";
// import TransactionsTable from "@/app/components/TransactionTableEth";
// import TransactionsTablePkr from "@/app/components/TransactionTablePkr";
// import { TransactionContext } from "@/app/context/TransactionContext";
// import { shortenAddress } from "@/app/utils/shortenAddress";
// import { useSession } from "next-auth/react";
// import React, { useContext, useState } from "react";
// import { FaCcVisa } from "react-icons/fa";
// import { SiEthereum } from "react-icons/si";
// const data = [
//   {
//     _id: "43287948923942342323432",
//     name: "Sajid Ali",
//     email: "mrsaad2129@gmail.com",
//     amount: 1234,
//     status: "Success",
//     category: "string",
//     date: "18-12-2024",
//     type: "credit",
//     currency: "Pkr",
//     senderAcc: "lorem",
//     receiverAcc: "lorem",
//     t_name: "Credit Card payment",
//   },
//   {
//     _id: "43287948923942342323432",
//     name: "Sajid Ali",
//     email: "mrsaad2129@gmail.com",
//     amount: -300,
//     status: "Processing",
//     category: "string",
//     date: "18-12-2024",
//     type: "credit",
//     currency: "Pkr",
//     senderAcc: "lorem",
//     receiverAcc: "lorem",
//     t_name: "Domain buying payment",
//   },
//   {
//     _id: "43287948923942342323432",
//     name: "Sajid Ali",
//     email: "mrsaad2129@gmail.com",
//     amount: 300,
//     status: "Failed",
//     category: "string",
//     date: "18-12-2024",
//     type: "credit",
//     currency: "Eth",
//     senderAcc: "lorem",
//     receiverAcc: "lorem",
//     t_name: "Domain buying payment",
//   },
// ];
// const Page = () => {
//   const [account, setAccount] = useState("eth");
//   const { currentAccount } = useContext(TransactionContext);
//   const { data: session } = useSession();
//   return (
//     <ProtectedRoute>
//       <div className="my-8 mx-16">
//         <div className="flex items-center justify-between">
//           <Heading
//             subtitle="Track your transactions over time"
//             title="Transaction History"
//           />
//           <select
//             onChange={() =>
//               setAccount((prev) => (prev === "eth" ? "pkr" : "eth"))
//             }
//             value={account}
//             className={`w-1/5 bg-transparent bg-opacity-30 text-gray-100 px-3 py-2 rounded-lg border block border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all duration-300 ease-in text-sm`}
//           >
//             <option value={"eth"} className="text-black">
//               Eth
//             </option>
//             <option value={"pkr"} className="text-black">
//               Pkr
//             </option>
//           </select>
//         </div>
//         <div className="my-4 bg-transparent bg-opacity-30 items-end p-4 rounded-xl border border-gray-600 flex justify-between">
//           <div>
//             <h3 className="text-sm text-gray-200">
//               Your Total Account Balance in {account === "eth" ? "Eth" : "Pkr"}
//             </h3>
//             <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism ">
//               <div className="flex justify-between flex-col w-full h-full">
//                 <div className="flex justify-between items-start">
//                   {account === "eth" ? (
//                     <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
//                       <SiEthereum fontSize={21} color="#fff" />
//                     </div>
//                   ) : (
//                     <FaCcVisa fontSize={21} color="#fff" />
//                   )}
//                   <span className="ml-32 inline-block text-white font-semibold">
//                     {account === "eth" ? "Ethereum" : "Pkr"}
//                   </span>
//                 </div>
//                 <div>
//                   {/* <p className=" font-light text-sm">......</p> */}
//                   <p className="text-white font-semibold mt-1 flex justify-between">
//                     <span className="uppercase">{session?.user?.username}</span>
//                     <span>●●/●●</span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="bg-n-6 bg-opacity-30 h-max p-8 rounded-xl border border-n-3">
//             <span className="text-n-2 block mb-1">Closing Balance</span>
//             <AnimatedCounter
//               amount={
//                 account === "eth"
//                   ? session?.user?.balanceEth
//                   : session?.user?.balancePkr
//               }
//               prefix="Rs. "
//               classes="font-semibold text-n-1"
//             />
//           </div>
//         </div>
//         <div className="mt-8">
//           <div className="flex justify-between mb-4">
//             <h3 className="text-xl font-semibold text-n-1">Transactions</h3>
//             {/* <button>Apply Filter</button> */}
//           </div>
//           {account === "eth" ? (
//             <TransactionsTableEth />
//           ) : (
//             <TransactionsTablePkr />
//           )}
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// };

// export default Page;
"use client";
import AnimatedCounter from "@/app/components/AnimatedCounter";
import Heading from "@/app/components/Heading";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import TransactionsTableEth from "@/app/components/TransactionTableEth";
import TransactionsTablePkr from "@/app/components/TransactionTablePkr";
import { TransactionContext } from "@/app/context/TransactionContext";
import { useSession } from "next-auth/react";
import React, { useContext, useState } from "react";
import { FaCcVisa } from "react-icons/fa";
import { SiEthereum } from "react-icons/si";

const Page = () => {
  const [account, setAccount] = useState("eth");
  const { currentAccount } = useContext(TransactionContext);
  const { data: session } = useSession();

  return (
    <ProtectedRoute>
      <div className="my-12 mx-2 sm:mx-4 md:mx-8 lg:mx-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Heading
            subtitle="Track your transactions over time"
            title="Transaction History"
          />
          <select
            onChange={() => setAccount((prev) => (prev === "eth" ? "pkr" : "eth"))}
            value={account}
            className={`w-full sm:w-1/3 md:w-1/5 bg-transparent bg-opacity-30 text-gray-100 px-3 py-2 rounded-lg border block border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all duration-300 ease-in text-sm`}
          >
            <option value={"eth"} className="text-black">
              Eth
            </option>
            <option value={"pkr"} className="text-black">
              Pkr
            </option>
          </select>
        </div>

        <div className="my-4 bg-transparent bg-opacity-30 items-end p-4 rounded-xl border border-gray-600 flex flex-col md:flex-row justify-between gap-4">
          <div className="w-full md:w-auto">
            <h3 className="text-sm text-gray-200">
              Your Total Account Balance in {account === "eth" ? "Eth" : "Pkr"}
            </h3>
            <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 w-full sm:w-72 my-3 md:my-5 eth-card white-glassmorphism">
              <div className="flex justify-between flex-col w-full h-full">
                <div className="flex justify-between items-start">
                  {account === "eth" ? (
                    <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                      <SiEthereum fontSize={21} color="#fff" />
                    </div>
                  ) : (
                    <FaCcVisa fontSize={21} color="#fff" />
                  )}
                  <span className="text-white font-semibold ml-auto">
                    {account === "eth" ? "Ethereum" : "Pkr"}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold mt-1 flex justify-between">
                    <span className="uppercase text-sm md:text-base">{session?.user?.username}</span>
                    <span className="text-sm md:text-base">●●/●●</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-n-6 bg-opacity-30 w-full md:w-auto p-4 sm:p-6 md:p-8 rounded-xl border border-n-3">
            <span className="text-n-2 block mb-1 text-sm md:text-base">Closing Balance</span>
            <AnimatedCounter
              amount={
                account === "eth"
                  ? session?.user?.balanceEth
                  : session?.user?.balancePkr
              }
              prefix={account === "eth" ? "ETH " : "Rs. "}
              classes="font-semibold text-n-1 text-lg md:text-xl"
            />
          </div>
        </div>

        <div className="mt-6 md:mt-8">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg md:text-xl font-semibold text-n-1">Transactions</h3>
          </div>
          {account === "eth" ? (
            <TransactionsTableEth />
          ) : (
            <TransactionsTablePkr />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Page;