<?php

namespace App\Mail;

use App\Models\Reservation;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ReservationMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public Reservation $reservation;

    public function __construct(Reservation $reservation)
    {
        $this->reservation = $reservation;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Confirmación de reserva',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.reservation',
        );
    }

    public function attachments(): array
    {
        $pdf = Pdf::loadView('pdfs.confirmation', [
            'reservation' => $this->reservation,
        ]);

        return [
            Attachment::fromData(
                fn () => $pdf->output(),
                'confirmacion-reserva-' . $this->reservation->id . '.pdf'
            )->withMime('application/pdf'),
        ];
    }
}
