import React, { useCallback, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import LoginArchitectBackground from '../components/LoginArchitectBackground.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';

export default function WelcomePage({ user, onComplete }) {
    const displayName = user.fullname || user.name || user.email;

    const goToDashboard = useCallback(() => {
        onComplete?.();
    }, [onComplete]);

    useEffect(() => {
        const t = setTimeout(goToDashboard, 3200);
        return () => clearTimeout(t);
    }, [goToDashboard]);

    return (
        <div className="welcome-step-shell relative min-h-screen overflow-hidden bg-gradient-to-br from-[#eef2f8] via-white to-[#e4eaf5] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <div className="absolute right-4 top-4 z-[2] sm:right-6 sm:top-6">
                <ThemeToggle />
            </div>

            <LoginArchitectBackground />

            <div className="relative z-[1] flex min-h-screen flex-col items-center justify-center px-4 py-16">
                <div className="welcome-step-card w-full max-w-md rounded-3xl border border-white/80 bg-white/95 px-8 py-10 text-center shadow-2xl shadow-brand-navy/10 backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-900/95 dark:shadow-black/40">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-navy/10 text-brand-navy dark:bg-brand-sky/15 dark:text-brand-sky">
                        <Sparkles className="h-8 w-8" strokeWidth={2} aria-hidden />
                    </div>

                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-sky dark:text-brand-sky">
                        Step 2 of 3
                    </p>
                    <h1 className="mt-2 text-3xl font-semibold tracking-tight text-brand-navy dark:text-slate-100">
                        Welcome
                    </h1>
                    <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
                        {displayName ? (
                            <>
                                Signed in as <span className="font-semibold text-slate-800 dark:text-slate-200">{displayName}</span>
                            </>
                        ) : (
                            'You are signed in.'
                        )}
                    </p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-500">Opening your dashboard next…</p>

                    <div className="mx-auto mt-8 h-1.5 w-full max-w-[200px] overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                        <div className="welcome-step-progress h-full rounded-full bg-brand-navy dark:bg-brand-sky" />
                    </div>

                    <button
                        type="button"
                        onClick={goToDashboard}
                        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-navy py-3 text-sm font-semibold text-white shadow-md shadow-brand-navy/25 transition hover:bg-brand-navy-dark dark:shadow-brand-sky/10"
                    >
                        Continue to dashboard
                        <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                    </button>
                </div>

                <p className="mt-8 text-center text-xs text-slate-500 dark:text-slate-500">BLUINQ</p>
            </div>
        </div>
    );
}
