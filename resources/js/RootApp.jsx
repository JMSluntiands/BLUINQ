import React, { useCallback, useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage.jsx';
import WelcomePage from './pages/WelcomePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

export default function RootApp() {
    const [user, setUser] = useState(null);
    const [checking, setChecking] = useState(true);
    /**
     * After a fresh login, show the welcome step before the dashboard.
     * Skipped when the session is restored (refresh /me).
     */
    const [showWelcomeStep, setShowWelcomeStep] = useState(false);

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

    const handleLoggedIn = (nextUser) => {
        setUser(nextUser);
        setShowWelcomeStep(true);
    };

    const finishWelcomeStep = useCallback(() => {
        setShowWelcomeStep(false);
    }, []);

    const handleLoggedOut = async () => {
        try {
            await window.axios.post('/logout');
        } catch {
            /* still clear local state */
        }
        setUser(null);
        setShowWelcomeStep(false);
    };

    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f4f6fa] dark:bg-slate-950">
                <div
                    className="h-10 w-10 rounded-full border-2 border-brand-sky border-t-brand-navy animate-spin dark:border-brand-sky/40 dark:border-t-brand-sky"
                    aria-hidden
                />
            </div>
        );
    }

    if (!user) {
        return <LoginPage onSuccess={handleLoggedIn} />;
    }

    if (showWelcomeStep) {
        return <WelcomePage user={user} onComplete={finishWelcomeStep} />;
    }

    return <DashboardPage user={user} onLogout={handleLoggedOut} />;
}
