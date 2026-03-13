<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>BLUINQ</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @vite(['resources/css/app.css'])
    </head>
    <body class="relative min-h-screen bg-slate-950 text-slate-50 overflow-hidden">
        <div class="pointer-events-none absolute inset-0 -z-10">
            <div class="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-sky-500/40 blur-3xl animate-pulse"></div>
            <div class="absolute bottom-0 right-[-6rem] h-80 w-80 rounded-full bg-emerald-400/30 blur-3xl animate-[pulse_8s_ease-in-out_infinite]"></div>
            <div class="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-700/20 blur-3xl animate-[spin_40s_linear_infinite]"></div>
        </div>

        <div class="relative flex min-h-screen flex-col px-6 py-4 lg:px-12 lg:py-6">
            <header class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-2">
                    <div class="flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-500/90 shadow-lg shadow-sky-500/40 animate-bounce">
                        <span class="text-xs font-semibold tracking-[0.16em]">B</span>
                    </div>
                    <div>
                        <p class="text-xs uppercase tracking-[0.24em] text-slate-400">Welcome to</p>
                        <p class="text-sm font-semibold tracking-wide">BLUINQ</p>
                    </div>
                </div>
            </header>

            <main class="mt-10 flex flex-1 flex-col items-center justify-center">
                <div class="relative w-full max-w-5xl">
                    <div class="absolute -inset-x-10 -top-10 h-40 rounded-3xl bg-gradient-to-r from-sky-500/40 via-sky-400/10 to-transparent blur-3xl opacity-60 animate-pulse"></div>

                    <div class="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/80 shadow-2xl shadow-sky-950/80 backdrop-blur-xl">
                        <div class="grid gap-8 p-6 md:grid-cols-[1.3fr,1fr] md:p-10">
                            <section class="space-y-6">
                                <div class="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/10 px-3 py-1 text-[11px] font-medium text-sky-100 animate-[pulse_10s_ease-in-out_infinite]">
                                    <span class="h-1.5 w-1.5 animate-ping rounded-full bg-emerald-400"></span>
                                    <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                                    <span>Real‑time billing engine is live</span>
                                </div>

                                <div class="space-y-3">
                                    <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                                        Welcome to
                                        <span class="bg-gradient-to-r from-sky-300 via-sky-400 to-emerald-300 bg-clip-text text-transparent">
                                            BLUINQ
                                        </span>
                                        Control Center
                                    </h1>
                                    <p class="max-w-xl text-sm text-slate-300 sm:text-base">
                                        Manage invoices, monitor cashflow, and keep every client payment in sync.
                                        BLUINQ gives you a clear, animated view of how your business moves.
                                    </p>
                                </div>
                            </section>

                            <section class="relative">
                                <div class="relative flex h-full flex-col justify-between rounded-2xl border border-slate-700/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 px-4 py-4 text-[11px] font-mono text-slate-200">
                                    <div class="space-y-1.5">
                                        <p class="text-emerald-300/90">
                                            [08:14:02] connected ▶ tenant<span class="text-sky-300">/acme-corp</span>
                                        </p>
                                        <p>
                                            [08:14:05] invoice <span class="text-sky-300">INV‑2026‑184</span> paid •
                                            <span class="text-emerald-300">+₱12,480.00</span>
                                        </p>
                                        <p class="text-amber-300">
                                            [08:14:29] reminder queued • 3 overdue invoices
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </body>
</html>

