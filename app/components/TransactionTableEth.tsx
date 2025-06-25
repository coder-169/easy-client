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

import {  formatDateTime } from "../lib/utils";
import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Skeleton } from "@/components/ui/skeleton";

const TransactionsTableEth = () => {
  // const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { transactions, currentAccount } = useContext(TransactionContext) as any;
  useEffect(() => {
    setLoading(false);
  }, []);
  return loading ? (
    <Skeleton className="w-full h-[40vh]" />
  ) : (
    <Table className="rounded-lg">
      <TableHeader className="bg-n-7 text-n-2 !rounded-lg">
        <TableRow>
          <TableHead className="px-2 max-md:hidden">Sender</TableHead>
          <TableHead className="px-2">Receiver</TableHead>
          <TableHead className="px-2">Amount</TableHead>
          <TableHead className="px-2">keyword</TableHead>
          <TableHead className="px-2">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions?.map((t: TransactionEthereum, idx: number) => {
          const amount = t.amount;
          const isDebit = t.addressFrom.toLowerCase() === currentAccount;
          const isCredit = t.addressFrom.toLowerCase() !== currentAccount;
          return (
            <TableRow
              key={idx}
              className={`${isDebit ? "bg-n-7/10" : "bg-n-7/40"} !over:bg-none`}
            >
              <TableCell className="max-w-[250px] pl-2 pr-10">
                <div className="flex items-center gap-3">
                  <h1 className="text-sm truncate font-semibold text-n-1">
                    {shortenAddress(t.addressFrom)}
                  </h1>
                </div>
              </TableCell>
              <TableCell className="max-w-[250px] pl-2 pr-10">
                <div className="flex items-center gap-3">
                  <p className="!text-xs truncate font-semibold text-n-1">
                    {shortenAddress(t.addressTo)}
                  </p>
                </div>
              </TableCell>
              <TableCell
                className={`pl-2 pr-10 font-semibold ${
                  isDebit ? "text-[#f04438]" : "text-[#039855]"
                }`}
              >
                {isDebit ? `-${amount}` : isCredit ? amount : amount}
              </TableCell>
              <TableCell className="pl-2 pr-10 text-n-1">{t.keyword}</TableCell>
              <TableCell className="min-w-32 pl-2 pr-10 text-n-1">
                {formatDateTime(new Date(t.timestamp)).dateTime}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionsTableEth;
