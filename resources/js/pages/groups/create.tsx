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

interface Leader {
    id: number;
    name: string;
}

interface Props {
    leaders: Leader[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Departments & Groups',
        href: '/groups',
    },
    {
        title: 'Create Group',
        href: '/groups/create',
    },
];

export default function Create({ leaders }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        type: 'Department' as 'Department' | 'Committee' | 'General Group',
        leader_id: '' as string | number,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/groups');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Group" />

            <div className="p-4 md:p-8 space-y-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-4">
                    <Link href="/groups">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Create Group</h1>
                        <p className="text-muted-foreground">
                            Set up a new church group or department.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Group Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Group Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="e.g. Choir, Welfare Committee"
                                    required
                                />
                                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="type">Group Type</Label>
                                <Select
                                    value={data.type}
                                    onValueChange={(value: any) => setData('type', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Department">Department</SelectItem>
                                        <SelectItem value="Committee">Committee</SelectItem>
                                        <SelectItem value="General Group">General Group</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="leader_id">Leader (Optional)</Label>
                                <Select
                                    value={data.leader_id.toString()}
                                    onValueChange={(value) => setData('leader_id', value === 'none' ? '' : value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a leader" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None</SelectItem>
                                        {leaders.map((leader) => (
                                            <SelectItem key={leader.id} value={leader.id.toString()}>
                                                {leader.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description (Optional)</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="What is the purpose of this group?"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Link href="/groups">
                            <Button variant="outline" type="button">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={processing} className="gap-2">
                            <Save className="h-4 w-4" />
                            {processing ? 'Creating...' : 'Create Group'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
