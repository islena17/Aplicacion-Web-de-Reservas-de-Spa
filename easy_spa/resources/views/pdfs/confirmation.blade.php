<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Confirmación de reserva</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            color: #333;
        }

        .container {
            padding: 30px;
        }

        h1 {
            text-align: center;
        }

        .box {
            border: 1px solid #ccc;
            padding: 20px;
            margin-top: 20px;
        }

        .label {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Confirmación de reserva</h1>

        <p>Hola {{ $reservation->client->name }},</p>

        <p>Tu reserva se ha creado correctamente.</p>

        <div class="box">
            <p><span class="label">Spa:</span> {{ $reservation->spa->name }}</p>
            <p><span class="label">Reserva Nº:</span> {{ $reservation->id }}</p>
            <p><span class="label">Servicio:</span> {{ $reservation->service->name }}</p>
            <p><span class="label">Fecha:</span> {{ $reservation->reservation_date }}</p>
            <p><span class="label">Hora:</span> {{ $reservation->start_time }} - {{ $reservation->end_time }}</p>
            <p><span class="label">Precio:</span> {{ $reservation->final_price }} €</p>
            <p><span class="label">Estado:</span> {{ $reservation->status }}</p>

        </div>

        <p>Gracias por confiar en nosotros.</p>
    </div>
</body>
</html>