import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardShell from '../components/DashboardShell.jsx';

export default function DashboardPage({ user, onLogout }) {
    const navigate = useNavigate();
    const handleOpenAccountSettings = () => {
        navigate('/account-settings');
    };

    return (
        <DashboardShell user={user} onLogout={onLogout} onOpenAccountSettings={handleOpenAccountSettings} activeNav="overview" headerTitle="Overview">
            <div className="w-full px-0">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 md:items-stretch">
                    <div className="dashboard-enter-stat flex flex-col rounded-2xl border border-sky-400/20 bg-gradient-to-br from-sky-900/60 via-[#0f1b33] to-[#0b1220] p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-300">Total Users</p>
                        <p className="mt-3 text-3xl font-semibold tracking-tight text-white">128</p>
                        <p className="mt-auto pt-3 text-xs text-slate-200/90">All users in your Bluinq workspace.</p>
                    </div>
                    <div className="dashboard-enter-stat flex flex-col rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-900/55 via-[#112029] to-[#0b151d] p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-300">Active Projects</p>
                        <p className="mt-3 text-3xl font-semibold tracking-tight text-emerald-400">12</p>
                        <p className="mt-auto pt-3 text-xs text-slate-200/90">Projects currently in progress.</p>
                    </div>
                    <div className="dashboard-enter-stat flex flex-col rounded-2xl border border-amber-400/25 bg-gradient-to-br from-amber-900/50 via-[#2a1d12] to-[#17120c] p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-300">Open Reports</p>
                        <p className="mt-3 text-3xl font-semibold tracking-tight text-amber-300">5</p>
                        <p className="mt-auto pt-3 text-xs text-slate-200/90">Items waiting for your review.</p>
                    </div>
                    <div className="dashboard-enter-stat flex flex-col rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-900/50 via-[#1f1832] to-[#141224] p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-300">Completed Tasks</p>
                        <p className="mt-3 text-3xl font-semibold tracking-tight text-sky-300">46</p>
                        <p className="mt-auto pt-3 text-xs text-slate-200/90">Tasks marked as done this week.</p>
                    </div>
                </div>

            </div>
        </DashboardShell>
    );
}
