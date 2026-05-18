<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel='shortcut icon' type='image/png' href='/logo.png'>
    <title inertia>KRERA</title>


    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
    @inertiaHead

    <!-- Google tag (gtag.js) -->
    @if(!config('app.debug'))
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZLED1H5P4V"></script>
        <script>
            window.dataLayer = window.dataLayer || []

            function gtag() {
                dataLayer.push(arguments)
            }

            gtag('js', new Date())

            gtag('config', 'G-ZLED1H5P4V')
        </script>
    @endif
</head>
<body class="antialiased">
@inertia
</body>

</html>
