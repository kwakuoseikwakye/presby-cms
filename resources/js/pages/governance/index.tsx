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
import { Plus, Gavel, User, Calendar } from 'lucide-react';

interface GovernanceRecord {
    id: number;
    member: {
        first_name: string;
        last_name: string;
    };
    role: string;
    start_term: string;
    end_term?: string;
    status: 'Active' | 'Retired' | 'Emeritus';
}

interface Props {
    records: {
        data: GovernanceRecord[];
        links: any[];
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Church Governance',
        href: '/governance',
    },
];

export default function Index({ records }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Church Governance" />

            <div className="p-4 md:p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Church Governance</h1>
                        <p className="text-muted-foreground">
                            Registry of Elders, Deacons, and Church Officers.
                        </p>
                    </div>
                    <Link href="/governance/create">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Officer
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Leadership Registry</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Officer Name</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Term Start</TableHead>
                                    <TableHead>Term End</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {records.data.length > 0 ? (
                                    records.data.map((record) => (
                                        <TableRow key={record.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                    {record.member.first_name} {record.member.last_name}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-semibold">
                                                    {record.role}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(record.start_term).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                {record.end_term ? new Date(record.end_term).toLocaleDateString() : 'Present'}
                                            </TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${record.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {record.status}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                            No governance records found.
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
