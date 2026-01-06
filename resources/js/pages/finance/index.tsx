import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus, ArrowUpRight, ArrowDownLeft, Wallet, Landmark, CreditCard, Filter } from 'lucide-react';

interface Transaction {
    id: number;
    member?: {
        first_name: string;
        last_name: string;
    };
    amount: string;
    type: 'Income' | 'Expense';
    category: string;
    payment_method: string;
    transaction_date: string;
    description?: string;
}

interface Props {
    transactions: {
        data: Transaction[];
        links: any[];
    };
    summary: {
        total_income: number;
        total_expense: number;
        balance: number;
    };
    filters: {
        type?: string;
        category?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Finance',
        href: '/finance',
    },
];

const formatCurrency = (amount: number | string) => {
    return new Intl.NumberFormat('en-GH', {
        style: 'currency',
        currency: 'GHS',
    }).format(Number(amount));
};

export default function Index({ transactions, summary, filters }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Financial Management" />

            <div className="p-4 md:p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Finance</h1>
                        <p className="text-muted-foreground">
                            Track church income, expenses, and donations.
                        </p>
                    </div>
                    <Link href="/finance/create">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Record Transaction
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                            <ArrowUpRight className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{formatCurrency(summary.total_income)}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                            <ArrowDownLeft className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{formatCurrency(summary.total_expense)}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
                            <Wallet className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(summary.balance)}</div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Member/Description</TableHead>
                                    <TableHead>Method</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.data.length > 0 ? (
                                    transactions.data.map((tx) => (
                                        <TableRow key={tx.id}>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {new Date(tx.transaction_date).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${tx.type === 'Income'
                                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                    }`}>
                                                    {tx.category}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    {tx.member ? `${tx.member.first_name} ${tx.member.last_name}` : tx.description || '-'}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground italic">
                                                {tx.payment_method}
                                            </TableCell>
                                            <TableCell className={`text-right font-bold ${tx.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                                                {tx.type === 'Income' ? '+' : '-'}{formatCurrency(tx.amount)}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                            No transactions found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
