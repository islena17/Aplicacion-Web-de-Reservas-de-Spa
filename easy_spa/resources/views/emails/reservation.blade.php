@php
$start = \Carbon\Carbon::parse(
    $reservation->reservation_date . ' ' . $reservation->start_time
)->format('Ymd\THis');

$end = \Carbon\Carbon::parse(
    $reservation->reservation_date . ' ' . $reservation->end_time
)->format('Ymd\THis');

$googleCalendarUrl =
    'https://calendar.google.com/calendar/render?action=TEMPLATE'
    . '&text=' . urlencode('Reserva Spa - ' . $reservation->service->name)
    . '&dates=' . $start . '/' . $end
    . '&details=' . urlencode(
        'Reserva en ' . $reservation->spa->name
    )
    . '&location=' . urlencode($reservation->spa->address ?? '')
    . '&sf=true&output=xml';
@endphp
<h1>Reserva confirmada</h1>

<p>Hola {{ $reservation->client->name }},</p>

<p>Tu reserva se ha creado correctamente.</p>

<ul>
    <li> <strong>Spa: </stron> {{$reservation->spa->name}}
    <li><strong>Fecha:</strong> {{ $reservation->reservation_date }}</li>
    <li><strong>Hora inicio:</strong> {{ $reservation->start_time }}</li>
    <li><strong>Hora fin:</strong> {{ $reservation->end_time }}</li>
    <li><strong>Servicio:</strong> {{ $reservation->service->name }}</li>
    <li><strong>Precio:</strong> {{ $reservation->final_price }} €</li>
    <li><strong>Estado:</strong> {{ $reservation->status }}</li>
</ul>

<a
    href="{{ $googleCalendarUrl }}"
    style="
        display:inline-block;
        padding:12px 20px;
        background:#0d6efd;
        color:white;
        text-decoration:none;
        border-radius:8px;
        font-weight:bold;
    "
>
    Añadir a Google Calendar
</a>
<p>Gracias por reservar con nosotros.</p>