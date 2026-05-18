<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;

class ContactUsController extends Controller
{
    public function sendMail(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'message' => 'required|string|max:1000'
        ]);
        if (RateLimiter::remaining('contact-us' . $request->ip(), 3) > 0) {
            RateLimiter::hit('contact-us' . $request->ip(), 3600);
            try {
                Mail::to(config('app.receiver_email'))
                    ->send(new ContactMail(
                        $request->name,
                        $request->email,
                        $request->message
                    ));
            } catch (\Exception $exception) {
                return redirect()->back()->with(['error' => $exception->getMessage()]);
            }

            return redirect()->back()->with(['message' => 'Message sent successfully']);
        }

        $seconds = RateLimiter::availableIn('contact-us' . $request->ip());

        return redirect()->back()
            ->with([
                'error' => 'You Can Send Only 3 Messages In An Hour, Try Again In '
                    . round(($seconds / 60)) . ' Minutes'
            ]);

        // if (!ReCaptcha::recaptcha($request->input('token'))) {
        //     return response()->json([
        //         'send' => false
        //     ]);
        // }

    }
}
