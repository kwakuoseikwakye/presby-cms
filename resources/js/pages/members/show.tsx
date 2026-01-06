import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, Mail, Phone, MapPin, Briefcase, Calendar, CheckCircle } from 'lucide-react';

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
    groups: any[];
    attendance: any[];
    transactions: any[];
    pledges: any[];
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
        title: 'View Details',
        href: '#',
    },
];

export default function Show({ member }: Props) {
    const fullName = `${member.first_name} ${member.middle_name ? member.middle_name + ' ' : ''}${member.last_name}`;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Member Details: ${fullName}`} />

            <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/members">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{fullName}</h1>
                            <p className="text-muted-foreground">Member since {new Date(member.id * 1000).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <Link href={`/members/${member.id}/edit`}>
                        <Button className="gap-2">
                            <Edit className="h-4 w-4" />
                            Edit Profile
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle>Contact Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3 text-sm">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>{member.email || 'No email provided'}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{member.phone || 'No phone provided'}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{member.hometown || 'Unknown hometown'}</span>
                            </div>
                            <Separator />
                            <div className="space-y-1">
                                <p className="text-xs font-semibold uppercase text-muted-foreground">Status</p>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span className="text-sm font-medium">{member.membership_status}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Member Details</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Gender</p>
                                <p>{member.gender}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                                <p>{member.dob ? new Date(member.dob).toLocaleDateString() : 'Not set'}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Occupation</p>
                                <div className="flex items-center gap-2">
                                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                                    <p>{member.occupation || 'Not set'}</p>
                                </div>
                            </div>
                            <Separator className="md:col-span-2" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Baptism Date</p>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <p>{member.baptism_date || 'Not baptized'}</p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Confirmation Date</p>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <p>{member.confirmation_date || 'Not confirmed'}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
