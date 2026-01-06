import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    Users,
    TrendingUp,
    ArrowUpRight,
    ArrowDownLeft,
    Calendar,
    Megaphone,
    Wallet,
    Bell,
    ExternalLink,
    Clock
} from 'lucide-react';

interface Stats {
    total_members: number;
    active_members: number;
    monthly_income: number;
    monthly_expense: number;
    savings: number;
}

interface Event {
    id: number;
    name: string;
    start_date: string;
    location?: string;
}

interface Announcement {
    id: number;
    title: string;
    published_at: string;
}

interface Transaction {
    id: number;
    amount: string;
    type: 'Income' | 'Expense';
    category: string;
    member?: {
        first_name: string;
        last_name: string;
    };
    description?: string;
}

interface Props {
    stats: Stats;
    upcomingEvents: Event[];
    recentAnnouncements: Announcement[];
    recentTransactions: Transaction[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const formatCurrency = (amount: number | string) => {
    return new Intl.NumberFormat('en-GH', {
        style: 'currency',
        currency: 'GHS',
    }).format(Number(amount));
};

export default function Dashboard({ stats, upcomingEvents, recentAnnouncements, recentTransactions }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="p-4 md:p-8 space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
                    <p className="text-muted-foreground">Here is what is happening at PCMS today.</p>
                </div>

                {/* Stat Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Membership</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_members}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.active_members} active members
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
                            <ArrowUpRight className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{formatCurrency(stats.monthly_income)}</div>
                            <p className="text-xs text-muted-foreground">This month</p>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
                            <ArrowDownLeft className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{formatCurrency(stats.monthly_expense)}</div>
                            <p className="text-xs text-muted-foreground">This month</p>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-lg transition-shadow border-l-4 border-blue-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Net Savings</CardTitle>
                            <Wallet className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(stats.savings)}</div>
                            <p className="text-xs text-muted-foreground">Difference</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    {/* Recent Transactions */}
                    <Card className="lg:col-span-4">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Recent Activity</CardTitle>
                            <Link href="/finance">
                                <Button variant="ghost" size="sm" className="text-xs gap-1">
                                    View All <ExternalLink className="h-3 w-3" />
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentTransactions.length > 0 ? (
                                    recentTransactions.map((tx) => (
                                        <div key={tx.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-full ${tx.type === 'Income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                    {tx.type === 'Income' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">{tx.category}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {tx.member ? `${tx.member.first_name} ${tx.member.last_name}` : tx.description || 'General'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={`text-sm font-bold ${tx.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                                                {tx.type === 'Income' ? '+' : '-'}{formatCurrency(tx.amount)}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground text-center py-4">No recent activity.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Upcoming Events */}
                    <Card className="lg:col-span-3">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-blue-500" />
                                Upcoming Events
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {upcomingEvents.length > 0 ? (
                                    upcomingEvents.map((event) => (
                                        <div key={event.id} className="group relative rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="text-sm font-semibold">{event.name}</p>
                                                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                                        <Clock className="h-3 w-3" />
                                                        {new Date(event.start_date).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                                <div className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold uppercase">
                                                    Soon
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground text-center py-4">No upcoming events.</p>
                                )}
                                <Link href="/events" className="block">
                                    <Button variant="outline" className="w-full text-xs" size="sm">
                                        View Calendar
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Announcements */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Megaphone className="h-5 w-5 text-orange-500" />
                            Church Announcements
                        </CardTitle>
                        <Link href="/announcements">
                            <Button variant="link" size="sm">Manage</Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {recentAnnouncements.length > 0 ? (
                                recentAnnouncements.map((ann) => (
                                    <div key={ann.id} className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-orange-200 transition-colors group">
                                        <div className="flex items-start gap-3">
                                            <div className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                                <Bell className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold line-clamp-1">{ann.title}</p>
                                                <p className="text-[10px] text-muted-foreground mt-1 uppercase font-semibold">
                                                    {new Date(ann.published_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-4 col-span-full">No recent announcements.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

// Add missing Button component
import { Button } from '@/components/ui/button';
