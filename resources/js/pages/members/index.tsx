import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, User, Edit, Trash } from 'lucide-react';
import { useState } from 'react';

interface Member {
    id: number;
    first_name: string;
    last_name: string;
    middle_name?: string;
    email?: string;
    phone?: string;
    membership_status: string;
}

interface Props {
    members: {
        data: Member[];
        links: any[];
    };
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Members',
        href: '/members',
    },
];

export default function Index({ members, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/members', { search }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this member?')) {
            router.delete(`/members/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Members" />

            <div className="p-4 md:p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Members</h1>
                        <p className="text-muted-foreground">
                            Manage your congregation members here.
                        </p>
                    </div>
                    <Link href="/members/create">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Member
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <form onSubmit={handleSearch} className="flex items-center gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search members..."
                                    className="pl-9"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <Button type="submit" variant="secondary">
                                Search
                            </Button>
                        </form>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {members.data.length > 0 ? (
                                    members.data.map((member) => (
                                        <TableRow key={member.id}>
                                            <TableCell className="font-medium">
                                                {member.first_name} {member.last_name}
                                            </TableCell>
                                            <TableCell>{member.email || '-'}</TableCell>
                                            <TableCell>{member.phone || '-'}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${member.membership_status === 'Active'
                                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                    }`}>
                                                    {member.membership_status}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Link href={`/members/${member.id}/edit`}>
                                                    <Button variant="ghost" size="icon">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:text-destructive"
                                                    onClick={() => handleDelete(member.id)}
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                            No members found.
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
