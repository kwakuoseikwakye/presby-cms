import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Save, Check, X, AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

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
        title: 'Attendance',
        href: '/attendance',
    },
    {
        title: 'Mark Attendance',
        href: '/attendance/create',
    },
];

export default function Create({ members }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        event_name: 'Sunday Service',
        event_date: new Date().toISOString().split('T')[0],
        attendance: members.map((member) => ({
            member_id: member.id,
            status: 'Present' as 'Present' | 'Absent' | 'Excused',
            remarks: '',
        })),
    });

    const handleStatusChange = (memberId: number, status: 'Present' | 'Absent' | 'Excused') => {
        const newAttendance = data.attendance.map((item) =>
            item.member_id === memberId ? { ...item, status } : item
        );
        setData('attendance', newAttendance);
    };

    const handleRemarksChange = (memberId: number, remarks: string) => {
        const newAttendance = data.attendance.map((item) =>
            item.member_id === memberId ? { ...item, remarks } : item
        );
        setData('attendance', newAttendance);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/attendance');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mark Attendance" />

            <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto">
                <div className="flex items-center gap-4">
                    <Link href="/attendance">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Mark Attendance</h1>
                        <p className="text-muted-foreground">
                            Bulk mark attendance for members.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Event Details</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="event_name">Event Name</Label>
                                <Input
                                    id="event_name"
                                    value={data.event_name}
                                    onChange={(e) => setData('event_name', e.target.value)}
                                    required
                                />
                                {errors.event_name && <p className="text-sm text-destructive">{errors.event_name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="event_date">Event Date</Label>
                                <Input
                                    id="event_date"
                                    type="date"
                                    value={data.event_date}
                                    onChange={(e) => setData('event_date', e.target.value)}
                                    required
                                />
                                {errors.event_date && <p className="text-sm text-destructive">{errors.event_date}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Member List</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Member Name</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Remarks</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {members.map((member, index) => {
                                        const record = data.attendance.find(a => a.member_id === member.id);
                                        return (
                                            <TableRow key={member.id}>
                                                <TableCell className="font-medium">
                                                    {member.first_name} {member.last_name}
                                                </TableCell>
                                                <TableCell>
                                                    <RadioGroup
                                                        value={record?.status}
                                                        onValueChange={(val: any) => handleStatusChange(member.id, val)}
                                                        className="flex items-center gap-4"
                                                    >
                                                        <div className="flex items-center gap-1">
                                                            <RadioGroupItem value="Present" id={`p-${member.id}`} />
                                                            <Label htmlFor={`p-${member.id}`} className="cursor-pointer">P</Label>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <RadioGroupItem value="Absent" id={`a-${member.id}`} />
                                                            <Label htmlFor={`a-${member.id}`} className="cursor-pointer">A</Label>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <RadioGroupItem value="Excused" id={`e-${member.id}`} />
                                                            <Label htmlFor={`e-${member.id}`} className="cursor-pointer">E</Label>
                                                        </div>
                                                    </RadioGroup>
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        placeholder="Optional remarks"
                                                        value={record?.remarks || ''}
                                                        onChange={(e) => handleRemarksChange(member.id, e.target.value)}
                                                        className="h-8 text-xs"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Link href="/attendance">
                            <Button variant="outline" type="button">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={processing} className="gap-2">
                            <Save className="h-4 w-4" />
                            {processing ? 'Saving...' : 'Submit Attendance'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
