import React from 'react';

/**
 * Animated “architect” backdrop: blueprint grids, structural beams, light frames.
 */
export default function LoginArchitectBackground() {
    return (
        <div className="login-arch-root absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
            {/* Soft brand glows (kept subtle so grid reads clearly) */}
            <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-sky/20 blur-3xl login-arch-glow-a dark:bg-brand-sky/10" />
            <div className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-brand-navy/12 blur-3xl login-arch-glow-b dark:bg-brand-navy/25" />

            {/* Blueprint grids */}
            <div className="login-arch-layer-grid absolute inset-0" />
            <div className="login-arch-layer-grid-major absolute inset-0" />

            {/* Diagonal structural hatching */}
            <div className="login-arch-beams absolute left-1/2 top-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2" />

            {/* Floating wireframe frames */}
            <div className="login-arch-frame login-arch-frame--1 absolute border border-brand-navy/15 dark:border-brand-sky/20" />
            <div className="login-arch-frame login-arch-frame--2 absolute border border-brand-navy/12 dark:border-brand-sky/15" />
            <div className="login-arch-frame login-arch-frame--3 absolute border border-brand-sky/25 dark:border-brand-sky/10" />

            {/* Corner “dimension” ticks */}
            <svg className="login-arch-corners absolute inset-0 h-full w-full text-brand-navy/20 dark:text-brand-sky/25" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="arch-corner-pattern" width="120" height="120" patternUnits="userSpaceOnUse">
                        <path d="M0 8h8M0 0v8M112 0v8h8M112 112h8v-8M0 112h8v8" fill="none" stroke="currentColor" strokeWidth="0.75" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#arch-corner-pattern)" className="login-arch-corner-fill" />
            </svg>
        </div>
    );
}
