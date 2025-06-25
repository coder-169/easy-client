/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
import { getSession, useSession } from "next-auth/react";
import { toast } from "sonner";

export const TransactionContext = React.createContext({});
declare global {
  interface Window {
    ethereum?: any;
  }
}

const createEthereumContract = () => {
  // Move window access inside function
  if (typeof window === "undefined") return null;
  const { ethereum } = window;

  if (!ethereum) return null;

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
  const { data: session } = useSession();
  const [formData, setformData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState("");
  const [transactions, setTransactions] = useState([]);

  // Initialize transactionCount from localStorage only on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTransactionCount(localStorage.getItem("transactionCount") || "");
    }
  }, []);

  const handleChangeData = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getAllTransactions = async () => {
    if (typeof window === "undefined") return null;
    const { ethereum } = window;
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions =
          await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map(
          (transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(
              transaction.timestamp.toNumber() * 1000
            ).toLocaleString(),
            message: transaction.message,
            keyword: transaction.keyword,
            amount: parseInt(transaction.amount._hex) / 10 ** 18,
          })
        );

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    console.log("check wallet");
    try {
      if (typeof window === "undefined") return null;
      const { ethereum } = window;
      if (!ethereum) return alert("Please install MetaMask.");
      const accounts = await ethereum.request({ method: "eth_accounts" });

      const provider = new ethers.providers.Web3Provider(ethereum);
      const balance = await provider.getBalance(accounts[0]);
      const ethBalance = ethers.utils.formatEther(balance); // in ETH
      const fastSession = await getSession();
      console.log("enter zone");
      await fetch("/api/user/wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          id: fastSession?.user?._id,
        },
        body: JSON.stringify({
          address: accounts[0],
          balance: ethBalance,
        }),
      });

      console.log(accounts[0]);
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
    console.log("checked");
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (typeof window === "undefined") return null;
      const { ethereum } = window;
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const currentTransactionCount =
          await transactionsContract.getTransactionCount();

        window.localStorage.setItem(
          "transactionCount",
          currentTransactionCount
        );
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    console.log("called");
    try {
      if (typeof window === "undefined") return null;
      const { ethereum } = window;
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async () => {
    try {
      if (typeof window === "undefined") return null;
      const { ethereum } = window;
      toast.info("Transaction Processed!");
      if (ethereum) {
        const { addressTo, amount, keyword, message } = formData;
        const transactionsContract = createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: addressTo,
              gas: "0x5208",
              value: parsedAmount._hex,
            },
          ],
        });
        console.log(username);
        const transactionHash = await transactionsContract.addToBlockchain(
          addressTo,
          parsedAmount,
          message,
          keyword,
        );

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);

        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        toast.success(`Transaction Successful`);
        setIsLoading(false);

        const transactionsCount =
          await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };
  const convertToPkr = async (
    amount: string,
    keyword = "convert",
    message = "Conversion to Pkr"
  ) => {
    try {
      if (typeof window === "undefined") return null;
      const { ethereum } = window;
      toast.info("Converting!");
      if (ethereum) {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        const provider = new ethers.providers.Web3Provider(ethereum);
        const balance = await provider.getBalance(accounts[0]);
        const ethBalance = ethers.utils.formatEther(balance); // in ETH
        const fee = parseFloat(amount) * 0.05;
        const total = parseFloat(amount) + fee;
        if (total > parseFloat(ethBalance)) {
          toast.error("Insufficient balance!");
          return false;
        }
        const transactionsContract = createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: process.env.NEXT_PUBLIC_BANK_WALLET!,
              gas: "0x5208",
              value: parsedAmount._hex,
            },
          ],
        });
        const transactionHash = await transactionsContract.addToBlockchain(
          process.env.NEXT_PUBLIC_BANK_WALLET!,
          parsedAmount,
          message,
          keyword,
        );

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);

        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionsCount =
          await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
        return true;
      } else {
        console.log("No ethereum object");
        return false;
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChangeData,
        formData,
        convertToPkr,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
