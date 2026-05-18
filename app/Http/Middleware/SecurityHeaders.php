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
            $response->header('X-XSS-Protection', '1; mode=block');
            $response->header('Referrer-Policy', 'same-origin');
            // $response->header(
            //     'Content-Security-Policy',
            //     "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' "
            //         . "'unsafe-inline'; img-src 'self' data:; font-src 'self'; frame-src *"
            // );
        }
        return $response;
    }
}
