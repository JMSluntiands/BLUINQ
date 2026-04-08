import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import RootApp from './RootApp.jsx';
import { ThemeProvider } from './theme/ThemeProvider.jsx';

const rootElement = document.getElementById('app');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <ThemeProvider>
                <RootApp />
            </ThemeProvider>
        </React.StrictMode>,
    );
}
