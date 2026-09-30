import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    //base: 'https://rera.mycad.in/build/',
    // Use IPv4 loopback so the dev-server origin is accepted by CSP host-source syntax.
    server: {
        host: '127.0.0.1',
    },
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
    ],
    ssr: {
        noExternal: ['@inertiajs/server'],
    },
});
