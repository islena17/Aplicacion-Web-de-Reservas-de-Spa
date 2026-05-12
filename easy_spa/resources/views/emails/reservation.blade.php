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

<p>Gracias por reservar con nosotros.</p>