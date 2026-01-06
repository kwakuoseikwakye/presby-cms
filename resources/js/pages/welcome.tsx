import { login } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Users,
    ShieldCheck,
    BarChart3,
    CalendarDays,
    HeartHandshake,
    MessageSquareText,
    Church,
    ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const features = [
        {
            title: 'Member Management',
            description: 'Maintain accurate records of all church members, families, and their backgrounds.',
            icon: Users,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
        },
        {
            title: 'Financial Tracking',
            description: 'Monitor tithes, offerings, donations, and expenses with comprehensive reporting.',
            icon: BarChart3,
            color: 'text-green-600',
            bg: 'bg-green-50',
        },
        {
            title: 'Church Governance',
            description: 'Manage Elders, Deacons, and leadership terms with a centralized registry.',
            icon: ShieldCheck,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
        },
        {
            title: 'Events & Calendar',
            description: 'Schedule services, programs, and special events with attendance tracking.',
            icon: CalendarDays,
            color: 'text-orange-600',
            bg: 'bg-orange-50',
        },
        {
            title: 'Departments & Groups',
            description: 'Organize various groups and committees with member enrollment tools.',
            icon: HeartHandshake,
            color: 'text-rose-600',
            bg: 'bg-rose-50',
        },
        {
            title: 'Communication',
            description: 'Send announcements and notifications to members through SMS and Email.',
            icon: MessageSquareText,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
            <Head title="Welcome | Presbyterian CMS" />

            {/* Header / Navbar */}
            <nav className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                            <Church className="h-6 w-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900">
                            Presby<span className="text-blue-600">CMS</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link href="/dashboard">
                                <Button className="rounded-full px-6 transition-all hover:scale-105 active:scale-95">
                                    Go to Dashboard
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        ) : (
                            <Link href={login()}>
                                <Button className="rounded-full px-8 transition-all hover:scale-105 active:scale-95 shadow-md shadow-blue-100">
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="pt-24">
                <div className="relative overflow-hidden bg-white pb-16 pt-12 sm:pb-24 sm:pt-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                            <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
                                <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                    New in v1.0
                                </div>
                                <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                                    Modern Management for the <span className="text-blue-600">Presbyterian Church</span>
                                </h1>
                                <p className="mt-6 text-lg text-slate-600">
                                    A robust and intuitive system designed to streamline membership tracking,
                                    finances, and governance for your congregation. Empower your ministry
                                    with data-driven insights.
                                </p>
                                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                                    {auth.user ? (
                                        <Link href="/dashboard">
                                            <Button size="lg" className="rounded-full px-8 text-lg font-semibold h-14 w-full sm:w-auto transition-all shadow-lg shadow-blue-200">
                                                Dashboard
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Link href={login()}>
                                            <Button size="lg" className="rounded-full px-8 text-lg font-semibold h-14 w-full sm:w-auto transition-all shadow-lg shadow-blue-200">
                                                Acess CMS
                                            </Button>
                                        </Link>
                                    )}
                                    <Button variant="outline" size="lg" className="rounded-full px-8 text-lg font-semibold h-14 w-full sm:w-auto">
                                        Learn More
                                    </Button>
                                </div>
                            </div>

                            <div className="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:items-center">
                                <div className="relative mx-auto w-full rounded-2xl bg-white shadow-2xl p-2 ring-1 ring-slate-100">
                                    <div className="rounded-xl bg-slate-50 p-8">
                                        <div className="flex flex-col gap-6">
                                            <div className="flex items-center justify-between">
                                                <div className="h-4 w-24 rounded bg-slate-200" />
                                                <div className="h-8 w-8 rounded-full bg-blue-100" />
                                            </div>
                                            <div className="space-y-3">
                                                <div className="h-8 w-full rounded bg-white shadow-sm" />
                                                <div className="h-8 w-3/4 rounded bg-white shadow-sm" />
                                            </div>
                                            <div className="grid grid-cols-3 gap-3">
                                                <div className="h-20 rounded bg-white shadow-sm" />
                                                <div className="h-20 rounded bg-white shadow-sm" />
                                                <div className="h-20 rounded bg-white shadow-sm" />
                                            </div>
                                            <div className="h-32 rounded bg-blue-600 shadow-lg shadow-blue-200" />
                                        </div>
                                    </div>
                                    {/* Abstract shapes for premium feel */}
                                    <div className="absolute -right-6 -top-6 -z-10 h-32 w-32 rounded-full bg-blue-100 opacity-50 blur-2xl" />
                                    <div className="absolute -bottom-6 -left-6 -z-10 h-32 w-32 rounded-full bg-purple-100 opacity-50 blur-2xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="bg-slate-50 py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-base font-semibold uppercase tracking-wide text-blue-600">
                                Comprehensive Features
                            </h2>
                            <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                                Everything you need to manage your church effectively.
                            </p>
                        </div>

                        <div className="mt-16 sm:mt-24">
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {features.map((feature) => (
                                    <div
                                        key={feature.title}
                                        className="relative group rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ring-1 ring-slate-100"
                                    >
                                        <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 transition-colors group-hover:${feature.bg}`}>
                                            <feature.icon className={`h-6 w-6 ${feature.color}`} />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900">
                                            {feature.title}
                                        </h3>
                                        <p className="mt-2 text-slate-600">
                                            {feature.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <footer className="bg-white border-t border-slate-200 py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                            <div className="flex items-center gap-2">
                                <Church className="h-6 w-6 text-blue-600" />
                                <span className="font-bold text-slate-900">PresbyCMS</span>
                            </div>
                            <p className="text-sm text-slate-500">
                                &copy; {new Date().getFullYear()} Presbyterian Church Management System. All rights reserved.
                            </p>
                            <div className="flex gap-4 text-sm text-slate-500">
                                <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
                                <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
                                <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
