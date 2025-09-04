<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormMail;
use App\Mail\ContactFormConfirmation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        // Disable redirect on CSRF failure
        $request->headers->set('X-Requested-With', 'XMLHttpRequest');
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        try {
            // Send notification to admin
            Mail::to(config('mail.inquiry_send_address'))
                ->send(new ContactFormMail($validated));

            // Send confirmation to user
            Mail::to($validated['email'])
                ->send(new ContactFormConfirmation($validated));

            return response()->json([
                'message' => 'Thank you for your message. We will get back to you soon!'
            ]);
        } catch (\Exception $e) {
            \Log::error('Contact form email error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Sorry, something went wrong. Please try again later.'
            ], 500);
        }
    }
}
