import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../theme/ThemeProvider.jsx';

export default function ThemeToggle({ className = '' }) {
    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';
    const ActiveIcon = isDark ? Moon : Sun;

    return (
        <div
            className={`inline-flex rounded-xl border border-slate-200 bg-white/90 p-0.5 shadow-sm dark:border-slate-600 dark:bg-slate-800/90 ${className}`}
            role="group"
            aria-label="Theme"
        >
            <button
                type="button"
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-pressed={isDark}
                className="rounded-[10px] p-2.5 text-slate-700 transition-transform duration-300 hover:scale-[1.03] hover:bg-slate-100/80 hover:text-brand-navy dark:text-slate-200 dark:hover:bg-slate-800/60 dark:hover:text-brand-sky"
            >
                <ActiveIcon
                    key={theme}
                    className="h-5 w-5 animate-[spin_.35s_ease]"
                    strokeWidth={2}
                    aria-hidden
                />
            </button>
        </div>
    );
}
