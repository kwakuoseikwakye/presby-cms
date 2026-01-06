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
        title: 'Church Governance',
        href: '/governance',
    },
    {
        title: 'Add Officer',
        href: '/governance/create',
    },
];

export default function Create({ members }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        member_id: '',
        role: 'Elder',
        start_term: '',
        end_term: '',
        status: 'Active' as 'Active' | 'Retired' | 'Emeritus',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/governance');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Church Officer" />

            <div className="p-4 md:p-8 space-y-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-4">
                    <Link href="/governance">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Add Officer</h1>
                        <p className="text-muted-foreground">
                            Register a new member in a leadership position.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Officer Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="member_id">Member</Label>
                                <Select
                                    value={data.member_id.toString()}
                                    onValueChange={(val) => setData('member_id', val)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select member" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {members.map((m) => (
                                            <SelectItem key={m.id} value={m.id.toString()}>
                                                {m.first_name} {m.last_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.member_id && <p className="text-sm text-destructive">{errors.member_id}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Select value={data.role} onValueChange={(val) => setData('role', val)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Minister">Minister</SelectItem>
                                        <SelectItem value="Elder">Elder</SelectItem>
                                        <SelectItem value="Deacon">Deacon</SelectItem>
                                        <SelectItem value="Catechist">Catechist</SelectItem>
                                        <SelectItem value="Session Clerk">Session Clerk</SelectItem>
                                        <SelectItem value="Treasurer">Treasurer</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.role && <p className="text-sm text-destructive">{errors.role}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="start_term">Term Start Date</Label>
                                    <Input
                                        id="start_term"
                                        type="date"
                                        value={data.start_term}
                                        onChange={(e) => setData('start_term', e.target.value)}
                                        required
                                    />
                                    {errors.start_term && <p className="text-sm text-destructive">{errors.start_term}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="end_term">Term End Date (Optional)</Label>
                                    <Input
                                        id="end_term"
                                        type="date"
                                        value={data.end_term}
                                        onChange={(e) => setData('end_term', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(val: any) => setData('status', val)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Retired">Retired</SelectItem>
                                        <SelectItem value="Emeritus">Emeritus</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Link href="/governance">
                            <Button variant="outline" type="button">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={processing} className="gap-2">
                            <Save className="h-4 w-4" />
                            {processing ? 'Saving...' : 'Save Record'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
