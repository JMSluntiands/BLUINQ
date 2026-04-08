import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    BadgePlus,
    BarChart3,
    ChevronDown,
    FolderKanban,
    LayoutDashboard,
    ListOrdered,
    LogOut,
    Menu,
    PanelLeftClose,
    PanelLeft,
    ShieldUser,
    UserCog,
    Users,
    X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle.jsx';

const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, to: '/dashboard' },
    { id: 'projects', label: 'Projects', icon: FolderKanban, to: null },
    { id: 'reports', label: 'Reports', icon: BarChart3, to: null },
    { id: 'team', label: 'Team', icon: Users, to: null },
    { id: 'settings', label: 'User Account', icon: ShieldUser, to: '/account-settings' },
];

export default function DashboardShell({ user, onLogout, onOpenAccountSettings, activeNav = 'overview', headerTitle = 'Overview', children }) {
    const navigate = useNavigate();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(['settings', 'user-add', 'user-list'].includes(activeNav));
    const profileMenuRef = useRef(null);
    const displayName = user.fullname || user.name || user.email;
    const avatarInitials = useMemo(() => {
        const source = (user.fullname || user.name || user.email || 'U').trim();
        const parts = source.split(/\s+/).filter(Boolean);
        if (parts.length === 0) return 'U';
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return `${parts[0][0] || ''}${parts[1][0] || ''}`.toUpperCase();
    }, [user.email, user.fullname, user.name]);

    useEffect(() => {
        function handlePointerDown(event) {
            if (!profileMenuRef.current?.contains(event.target)) {
                setProfileMenuOpen(false);
            }
        }
        if (profileMenuOpen) {
            document.addEventListener('mousedown', handlePointerDown);
        }
        return () => document.removeEventListener('mousedown', handlePointerDown);
    }, [profileMenuOpen]);

    return (
        <div className="dashboard-enter-shell flex min-h-screen bg-gradient-to-br from-[#eef2f8] via-white to-[#e4eaf5] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            {/* Mobile overlay */}
            {mobileOpen ? (
                <button
                    type="button"
                    className="fixed inset-0 z-40 bg-brand-navy/20 backdrop-blur-sm lg:hidden"
                    aria-label="Close menu"
                    onClick={() => setMobileOpen(false)}
                />
            ) : null}

            {/* Sidebar */}
            <aside
                className={[
                    'dashboard-enter-header fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-slate-200/90 bg-white/95 shadow-lg shadow-brand-navy/5 backdrop-blur-md transition-transform duration-300 ease-out dark:border-slate-700/80 dark:bg-slate-900/95 dark:shadow-black/40',
                    'lg:static lg:translate-x-0',
                    mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
                    sidebarCollapsed ? 'lg:w-[72px]' : 'lg:w-[260px]',
                ].join(' ')}
            >
                <div className="dashboard-enter-logo flex h-[60px] items-center justify-between gap-2 border-b border-slate-200/80 px-3 dark:border-slate-700/80">
                    <div className={`flex min-w-0 flex-1 items-center justify-center ${sidebarCollapsed ? 'lg:px-0' : ''}`}>
                        {!sidebarCollapsed ? (
                            <div className="min-w-0 text-center">
                                <p className="truncate text-sm font-semibold tracking-wide text-brand-navy dark:text-slate-100">
                                    BLUINQ
                                </p>
                                <p className="truncate text-xs font-medium text-slate-500 dark:text-slate-400">
                                    {displayName}
                                </p>
                            </div>
                        ) : (
                            <p className="text-sm font-semibold tracking-wide text-brand-navy dark:text-slate-100">BL</p>
                        )}
                    </div>
                    <button
                        type="button"
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-brand-navy dark:hover:bg-slate-800 dark:hover:text-slate-200 lg:hidden"
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close sidebar"
                    >
                        <X className="h-5 w-5" strokeWidth={2} aria-hidden />
                    </button>
                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Main">
                    {!sidebarCollapsed ? (
                        <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                            DASHBOARD
                        </p>
                    ) : null}
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = item.id === activeNav;
                        const isClickable = Boolean(item.to);

                        if (item.id === 'settings') {
                            return (
                                <div key={item.id}>
                                    {!sidebarCollapsed ? (
                                        <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                                            SETTINGS
                                        </p>
                                    ) : null}
                                    <button
                                        type="button"
                                        onClick={() => setSettingsOpen((open) => !open)}
                                        className={[
                                            'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition',
                                            'text-slate-600 hover:bg-slate-100 hover:text-brand-navy dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100',
                                            sidebarCollapsed ? 'lg:justify-center lg:px-2' : '',
                                        ].join(' ')}
                                        aria-expanded={settingsOpen}
                                    >
                                        <Icon className="h-5 w-5 shrink-0 opacity-90" strokeWidth={2} aria-hidden />
                                        <span className={`truncate ${sidebarCollapsed ? 'lg:sr-only' : ''}`}>{item.label}</span>
                                        {!sidebarCollapsed ? (
                                            <ChevronDown
                                                className={`ml-auto h-4 w-4 transition ${settingsOpen ? 'rotate-180' : ''}`}
                                                strokeWidth={2}
                                                aria-hidden
                                            />
                                        ) : null}
                                    </button>

                                    {!sidebarCollapsed && settingsOpen ? (
                                        <div className="mt-1 space-y-1 pl-6">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    navigate('/users/add');
                                                    setMobileOpen(false);
                                                }}
                                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 opacity-80 transition hover:bg-slate-100 hover:text-brand-navy dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                                                aria-current={activeNav === 'user-add' ? 'page' : undefined}
                                            >
                                                <BadgePlus className="h-4 w-4 shrink-0 opacity-90" strokeWidth={2} aria-hidden />
                                                Add New
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    navigate('/users/list');
                                                    setMobileOpen(false);
                                                }}
                                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 opacity-80 transition hover:bg-slate-100 hover:text-brand-navy dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                                                aria-current={activeNav === 'user-list' ? 'page' : undefined}
                                            >
                                                <ListOrdered className="h-4 w-4 shrink-0 opacity-90" strokeWidth={2} aria-hidden />
                                                List
                                            </button>
                                        </div>
                                    ) : null}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            navigate('/account-settings');
                                            setMobileOpen(false);
                                        }}
                                        className={[
                                            'mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition',
                                            activeNav === 'settings'
                                                ? 'bg-brand-navy/10 text-brand-navy dark:bg-brand-sky/15 dark:text-brand-sky'
                                                : 'text-slate-600 hover:bg-slate-100 hover:text-brand-navy dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100',
                                            sidebarCollapsed ? 'lg:justify-center lg:px-2' : '',
                                        ].join(' ')}
                                        aria-current={activeNav === 'settings' ? 'page' : undefined}
                                    >
                                        <UserCog className="h-4 w-4 shrink-0 opacity-90" strokeWidth={2} aria-hidden />
                                        <span className={`truncate ${sidebarCollapsed ? 'lg:sr-only' : ''}`}>Account Settings</span>
                                    </button>
                                </div>
                            );
                        }

                        return (
                            <React.Fragment key={item.id}>
                                {item.id === 'projects' && !sidebarCollapsed ? (
                                    <p className="mb-1 mt-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                                        PROJECTS
                                    </p>
                                ) : null}
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (!item.to) return;
                                        navigate(item.to);
                                        setMobileOpen(false);
                                    }}
                                    disabled={!isClickable}
                                    className={[
                                        'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition',
                                        active
                                            ? 'bg-brand-navy/10 text-brand-navy dark:bg-brand-sky/15 dark:text-brand-sky'
                                            : 'text-slate-600 hover:bg-slate-100 hover:text-brand-navy dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100',
                                        isClickable ? '' : 'cursor-not-allowed opacity-60',
                                        sidebarCollapsed ? 'lg:justify-center lg:px-2' : '',
                                    ].join(' ')}
                                    aria-current={active ? 'page' : undefined}
                                >
                                    <Icon className="h-5 w-5 shrink-0 opacity-90" strokeWidth={2} aria-hidden />
                                    <span className={`truncate ${sidebarCollapsed ? 'lg:sr-only' : ''}`}>{item.label}</span>
                                </button>
                            </React.Fragment>
                        );
                    })}
                </nav>

                <div className="border-t border-slate-200/80 p-3 dark:border-slate-700/80">
                    <button
                        type="button"
                        onClick={() => setSidebarCollapsed((c) => !c)}
                        className="hidden w-full items-center justify-center gap-2 rounded-xl border border-slate-200/90 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-brand-sky/50 hover:text-brand-navy dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:border-brand-sky/40 lg:flex"
                        aria-pressed={sidebarCollapsed}
                        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        {sidebarCollapsed ? (
                            <PanelLeft className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                        ) : (
                            <PanelLeftClose className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                        )}
                    </button>
                </div>
            </aside>

            <div className="flex min-h-screen min-w-0 flex-1 flex-col">
                {/* Top navbar */}
                <header className="dashboard-enter-header sticky top-0 z-30 flex h-[60px] items-center gap-3 border-b border-slate-200/80 bg-white/85 px-3 backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-900/85 sm:px-5">
                    <button
                        type="button"
                        className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
                        onClick={() => setMobileOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu className="h-5 w-5" strokeWidth={2} aria-hidden />
                    </button>

                    <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium uppercase tracking-wider text-brand-sky dark:text-brand-sky">
                            Workspace
                        </p>
                        <h1 className="truncate text-base font-semibold text-brand-navy dark:text-slate-100 sm:text-lg">{headerTitle}</h1>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                        <ThemeToggle className="!border-0 !bg-transparent !shadow-none !p-0" />
                        <div className="relative" ref={profileMenuRef}>
                            <button
                                type="button"
                                className="flex items-center gap-2 rounded-xl px-2 py-1.5 text-left transition hover:bg-slate-100/70 dark:hover:bg-slate-800/60"
                                onClick={() => setProfileMenuOpen((open) => !open)}
                                aria-haspopup="menu"
                                aria-expanded={profileMenuOpen}
                                aria-label="Open profile menu"
                            >
                                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-xs font-semibold text-brand-navy dark:bg-slate-800 dark:text-brand-sky">
                                    {user.image_url ? (
                                        <img
                                            src={user.image_url}
                                            alt={displayName}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        avatarInitials
                                    )}
                                </div>
                                <div className="hidden max-w-[140px] text-right sm:block">
                                    <p className="truncate text-xs font-medium text-slate-800 dark:text-slate-200">{displayName}</p>
                                    {user.email ? (
                                        <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">{user.email}</p>
                                    ) : null}
                                </div>
                                <ChevronDown
                                    className={`h-4 w-4 text-slate-500 transition ${profileMenuOpen ? 'rotate-180' : ''} dark:text-slate-400`}
                                    strokeWidth={2}
                                    aria-hidden
                                />
                            </button>

                            {profileMenuOpen ? (
                                <div
                                    role="menu"
                                    className="absolute right-0 z-40 mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-xl shadow-brand-navy/10 dark:border-slate-700 dark:bg-slate-900"
                                >
                                    <button
                                        type="button"
                                        role="menuitem"
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100/80 dark:text-slate-200 dark:hover:bg-slate-800/70"
                                        onClick={() => {
                                            setProfileMenuOpen(false);
                                            onOpenAccountSettings?.();
                                        }}
                                    >
                                        <UserCog className="h-4 w-4" strokeWidth={2} aria-hidden />
                                        Account settings
                                    </button>
                                    <button
                                        type="button"
                                        role="menuitem"
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-700 transition hover:bg-red-100/70 dark:text-red-300 dark:hover:bg-red-950/25"
                                        onClick={() => {
                                            setProfileMenuOpen(false);
                                            setLogoutConfirmOpen(true);
                                        }}
                                    >
                                        <LogOut className="h-4 w-4" strokeWidth={2} aria-hidden />
                                        Logout
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-auto px-3 py-6 sm:px-5 sm:py-8">{children}</main>
            </div>

            {logoutConfirmOpen ? (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="logout-dialog-title" aria-describedby="logout-dialog-desc">
                    <button
                        type="button"
                        className="absolute inset-0 bg-brand-navy/30 backdrop-blur-sm dark:bg-black/50"
                        aria-label="Dismiss"
                        onClick={() => setLogoutConfirmOpen(false)}
                    />
                    <div className="relative z-10 w-full max-w-sm rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-brand-navy/10 dark:border-slate-600 dark:bg-slate-900">
                        <h2 id="logout-dialog-title" className="text-lg font-semibold text-brand-navy dark:text-slate-100">
                            Sign out?
                        </h2>
                        <p id="logout-dialog-desc" className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            You will need to sign in again to access your workspace.
                        </p>
                        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700/80"
                                onClick={() => setLogoutConfirmOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="rounded-xl bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-navy/20 transition hover:bg-brand-navy-dark dark:shadow-brand-sky/10"
                                onClick={() => {
                                    setLogoutConfirmOpen(false);
                                    onLogout();
                                }}
                            >
                                Sign out
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
