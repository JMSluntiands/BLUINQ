import React from 'react';
import ThemeToggle from '../components/ThemeToggle.jsx';

export default function DashboardPage({ user, onLogout }) {
    const displayName = user.fullname || user.name || user.email;

    return (
        <div className="dashboard-enter-shell min-h-screen bg-gradient-to-br from-[#eef2f8] via-white to-[#e4eaf5] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <header className="dashboard-enter-header border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-900/80">
                <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
                    <div className="dashboard-enter-logo flex items-center gap-3">
                        <img src="/img/logo.jpg" alt="" className="h-9 w-auto object-contain" />
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-brand-sky dark:text-brand-sky">
                                Dashboard
                            </p>
                            <p className="text-sm font-semibold text-brand-navy dark:text-slate-100">BLUINQ</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
                        <ThemeToggle />
                        <button
                            type="button"
                            onClick={onLogout}
                            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-brand-navy transition hover:border-brand-sky hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-brand-sky dark:hover:bg-slate-700/50"
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
                <div className="dashboard-enter-card rounded-3xl border border-white/80 bg-white/90 p-8 shadow-xl shadow-brand-navy/5 backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/90 dark:shadow-black/30">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-sky dark:text-brand-sky">
                        Step 3 of 3
                    </p>
                    <h1 className="mt-2 text-2xl font-semibold tracking-tight text-brand-navy dark:text-slate-100">
                        Welcome back{displayName ? `, ${displayName}` : ''}
                    </h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                        You are signed in as{' '}
                        <span className="font-medium text-slate-800 dark:text-slate-200">{user.email}</span>
                        {user.role ? (
                            <>
                                {' '}
                                · <span className="text-brand-sky font-medium capitalize">{user.role}</span>
                            </>
                        ) : null}
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        <div className="dashboard-enter-stat rounded-2xl border border-slate-100 bg-[#f8fafc] p-4 dark:border-slate-700 dark:bg-slate-800/60">
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                Overview
                            </p>
                            <p className="mt-1 text-lg font-semibold text-brand-navy dark:text-slate-100">Ready</p>
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Your workspace is active.</p>
                        </div>
                        <div className="dashboard-enter-stat rounded-2xl border border-slate-100 bg-[#f8fafc] p-4 dark:border-slate-700 dark:bg-slate-800/60">
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                Account
                            </p>
                            <p className="mt-1 text-lg font-semibold text-brand-navy dark:text-slate-100">
                                {user.username || '—'}
                            </p>
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Username on file</p>
                        </div>
                        <div className="dashboard-enter-stat rounded-2xl border border-slate-100 bg-[#f8fafc] p-4 dark:border-slate-700 dark:bg-slate-800/60">
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                Status
                            </p>
                            <p className="mt-1 text-lg font-semibold text-emerald-600 dark:text-emerald-400">Connected</p>
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Session secured</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
