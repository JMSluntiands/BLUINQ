import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import BluinqPage from './BluinqPage.jsx';

const rootElement = document.getElementById('app');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <BluinqPage />
        </React.StrictMode>,
    );
}

