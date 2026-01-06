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
import { Head } from '@inertiajs/react';
import { BarChart, Users, DollarSign, PieChart, TrendingUp } from 'lucide-react';

interface GrowthRecord {
    month: string;
    count: number;
}

interface FinancialRecord {
    category: string;
    type: string;
    total: string;
}

interface GenderDist {
    gender: string;
    count: number;
}

interface Props {
    membershipGrowth: GrowthRecord[];
    financialSummary: FinancialRecord[];
    genderDist: GenderDist[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reports & Analytics',
        href: '/reports',
    },
];

const formatCurrency = (amount: number | string) => {
    return new Intl.NumberFormat('en-GH', {
        style: 'currency',
        currency: 'GHS',
    }).format(Number(amount));
};

export default function Reports({ membershipGrowth, financialSummary, genderDist }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reports & Analytics" />

            <div className="p-4 md:p-8 space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
                    <p className="text-muted-foreground">Detailed insights into church membership and finances.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Membership Growth Table */}
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-2">
                            <Users className="h-5 w-5 text-blue-500" />
                            <CardTitle>Membership Growth (Last 6 Months)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Month</TableHead>
                                        <TableHead className="text-right">New Members</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {membershipGrowth.map((record) => (
                                        <TableRow key={record.month}>
                                            <TableCell>{record.month}</TableCell>
                                            <TableCell className="text-right font-semibold">{record.count}</TableCell>
                                        </TableRow>
                                    ))}
                                    {membershipGrowth.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={2} className="text-center py-4 text-muted-foreground">
                                                No growth data available.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Gender Distribution */}
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-2">
                            <PieChart className="h-5 w-5 text-purple-500" />
                            <CardTitle>Gender Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {genderDist.map((record) => (
                                    <div key={record.gender} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                        <span className="font-medium">{record.gender}</span>
                                        <span className="text-lg font-bold">{record.count}</span>
                                    </div>
                                ))}
                                {genderDist.length === 0 && (
                                    <p className="text-center py-4 text-muted-foreground">No distribution data available.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Financial Summary */}
                <Card>
                    <CardHeader className="flex flex-row items-center gap-2">
                        <DollarSign className="h-5 w-5 text-green-500" />
                        <CardTitle>Financial Summary by Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead className="text-right">Total Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {financialSummary.map((record, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{record.category}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${record.type === 'Income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {record.type}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right font-bold text-lg">
                                            {formatCurrency(record.total)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {financialSummary.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                                            No financial records found.
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
