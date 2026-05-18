<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HostHeaderMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
//        $validHost = config('app.valid_host', '127.0.0.1:8000');
//        $host = $request->getHost();
//        if ($host !== $validHost) {
//            abort(400, "Invalid host: $host");
//        }
        return $next($request);
    }
}
