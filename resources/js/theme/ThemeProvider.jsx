import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const BLUINQ_THEME_KEY = 'bluinq-theme';

const ThemeContext = createContext({
    theme: 'light',
    setTheme: () => {},
    toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
    const [theme, setThemeState] = useState(() => {
        try {
            const stored = localStorage.getItem(BLUINQ_THEME_KEY);
            if (stored === 'dark' || stored === 'light') {
                return stored;
            }
        } catch {
            /* ignore */
        }
        return 'light';
    });

    useEffect(() => {
        try {
            localStorage.setItem(BLUINQ_THEME_KEY, theme);
        } catch {
            /* ignore */
        }
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    const setTheme = (next) => {
        if (next === 'light' || next === 'dark') {
            setThemeState(next);
        }
    };

    const toggleTheme = () => {
        setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    return useContext(ThemeContext);
}
