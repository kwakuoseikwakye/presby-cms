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
import { Plus, Calendar as CalendarIcon, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface Attendance {
    id: number;
    member: {
        first_name: string;
        last_name: string;
    };
    event_name: string;
    event_date: string;
    status: 'Present' | 'Absent' | 'Excused';
    remarks?: string;
}

interface Props {
    attendance: {
        data: Attendance[];
        links: any[];
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Attendance',
        href: '/attendance',
    },
];

const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
        case 'Present': return <CheckCircle className="h-4 w-4 text-green-500" />;
        case 'Absent': return <XCircle className="h-4 w-4 text-red-500" />;
        case 'Excused': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
        default: return null;
    }
};

export default function Index({ attendance }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Attendance" />

            <div className="p-4 md:p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
                        <p className="text-muted-foreground">
                            View and mark service and group attendance.
                        </p>
                    </div>
                    <Link href="/attendance/create">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Mark Attendance
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Attendance Records</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Event</TableHead>
                                    <TableHead>Member</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Remarks</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {attendance.data.length > 0 ? (
                                    attendance.data.map((record) => (
                                        <TableRow key={record.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                                    {new Date(record.event_date).toLocaleDateString()}
                                                </div>
                                            </TableCell>
                                            <TableCell>{record.event_name}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                    {record.member.first_name} {record.member.last_name}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <StatusIcon status={record.status} />
                                                    {record.status}
                                                </div>
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate">
                                                {record.remarks || '-'}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                            No attendance records found.
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
