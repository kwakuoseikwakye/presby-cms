import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    LayoutGrid,
    Users,
    DollarSign,
    CheckSquare,
    Layers,
    Calendar,
    Settings,
    Gavel,
    MessageSquare,
    BarChart,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Members',
        href: '/members',
        icon: Users,
    },
    {
        title: 'Attendance',
        href: '/attendance',
        icon: CheckSquare,
    },
    {
        title: 'Finance',
        href: '/finance',
        icon: DollarSign,
    },
    {
        title: 'Departments',
        href: '/groups',
        icon: Layers,
    },
    {
        title: 'Governance',
        href: '/governance',
        icon: Gavel,
    },
    {
        title: 'Events',
        href: '/events',
        icon: Calendar,
    },
    {
        title: 'Communication',
        href: '/announcements',
        icon: MessageSquare,
    },
    {
        title: 'Reports',
        href: '/reports',
        icon: BarChart,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Settings',
        href: '/settings/profile',
        icon: Settings,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
