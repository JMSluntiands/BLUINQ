import React, { useCallback, useEffect, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import WelcomePage from './pages/WelcomePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AccountSettingsPage from './pages/AccountSettingsPage.jsx';
import AddUserPage from './pages/AddUserPage.jsx';
import UserListPage from './pages/UserListPage.jsx';

function FullScreenLoader() {
    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#f4f6fa]/90 backdrop-blur-sm dark:bg-slate-950/90">
            <div
                className="h-10 w-10 rounded-full border-2 border-brand-sky border-t-brand-navy animate-spin dark:border-brand-sky/40 dark:border-t-brand-sky"
                aria-hidden
            />
        </div>
    );
}

function shouldSkipAutoToast(url = '') {
    const normalized = String(url).toLowerCase();
    return (
        normalized.includes('/login') ||
        normalized.includes('/logout') ||
        normalized.includes('/me') ||
        normalized.includes('/sanctum/csrf-cookie')
    );
}

function getMutationType(config = {}) {
    const method = String(config.method || '').toLowerCase();
    const overrideFromParams = String(config.params?._method || '').toLowerCase();
    const overrideFromData = config.data instanceof FormData ? String(config.data.get('_method') || '').toLowerCase() : '';
    const override = overrideFromParams || overrideFromData;

    if (method === 'put' || method === 'patch' || override === 'put' || override === 'patch') {
        return 'update';
    }

    if (method === 'post') {
        return 'add';
    }

    return null;
}

function Toast({ toast, onClose }) {
    if (!toast) return null;

    return (
        <div className="pointer-events-none fixed right-4 top-4 z-[200]">
            <div className="pointer-events-auto flex min-w-[260px] max-w-[360px] items-start gap-3 rounded-xl border border-emerald-300/60 bg-emerald-50 px-4 py-3 text-emerald-900 shadow-lg shadow-emerald-700/10 dark:border-emerald-700 dark:bg-emerald-950/85 dark:text-emerald-100">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
                <p className="flex-1 text-sm font-medium">{toast.message}</p>
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md p-1 text-emerald-700/80 transition hover:bg-emerald-200/50 hover:text-emerald-900 dark:text-emerald-200 dark:hover:bg-emerald-900/50"
                    aria-label="Close toast"
                >
                    <X className="h-4 w-4" aria-hidden />
                </button>
            </div>
        </div>
    );
}

function AppRoutes() {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [checking, setChecking] = useState(true);
    const [showWelcomeStep, setShowWelcomeStep] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const refreshUser = useCallback(async () => {
        try {
            const { data } = await window.axios.get('/me');
            setUser(data.user ?? null);
            if (data.user) {
                setShowWelcomeStep(false);
            }
        } catch {
            setUser(null);
            setShowWelcomeStep(false);
        } finally {
            setChecking(false);
        }
    }, []);

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    useEffect(() => {
        // Show a short transition loader on every route change.
        setPageLoading(true);
        const timer = window.setTimeout(() => setPageLoading(false), 320);
        return () => window.clearTimeout(timer);
    }, [location.pathname, location.search]);

    useEffect(() => {
        const interceptorId = window.axios.interceptors.response.use(
            (response) => {
                const config = response?.config ?? {};
                const mutationType = getMutationType(config);
                const url = String(config.url || '');
                const explicitSkip = Boolean(config?.meta?.skipSuccessToast);

                if (!explicitSkip && mutationType && !shouldSkipAutoToast(url) && response.status >= 200 && response.status < 300) {
                    setToast({
                        id: Date.now(),
                        message: mutationType === 'update' ? 'Updated successfully.' : 'Added successfully.',
                    });
                }

                return response;
            },
            (error) => Promise.reject(error),
        );

        return () => {
            window.axios.interceptors.response.eject(interceptorId);
        };
    }, []);

    useEffect(() => {
        if (!toast) return undefined;
        const timer = window.setTimeout(() => setToast(null), 2600);
        return () => window.clearTimeout(timer);
    }, [toast]);

    const handleLoggedIn = (nextUser) => {
        setUser(nextUser);
        setShowWelcomeStep(true);
    };

    const completeWelcomeStep = useCallback(() => {
        setShowWelcomeStep(false);
        navigate('/dashboard', { replace: true });
    }, [navigate]);

    const handleLoggedOut = async () => {
        try {
            await window.axios.post('/logout');
        } catch {
            /* still clear local state */
        }
        setUser(null);
        setShowWelcomeStep(false);
        try {
            sessionStorage.setItem('bluinq_notice', 'logged_out');
        } catch {
            /* ignore quota / private mode */
        }
        navigate('/', { replace: true });
    };

    if (checking) {
        return <FullScreenLoader />;
    }

    return (
        <>
            <Routes>
                <Route
                    path="/dashboard"
                    element={
                        !user ? (
                            <Navigate to="/" replace />
                        ) : showWelcomeStep ? (
                            <Navigate to="/" replace />
                        ) : (
                            <DashboardPage user={user} onLogout={handleLoggedOut} />
                        )
                    }
                />
                <Route
                    path="/account-settings"
                    element={
                        !user ? (
                            <Navigate to="/" replace />
                        ) : showWelcomeStep ? (
                            <Navigate to="/" replace />
                        ) : (
                            <AccountSettingsPage user={user} onLogout={handleLoggedOut} onUserUpdated={setUser} />
                        )
                    }
                />
                <Route
                    path="/users/add"
                    element={
                        !user ? (
                            <Navigate to="/" replace />
                        ) : showWelcomeStep ? (
                            <Navigate to="/" replace />
                        ) : (
                            <AddUserPage user={user} onLogout={handleLoggedOut} />
                        )
                    }
                />
                <Route
                    path="/users/list"
                    element={
                        !user ? (
                            <Navigate to="/" replace />
                        ) : showWelcomeStep ? (
                            <Navigate to="/" replace />
                        ) : (
                            <UserListPage user={user} onLogout={handleLoggedOut} />
                        )
                    }
                />
                <Route
                    path="/"
                    element={
                        !user ? (
                            <LoginPage onSuccess={handleLoggedIn} />
                        ) : showWelcomeStep ? (
                            <WelcomePage user={user} onComplete={completeWelcomeStep} />
                        ) : (
                            <Navigate to="/dashboard" replace />
                        )
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Toast toast={toast} onClose={() => setToast(null)} />
            {pageLoading ? <FullScreenLoader /> : null}
        </>
    );
}

export default function RootApp() {
    return <AppRoutes />;
}
