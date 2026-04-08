import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import LoginArchitectBackground from '../components/LoginArchitectBackground.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';

export default function LoginPage({ onSuccess }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    /** Stops Chrome/Safari autofill dropdown until the user focuses the field (readonly trick). */
    const [loginUnlocked, setLoginUnlocked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(true);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            const { data } = await window.axios.post('/login', {
                login,
                password,
                remember,
            });
            onSuccess(data.user);
        } catch (err) {
            const msg =
                err.response?.data?.message ||
                err.response?.data?.errors?.login?.[0] ||
                err.response?.data?.errors?.email?.[0] ||
                'Could not sign in. Check your username or email and password.';
            setError(msg);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-[#eef2f8] via-white to-[#e4eaf5] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col items-center justify-center px-4 py-10">
            <div className="absolute right-4 top-4 z-[2] sm:right-6 sm:top-6">
                <ThemeToggle />
            </div>

            <LoginArchitectBackground />

            <div className="relative z-[1] w-full max-w-md">
                <div className="rounded-3xl bg-white/90 backdrop-blur-md shadow-xl shadow-brand-navy/10 border border-white/80 px-8 py-10 sm:px-10 dark:bg-slate-900/90 dark:border-slate-700/80 dark:shadow-black/40">
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-brand-navy/5 dark:bg-slate-800 dark:ring-slate-600/60">
                            <img
                                src="/img/logo.jpg"
                                alt="BLUINQ"
                                className="h-12 w-auto max-w-[200px] object-contain"
                            />
                        </div>
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-sky dark:text-brand-sky">
                            Step 1 of 3
                        </p>
                        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-brand-navy dark:text-slate-100">
                            Sign in
                        </h1>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Use your Bluinq account to open the dashboard.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
                        {error ? (
                            <div
                                className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/50 dark:text-red-200"
                                role="alert"
                            >
                                {error}
                            </div>
                        ) : null}

                        <div>
                            <label
                                htmlFor="bluinq-login"
                                className="block text-xs font-medium tracking-wide text-brand-navy/80 dark:text-slate-400 mb-1.5"
                            >
                                Email or username
                            </label>
                            <input
                                id="bluinq-login"
                                name="bluinq_login_identifier"
                                type="text"
                                inputMode="text"
                                autoComplete="off"
                                autoCapitalize="none"
                                autoCorrect="off"
                                spellCheck="false"
                                data-lpignore="true"
                                data-1p-ignore
                                data-form-type="other"
                                readOnly={!loginUnlocked}
                                required
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                onFocus={() => setLoginUnlocked(true)}
                                placeholder="Enter your email or username"
                                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition read-only:bg-slate-50 read-only:cursor-pointer focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/30 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:read-only:bg-slate-800/80 dark:placeholder:text-slate-500 dark:focus:border-brand-sky dark:focus:ring-brand-sky/25"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="bluinq-password"
                                className="block text-xs font-medium tracking-wide text-brand-navy/80 dark:text-slate-400 mb-1.5"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="bluinq-password"
                                    name="bluinq_password_field"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-12 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/30 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-brand-sky dark:focus:ring-brand-sky/25"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-brand-navy dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" strokeWidth={2} aria-hidden />
                                    ) : (
                                        <Eye className="h-5 w-5" strokeWidth={2} aria-hidden />
                                    )}
                                </button>
                            </div>
                        </div>

                        <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                                className="rounded border-slate-300 text-brand-navy focus:ring-brand-sky/40 dark:border-slate-500 dark:bg-slate-800"
                            />
                            Remember this device
                        </label>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full rounded-xl bg-brand-navy py-3 text-sm font-semibold text-white shadow-md shadow-brand-navy/25 transition hover:bg-brand-navy-dark disabled:opacity-60 disabled:pointer-events-none dark:shadow-brand-sky/10"
                        >
                            {submitting ? 'Signing in…' : 'Sign in'}
                        </button>
                    </form>
                </div>

                <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-500">BLUINQ • Secure access</p>
            </div>
        </div>
    );
}
