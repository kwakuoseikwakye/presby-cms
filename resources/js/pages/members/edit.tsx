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
    middle_name?: string;
    gender: string;
    dob?: string;
    phone?: string;
    email?: string;
    occupation?: string;
    hometown?: string;
    membership_status: string;
    baptism_date?: string;
    confirmation_date?: string;
}

interface Props {
    member: Member;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Members',
        href: '/members',
    },
    {
        title: 'Edit',
        href: '#',
    },
];

export default function Edit({ member }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        first_name: member.first_name || '',
        last_name: member.last_name || '',
        middle_name: member.middle_name || '',
        gender: member.gender || 'Male',
        dob: member.dob || '',
        phone: member.phone || '',
        email: member.email || '',
        occupation: member.occupation || '',
        hometown: member.hometown || '',
        membership_status: member.membership_status || 'Active',
        baptism_date: member.baptism_date || '',
        confirmation_date: member.confirmation_date || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/members/${member.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Member: ${member.first_name} ${member.last_name}`} />

            <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-4">
                    <Link href="/members">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Member</h1>
                        <p className="text-muted-foreground">
                            Update the details for {member.first_name} {member.last_name}.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="first_name">First Name</Label>
                                <Input
                                    id="first_name"
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    required
                                />
                                {errors.first_name && <p className="text-sm text-destructive">{errors.first_name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="last_name">Last Name</Label>
                                <Input
                                    id="last_name"
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    required
                                />
                                {errors.last_name && <p className="text-sm text-destructive">{errors.last_name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="middle_name">Middle Name (Optional)</Label>
                                <Input
                                    id="middle_name"
                                    value={data.middle_name}
                                    onChange={(e) => setData('middle_name', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="gender">Gender</Label>
                                <Select
                                    value={data.gender}
                                    onValueChange={(value) => setData('gender', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="dob">Date of Birth</Label>
                                <Input
                                    id="dob"
                                    type="date"
                                    value={data.dob}
                                    onChange={(e) => setData('dob', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Church & Background</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="occupation">Occupation</Label>
                                <Input
                                    id="occupation"
                                    value={data.occupation}
                                    onChange={(e) => setData('occupation', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="hometown">Hometown</Label>
                                <Input
                                    id="hometown"
                                    value={data.hometown}
                                    onChange={(e) => setData('hometown', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="membership_status">Membership Status</Label>
                                <Select
                                    value={data.membership_status}
                                    onValueChange={(value) => setData('membership_status', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Inactive">Inactive</SelectItem>
                                        <SelectItem value="Deceased">Deceased</SelectItem>
                                        <SelectItem value="Transferred">Transferred</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="baptism_date">Baptism Date</Label>
                                <Input
                                    id="baptism_date"
                                    type="date"
                                    value={data.baptism_date}
                                    onChange={(e) => setData('baptism_date', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmation_date">Confirmation Date</Label>
                                <Input
                                    id="confirmation_date"
                                    type="date"
                                    value={data.confirmation_date}
                                    onChange={(e) => setData('confirmation_date', e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Link href="/members">
                            <Button variant="outline" type="button">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={processing} className="gap-2">
                            <Save className="h-4 w-4" />
                            {processing ? 'Updating...' : 'Update Member'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
