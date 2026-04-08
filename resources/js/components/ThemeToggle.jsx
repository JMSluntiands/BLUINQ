import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../theme/ThemeProvider.jsx';

export default function ThemeToggle({ className = '' }) {
    const { theme, setTheme } = useTheme();

    return (
        <div
            className={`inline-flex rounded-xl border border-slate-200 bg-white/90 p-0.5 shadow-sm dark:border-slate-600 dark:bg-slate-800/90 ${className}`}
            role="group"
            aria-label="Theme"
        >
            <button
                type="button"
                onClick={() => setTheme('light')}
                aria-label="Light mode"
                aria-pressed={theme === 'light'}
                className={`rounded-[10px] p-2.5 transition ${
                    theme === 'light'
                        ? 'bg-brand-navy text-white shadow-sm dark:bg-brand-sky dark:text-slate-950'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-brand-navy dark:text-slate-400 dark:hover:bg-slate-700/60 dark:hover:text-slate-200'
                }`}
            >
                <Sun className="h-5 w-5" strokeWidth={2} aria-hidden />
            </button>
            <button
                type="button"
                onClick={() => setTheme('dark')}
                aria-label="Dark mode"
                aria-pressed={theme === 'dark'}
                className={`rounded-[10px] p-2.5 transition ${
                    theme === 'dark'
                        ? 'bg-brand-navy text-white shadow-sm dark:bg-brand-sky dark:text-slate-950'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-brand-navy dark:text-slate-400 dark:hover:bg-slate-700/60 dark:hover:text-slate-200'
                }`}
            >
                <Moon className="h-5 w-5" strokeWidth={2} aria-hidden />
            </button>
        </div>
    );
}
