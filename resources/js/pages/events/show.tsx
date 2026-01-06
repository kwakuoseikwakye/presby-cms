import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, MapPin, Clock, Edit } from 'lucide-react';

interface Event {
    id: number;
    name: string;
    description?: string;
    location?: string;
    start_date: string;
    end_date?: string;
    type: string;
    status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
}

interface Props {
    event: Event;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Events',
        href: '/events',
    },
    {
        title: 'Event Details',
        href: '#',
    },
];

const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
        Upcoming: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        Ongoing: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        Completed: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
        Cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };
    return (
        <span className={`px-2 py-0.5 rounded-full text-sm font-semibold ${colors[status as keyof typeof colors]}`}>
            {status}
        </span>
    );
};

export default function Show({ event }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Event: ${event.name}`} />

            <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/events">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{event.name}</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-muted-foreground">{event.type}</span>
                                <StatusBadge status={event.status} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="whitespace-pre-wrap text-muted-foreground">
                                {event.description || 'No description provided for this event.'}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Schedule & Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="font-semibold">Date</p>
                                        <p className="text-sm text-muted-foreground">{new Date(event.start_date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="font-semibold">Time</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(event.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            {event.end_date && ` - ${new Date(event.end_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="font-semibold">Location</p>
                                        <p className="text-sm text-muted-foreground">{event.location || 'Not specified'}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
