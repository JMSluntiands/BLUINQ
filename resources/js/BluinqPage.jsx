import React from 'react';

export default function BluinqPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-slate-100 flex items-center justify-center px-4">
            <div className="max-w-4xl w-full bg-white/80 backdrop-blur rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="grid md:grid-cols-[1.4fr,1fr]">
                    <div className="p-8 md:p-10">
                        <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 mb-6">
                            <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
                            Bluinq Dashboard Preview
                        </div>

                        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-3">
                            Smart billing for modern
                            <span className="text-sky-600"> Bluinq</span> teams
                        </h1>
                        <p className="text-sm md:text-base text-slate-600 mb-6 leading-relaxed">
                            Centralize your invoices, track payments in real time, and get clear insights on your
                            business health—all in one beautiful dashboard.
                        </p>

                        <div className="flex flex-wrap gap-3 mb-7">
                            <button className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 transition-colors">
                                Go to Bluinq
                            </button>
                            <button className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-sky-500 hover:text-sky-600 transition-colors">
                                View reports
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-xs md:text-sm">
                            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3">
                                <p className="text-slate-500 mb-1">Monthly revenue</p>
                                <p className="text-lg font-semibold text-slate-900">$48,920</p>
                                <p className="text-[11px] text-emerald-600 mt-1">+18% vs last month</p>
                            </div>
                            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3">
                                <p className="text-slate-500 mb-1">Paid invoices</p>
                                <p className="text-lg font-semibold text-slate-900">126</p>
                                <p className="text-[11px] text-emerald-600 mt-1">92% on time</p>
                            </div>
                            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3">
                                <p className="text-slate-500 mb-1">Outstanding</p>
                                <p className="text-lg font-semibold text-slate-900">$7,430</p>
                                <p className="text-[11px] text-amber-600 mt-1">3 invoices overdue</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative bg-slate-950 text-slate-50 px-6 py-8 md:px-7 md:py-9">
                        <div className="absolute inset-x-6 top-6 flex items-center justify-between text-[11px] text-slate-400">
                            <span className="inline-flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                Live status
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700">
                                BLUINQ-OPS
                            </span>
                        </div>

                        <div className="mt-10 space-y-3 text-xs font-mono">
                            <div className="flex items-center justify-between rounded-xl bg-slate-900/70 border border-slate-700 px-3 py-2">
                                <span className="text-slate-300">Next payout</span>
                                <span className="text-emerald-400">$12,430 • in 2 days</span>
                            </div>
                            <div className="rounded-xl bg-slate-900/70 border border-slate-800 px-3 py-2">
                                <p className="text-slate-400 mb-1">Today</p>
                                <ul className="space-y-0.5 text-[11px]">
                                    <li className="flex justify-between">
                                        <span className="text-slate-300">+ ₱18,400 • 9 invoices</span>
                                        <span className="text-emerald-400">settled</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-slate-300">+ ₱6,120 • 3 invoices</span>
                                        <span className="text-amber-400">pending</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="rounded-xl bg-gradient-to-r from-sky-500/20 via-sky-400/10 to-transparent border border-sky-500/40 px-3 py-2">
                                <p className="text-[11px] text-sky-200 mb-1">
                                    Insight
                                </p>
                                <p className="text-[11px] text-slate-100">
                                    Bluinq can reduce your average invoice collection time by
                                    <span className="font-semibold text-sky-100"> 32%</span>.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-between items-center text-[11px] text-slate-400">
                            <span>Bluinq v1.0 • Sandbox</span>
                            <span className="inline-flex items-center gap-1">
                                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                                synced 2s ago
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

