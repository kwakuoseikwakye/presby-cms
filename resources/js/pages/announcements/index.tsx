import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus, MessageSquare, Megaphone, Clock, Users } from 'lucide-react';

interface Announcement {
    id: number;
    title: string;
    content: string;
    target_audience: string;
    status: 'Draft' | 'Published';
    published_at?: string;
    created_at: string;
}

interface Props {
    announcements: {
        data: Announcement[];
        links: any[];
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Communication',
        href: '/announcements',
    },
];

export default function Index({ announcements }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Communication & Announcements" />

            <div className="p-4 md:p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Communication</h1>
                        <p className="text-muted-foreground">
                            Announcements, SMS, and Email notifications.
                        </p>
                    </div>
                    <Link href="/announcements/create">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            New Announcement
                        </Button>
                    </Link>
                </div>

                <div className="space-y-4">
                    {announcements.data.length > 0 ? (
                        announcements.data.map((ann) => (
                            <Card key={ann.id} className="overflow-hidden">
                                <CardHeader className="flex flex-row items-center justify-between py-4">
                                    <div className="space-y-1">
                                        <CardTitle className="text-lg">{ann.title}</CardTitle>
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Users className="h-3 w-3" />
                                                <span>To: {ann.target_audience}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                <span>{ann.published_at ? new Date(ann.published_at).toLocaleString() : 'Not published'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${ann.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {ann.status}
                                    </span>
                                </CardHeader>
                                <CardContent className="pb-4">
                                    <p className="text-sm line-clamp-2 text-muted-foreground">
                                        {ann.content}
                                    </p>
                                    <div className="mt-4 flex justify-end gap-2">
                                        <Button variant="ghost" size="sm">Edit</Button>
                                        <Button variant="outline" size="sm">Send SMS</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="py-12 text-center text-muted-foreground">
                            No announcements found.
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
