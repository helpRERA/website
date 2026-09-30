<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     *
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        if (method_exists($response, 'header')) {
            // The Blade app shell contains inline bootstrap/analytics scripts.
            $scriptSources = "'self' 'unsafe-inline' https://www.googletagmanager.com";
            $connectSources = "'self' https://www.google-analytics.com https://www.google.com";
            $fontSources = "'self' data: https://fonts.gstatic.com";

            // Laravel's Vite hot file is the reliable indicator that the dev server
            // is active; APP_DEBUG may be disabled in local environments.
            $viteHotFile = public_path('hot');
            if (is_file($viteHotFile)) {
                $viteUrl = trim(file_get_contents($viteHotFile));
                $vite = parse_url($viteUrl);

                if ($vite !== false && isset($vite['scheme'], $vite['host'])) {
                    $viteOrigin = $vite['scheme'] . '://' . $vite['host']
                        . (isset($vite['port']) ? ':' . $vite['port'] : '');
                    $viteWsOrigin = ($vite['scheme'] === 'https' ? 'wss' : 'ws')
                        . '://' . $vite['host'] . (isset($vite['port']) ? ':' . $vite['port'] : '');

                    $scriptSources .= ' ' . $viteOrigin;
                    $connectSources .= ' ' . $viteOrigin . ' ' . $viteWsOrigin;
                    $fontSources .= ' ' . $viteOrigin;
                }
            }

            $response->headers->set(
                'Content-Security-Policy',
                "default-src 'self'; script-src {$scriptSources}; "
                    . "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
                    . "img-src 'self' data: https://i.ibb.co https://tuk-cdn.s3.amazonaws.com https://img.youtube.com; "
                    . "font-src {$fontSources}; connect-src {$connectSources}; "
                    . "frame-src https://www.google.com https://maps.google.com https://www.youtube.com https://www.youtube-nocookie.com; "
                    . "object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
            );
            $response->headers->set('X-Frame-Options', 'DENY');
            $response->headers->set('X-Content-Type-Options', 'nosniff');
            $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        }
        return $response;
    }
}
