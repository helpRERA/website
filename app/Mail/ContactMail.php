<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactMail extends Mailable
{
    use Queueable, SerializesModels;

    public $name;
    public $email;
    public $description;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($name, $email, $description)
    {
        $this->name = $name;
        $this->email = $email;
        $this->description = $description;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('contact-mail')
            ->subject('Contact')
            ->with([
                'name' => $this->name,
                'email' => $this->email,
                'message' => $this->description,
            ]);
    }
}
