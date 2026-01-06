import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

interface Member {
    id: number;
    first_name: string;
    last_name: string;
}

interface Props {
    members: Member[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Finance',
        href: '/finance',
    },
    {
        title: 'Record Transaction',
        href: '/finance/create',
    },
];

export default function Create({ members }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        member_id: '' as string | number,
        amount: '',
        type: 'Income' as 'Income' | 'Expense',
        category: 'Tithe',
        payment_method: 'Cash' as 'Cash' | 'Mobile Money' | 'Bank Transfer' | 'Other',
        description: '',
        transaction_date: new Date().toISOString().split('T')[0],
    });

    const incomeCategories = ['Tithe', 'Offering', 'Pledge', 'Donation', 'Welfare', 'Other'];
    const expenseCategories = ['Salary', 'Utility', 'Maintenance', 'Charity', 'Transport', 'Stationery', 'Other'];

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/finance');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Record Transaction" />

            <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-4">
                    <Link href="/finance">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Record Transaction</h1>
                        <p className="text-muted-foreground">
                            Add a new income or expense entry.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Transaction Details</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="type">Transaction Type</Label>
                                <Select
                                    value={data.type}
                                    onValueChange={(value: any) => {
                                        setData({ ...data, type: value, category: value === 'Income' ? 'Tithe' : 'Salary' });
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Income">Income</SelectItem>
                                        <SelectItem value="Expense">Expense</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    value={data.category}
                                    onValueChange={(value) => setData('category', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {(data.type === 'Income' ? incomeCategories : expenseCategories).map((cat) => (
                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount (GHS)</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    value={data.amount}
                                    onChange={(e) => setData('amount', e.target.value)}
                                    required
                                />
                                {errors.amount && <p className="text-sm text-destructive">{errors.amount}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="transaction_date">Date</Label>
                                <Input
                                    id="transaction_date"
                                    type="date"
                                    value={data.transaction_date}
                                    onChange={(e) => setData('transaction_date', e.target.value)}
                                    required
                                />
                                {errors.transaction_date && <p className="text-sm text-destructive">{errors.transaction_date}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="member_id">Associated Member (Optional)</Label>
                                <Select
                                    value={data.member_id.toString()}
                                    onValueChange={(value) => setData('member_id', value === 'none' ? '' : value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select member" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None / Public</SelectItem>
                                        {members.map((member) => (
                                            <SelectItem key={member.id} value={member.id.toString()}>
                                                {member.first_name} {member.last_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="payment_method">Payment Method</Label>
                                <Select
                                    value={data.payment_method}
                                    onValueChange={(value: any) => setData('payment_method', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Cash">Cash</SelectItem>
                                        <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="description">Description / Notes</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Add any additional details..."
                                />
                                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Link href="/finance">
                            <Button variant="outline" type="button">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={processing} className="gap-2">
                            <Save className="h-4 w-4" />
                            {processing ? 'Saving...' : 'Record Transaction'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
