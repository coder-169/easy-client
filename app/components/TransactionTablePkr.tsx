"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
//   import { transactionCategoryStyles } from "@/constants"

import { formatDateTime, removeSpecialCharacters } from "../lib/utils";
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const TransactionsTablePkr = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const getTransactions = async () => {
    const fastSession = await getSession();
    try {
      const resp = await fetch("/api/user/payment/history", {
        method: "GET",
        headers: {
          id: fastSession?.user?._id,
        },
      });

      const data = await resp.json();
      if (data.success) {
        setTransactions(data.allTransactions);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getTransactions();
  }, []);
  return loading ? (
    <Skeleton className="w-full h-[40vh]" />
  ) : transactions.length > 0 ? (
    <Table className="rounded-lg">
      <TableHeader className="bg-n-7 text-n-2 !rounded-lg">
        <TableRow>
          <TableHead className="px-2 max-md:hidden">Name</TableHead>
          <TableHead className="px-2">Sender</TableHead>
          <TableHead className="px-2">Receiver</TableHead>
          <TableHead className="px-2">Amount</TableHead>
          <TableHead className="px-2">Status</TableHead>
          <TableHead className="px-2">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions?.map((t: Transaction, idx: number) => {
          const amount = t.amount;
          const isDebit = t.amount < 0;
          const isCredit = t.amount > 0;

          return (
            <TableRow
              key={t._id + idx}
              className={`${
                isDebit || amount < 0 ? "bg-n-7/10" : "bg-n-7/40"
              } !over:bg-none`}
            >
              <TableCell className="max-w-[250px] pl-2 pr-10">
                <div className="flex items-center gap-3">
                  <h1 className="text-sm truncate font-semibold text-n-1">
                    {removeSpecialCharacters(t.name)}
                  </h1>
                </div>
              </TableCell>
              <TableCell className="max-w-[250px] pl-2 pr-10">
                <div className="flex items-center gap-3">
                  <p className="!text-xs truncate font-semibold text-n-1">
                    {t.senderAcc}
                  </p>
                </div>
              </TableCell>
              <TableCell className="max-w-[250px] pl-2 pr-10">
                <div className="flex items-center gap-3">
                  <p className="!text-xs truncate font-semibold text-n-1">
                    {t.receiverAcc}
                  </p>
                </div>
              </TableCell>
              <TableCell
                className={`pl-2 pr-10 font-semibold ${
                  isDebit || amount < 0 ? "text-[#f04438]" : "text-[#039855]"
                }`}
              >
                {isDebit ? `${amount}` : isCredit ? amount : amount}
              </TableCell>
              <TableCell className="pl-2 pr-10 text-n-1">
                {t.status === "Paid" ? (
                  <span className="text-green-500  px-2 py-1 text-xs">
                    {t.status}
                  </span>
                ) : (
                  <span className="text-blue-500  px-2 py-1 text-sm">
                    {t.status}
                  </span>
                )}
              </TableCell>
              <TableCell className="min-w-32 pl-2 pr-10 text-n-1">
                {formatDateTime(new Date(t.createdAt)).dateTime}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  ) : (
    <div className="flex h-64 flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold text-n-1">No Transactions</h2>
    </div>
  );
};

export default TransactionsTablePkr;
