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
import { Plus, Users, Shield, Layers } from 'lucide-react';

interface Group {
    id: number;
    name: string;
    description?: string;
    type: 'Department' | 'Committee' | 'General Group';
    leader?: {
        name: string;
    };
    members_count: number;
}

interface Props {
    groups: {
        data: Group[];
        links: any[];
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Departments & Groups',
        href: '/groups',
    },
];

export default function Index({ groups }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Departments & Groups" />

            <div className="p-4 md:p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Departments & Groups</h1>
                        <p className="text-muted-foreground">
                            Manage church departments, committees, and focus groups.
                        </p>
                    </div>
                    <Link href="/groups/create">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Create Group
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {groups.data.length > 0 ? (
                        groups.data.map((group) => (
                            <Card key={group.id} className="hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <div className="space-y-1">
                                        <CardTitle className="text-xl font-bold">{group.name}</CardTitle>
                                        <div className={`text-xs inline-block px-2 py-0.5 rounded-full font-medium ${group.type === 'Department' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                                group.type === 'Committee' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                                                    'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                                            }`}>
                                            {group.type}
                                        </div>
                                    </div>
                                    <Layers className="h-5 w-5 text-muted-foreground" />
                                </CardHeader>
                                <CardContent className="space-y-4 pt-4">
                                    <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                                        {group.description || 'No description provided.'}
                                    </p>
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <Shield className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">{group.leader?.name || 'No leader'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                            <span>{group.members_count} Members</span>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-end">
                                        <Link href={`/groups/${group.id}`}>
                                            <Button variant="ghost" size="sm">View Details</Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center text-muted-foreground">
                            No groups found. Create one to get started.
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

// Helper to include Separator
import { Separator } from '@/components/ui/separator';
