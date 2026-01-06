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
import { Head, useForm, Link, router } from '@inertiajs/react';
import { ArrowLeft, UserPlus, Trash, Shield, Users } from 'lucide-react';
import { useState } from 'react';

interface Member {
    id: number;
    first_name: string;
    last_name: string;
    pivot?: {
        role_in_group: string;
    };
}

interface Group {
    id: number;
    name: string;
    description?: string;
    type: string;
    leader?: {
        name: string;
    };
    members: Member[];
}

interface Props {
    group: Group;
    allMembers: Member[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Departments & Groups',
        href: '/groups',
    },
    {
        title: 'Group Details',
        href: '#',
    },
];

export default function Show({ group, allMembers }: Props) {
    const { data, setData, post, processing, reset } = useForm({
        member_id: '',
        role_in_group: 'Member',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/groups/${group.id}/enroll`, {
            onSuccess: () => reset(),
        });
    };

    const handleUnenroll = (memberId: number) => {
        if (confirm('Remove this member from the group?')) {
            router.delete(`/groups/${group.id}/members/${memberId}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Group: ${group.name}`} />

            <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/groups">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{group.name}</h1>
                            <p className="text-muted-foreground">{group.type} led by {group.leader?.name || 'No leader'}</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <div className="md:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>About Group</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground">{group.description || 'No description provided.'}</p>
                                <div className="flex items-center gap-2 text-sm">
                                    <Shield className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-semibold">Leader:</span>
                                    <span>{group.leader?.name || 'Unassigned'}</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Enroll Member</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={submit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="member_id">Member</Label>
                                        <Select
                                            value={data.member_id}
                                            onValueChange={(val) => setData('member_id', val)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select member" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {allMembers.map((m) => (
                                                    <SelectItem key={m.id} value={m.id.toString()}>
                                                        {m.first_name} {m.last_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="role_in_group">Role</Label>
                                        <Select
                                            value={data.role_in_group}
                                            onValueChange={(val) => setData('role_in_group', val)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Member">Member</SelectItem>
                                                <SelectItem value="Leader">Leader</SelectItem>
                                                <SelectItem value="Secretary">Secretary</SelectItem>
                                                <SelectItem value="Treasurer">Treasurer</SelectItem>
                                                <SelectItem value="Organizer">Organizer</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button type="submit" className="w-full gap-2" disabled={processing}>
                                        <UserPlus className="h-4 w-4" />
                                        Enroll Member
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="md:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Members ({group.members.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {group.members.length > 0 ? (
                                        group.members.map((member) => (
                                            <TableRow key={member.id}>
                                                <TableCell className="font-medium">
                                                    {member.first_name} {member.last_name}
                                                </TableCell>
                                                <TableCell>
                                                    <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                                                        {member.pivot?.role_in_group || 'Member'}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleUnenroll(member.id)}
                                                        className="text-destructive hover:bg-destructive/10"
                                                    >
                                                        <Trash className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                                                No members enrolled in this group.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
