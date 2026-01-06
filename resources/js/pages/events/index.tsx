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
import { Plus, Calendar, MapPin, Clock } from 'lucide-react';

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
    events: {
        data: Event[];
        links: any[];
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Events & Calendar',
        href: '/events',
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
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${colors[status as keyof typeof colors]}`}>
            {status}
        </span>
    );
};

export default function Index({ events }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Events & Calendar" />

            <div className="p-4 md:p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Events</h1>
                        <p className="text-muted-foreground">
                            Manage church services, programs, and special events.
                        </p>
                    </div>
                    <Link href="/events/create">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Create Event
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {events.data.length > 0 ? (
                        events.data.map((event) => (
                            <Card key={event.id} className="hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-xl font-bold">{event.name}</CardTitle>
                                            <p className="text-sm text-muted-foreground">{event.type}</p>
                                        </div>
                                        <StatusBadge status={event.status} />
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                                        {event.description || 'No description provided.'}
                                    </p>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            <span>{new Date(event.start_date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Clock className="h-4 w-4" />
                                            <span>{new Date(event.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        {event.location && (
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <MapPin className="h-4 w-4" />
                                                <span>{event.location}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="pt-4 flex justify-end">
                                        <Link href={`/events/${event.id}`}>
                                            <Button variant="outline" size="sm">View Details</Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center text-muted-foreground">
                            No events scheduled. Create one to get started.
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
