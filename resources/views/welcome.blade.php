<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>BLUINQ</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />

        <script>
            try {
                if (localStorage.getItem('bluinq-theme') === 'dark') {
                    document.documentElement.classList.add('dark');
                }
            } catch (e) {}
        </script>

        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    </head>
    <body class="antialiased min-h-screen bg-[#f4f6fa] text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <div id="app">
            <div class="flex min-h-screen items-center justify-center px-4 text-center text-sm text-slate-500 dark:text-slate-400">
                <p>Loading BLUINQ…</p>
            </div>
        </div>
        <noscript>
            <div class="fixed inset-0 flex items-center justify-center bg-[#f4f6fa] p-6 text-center text-slate-700 dark:bg-slate-950 dark:text-slate-300">
                <p>JavaScript is required to use BLUINQ. Please enable it in your browser.</p>
            </div>
        </noscript>

        <script>
            setTimeout(function () {
                var el = document.getElementById('app');
                if (!el || el.textContent.indexOf('Loading BLUINQ') === -1) return;
                el.innerHTML =
                    '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:1.5rem;font-family:system-ui,sans-serif;font-size:14px;color:#475569;text-align:center;line-height:1.6">' +
                    '<div style="max-width:32rem">' +
                    '<p style="margin:0 0 12px;font-weight:600;color:#34447a">Hindi nag-load ang app (stuck sa Loading).</p>' +
                    '<p style="margin:0 0 12px">Kadalasang dahilan: may <code style="background:#f1f5f9;padding:2px 8px;border-radius:6px">public/hot</code> pero hindi tumatakbo ang Vite (<code style="background:#f1f5f9;padding:2px 8px;border-radius:6px">npm run dev</code>).</p>' +
                    '<p style="margin:0"><strong>Ayusin:</strong> burahin ang file <code style="background:#f1f5f9;padding:2px 8px;border-radius:6px">public/hot</code>, tapos <code style="background:#f1f5f9;padding:2px 8px;border-radius:6px">npm run build</code> — o patakbuhin nang sabay ang <code style="background:#f1f5f9;padding:2px 8px;border-radius:6px">php artisan serve</code> at <code style="background:#f1f5f9;padding:2px 8px;border-radius:6px">npm run dev</code>.</p>' +
                    '</div></div>';
            }, 6000);
        </script>
    </body>
</html>
