'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table"
//   import { transactionCategoryStyles } from "@/constants"

import { cn, formatDateTime, removeSpecialCharacters } from "../lib/utils"
import { transactionCategoryStyles } from "../constants"

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
    const {
        borderColor,
        backgroundColor,
        textColor,
        chipBackgroundColor,
    } = transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default
    console.log(borderColor)
    return (
        <div className={cn(`category-badge items-center border border-transparent rounded-full px-2 py-1 w-max flex gap-1 ${borderColor}`, borderColor, chipBackgroundColor)}>
            <div className={cn('size-2 rounded-full', backgroundColor)} />
            <p className={cn('text-[12px] font-medium capitalize', textColor)}>{category}</p>
        </div>
    )
}

const TransactionsTable = ({ transactions }: TransactionTableProps) => {
    return (
        <Table className="rounded-lg">
            <TableHeader className="bg-n-7 text-n-2 !rounded-lg">
                <TableRow>
                    <TableHead className="px-2 max-md:hidden">Name</TableHead>
                    <TableHead className="px-2">Transaction</TableHead>
                    <TableHead className="px-2">Amount</TableHead>
                    <TableHead className="px-2">Status</TableHead>
                    <TableHead className="px-2">Date</TableHead>
                    <TableHead className="px-2 max-md:hidden">Currency</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((t: Transaction) => {
                    const amount = t.amount

                    const isDebit = t.type === 'debit';
                    const isCredit = t.type === 'credit';

                    return (
                        <TableRow key={t._id} className={`${isDebit || amount < 0 ? 'bg-n-7/10' : 'bg-n-7/40'} !over:bg-none`}>
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
                                        {t.t_name}
                                    </p>
                                </div>
                            </TableCell>
                            <TableCell className={`pl-2 pr-10 font-semibold ${isDebit || amount < 0 ?
                                'text-[#f04438]'
                                : 'text-[#039855]'
                                }`}>
                                {isDebit ? `-${amount}` : isCredit ? amount : amount}
                            </TableCell>
                            <TableCell className="pl-2 pr-10 text-n-1">
                                <CategoryBadge category={t.status} />
                            </TableCell>
                            <TableCell className="min-w-32 pl-2 pr-10 text-n-1">
                                {formatDateTime(new Date(t.date)).dateTime}
                            </TableCell>
                            <TableCell className="pl-2 pr-10 capitalize min-w-24 text-n-1">
                                {t.currency}
                            </TableCell>
                            {/* <TableCell className="pl-2 pr-10 max-md:hidden">
                                <CategoryBadge category={t.category} />
                            </TableCell> */}
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}

export default TransactionsTable