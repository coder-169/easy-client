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

const {ethereum} = window;

const createEthereumContract = (ethereum: any, currentAccount: string) => {

  try {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner(currentAccount);
    return new ethers.Contract(contractAddress, contractABI, signer);
  } catch (error) {
    console.error("Error creating contract:", error);
    return null;
  }
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTransactionCount(localStorage.getItem("transactionCount") || "");
    }
  }, []);

  const handleChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getAllTransactions = async () => {
    if (!currentAccount) return;

    try {
      if (!ethereum) {
        console.log("Ethereum provider not found");
        return;
      }

      const transactionsContract = createEthereumContract(
        ethereum,
        currentAccount
      );
      if (!transactionsContract) {
        console.log("Contract not initialized");
        return;
      }

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

      setTransactions(structuredTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error(error.message);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        toast.warning("Please install MetaMask.");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (!accounts || accounts.length === 0) {
        console.log("No accounts found");
        return;
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const balance = await provider.getBalance(accounts[0]);
      const ethBalance = ethers.utils.formatEther(balance);

      const fastSession = await getSession();
      if (fastSession?.user?._id) {
        await fetch("/api/user/wallet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            id: fastSession.user._id,
          },
          body: JSON.stringify({
            address: accounts[0],
            balance: ethBalance,
          }),
        });
      }

      setCurrentAccount(accounts[0]);
      await getAllTransactions();
    } catch (error) {
      console.error("Wallet connection error:", error);
      toast.error(error.message);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        toast.warning("Please install MetaMask.");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
        await checkIfWalletIsConnected(); // Refresh data after connection
      }
    } catch (error) {
      console.error("Wallet connection error:", error);
      toast.error(error.message);
    }
  };

  const sendTransaction = async () => {
    try {
      toast.info("Transaction Processed!");
      if (ethereum) {
        const { addressTo, amount, keyword, message } = formData;
        const transactionsContract = createEthereumContract(
          ethereum,
          currentAccount
        );
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
        const transactionHash = await transactionsContract.addToBlockchain(
          addressTo,
          parsedAmount,
          message,
          keyword
        );

        setIsLoading(true);

        await transactionHash.wait();
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
      throw new Error("No ethereum object");
    }
  };
  const convertToPkr = async (
    amount: string,
    keyword = "convert",
    message = "Conversion to Pkr"
  ) => {
    try {
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
        const transactionsContract = createEthereumContract(
          ethereum,
          accounts[0]
        );
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
          keyword
        );

        setIsLoading(true);

        await transactionHash.wait();
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
      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
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
