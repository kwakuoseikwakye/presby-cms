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
import { ArrowLeft, Save, Send } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Communication',
        href: '/announcements',
    },
    {
        title: 'New Announcement',
        href: '/announcements/create',
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        target_audience: 'All',
        status: 'Published' as 'Draft' | 'Published',
        published_at: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/announcements');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New Announcement" />

            <div className="p-4 md:p-8 space-y-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-4">
                    <Link href="/announcements">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">New Announcement</h1>
                        <p className="text-muted-foreground">
                            Create and publish a church announcement.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Announcement Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Enter title"
                                    required
                                />
                                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="target_audience">Target Audience</Label>
                                    <Select
                                        value={data.target_audience}
                                        onValueChange={(val) => setData('target_audience', val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select audience" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All">All Members</SelectItem>
                                            <SelectItem value="Leaders">Leaders Only</SelectItem>
                                            <SelectItem value="Youth">Youth Department</SelectItem>
                                            <SelectItem value="Choir">The Choir</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                                            <SelectItem value="Draft">Draft</SelectItem>
                                            <SelectItem value="Published">Published</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Content</Label>
                                <Textarea
                                    id="content"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    placeholder="Write your announcement here..."
                                    className="min-h-[200px]"
                                    required
                                />
                                {errors.content && <p className="text-sm text-destructive">{errors.content}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Link href="/announcements">
                            <Button variant="outline" type="button">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={processing} className="gap-2">
                            <Send className="h-4 w-4" />
                            {processing ? 'Saving...' : 'Publish Announcement'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
