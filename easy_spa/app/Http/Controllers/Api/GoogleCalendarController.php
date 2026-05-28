<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Google\Client;
use Google\Service\Calendar;
use Illuminate\Http\Request;

class GoogleCalendarController extends Controller
{
    // Configura el cliente de Google con las credenciales de la aplicación.
    private function getClient()
    {
        $client = new Client();

        $client->setClientId(config('services.google.client_id'));
        $client->setClientSecret(config('services.google.client_secret'));
        $client->setRedirectUri(config('services.google.redirect'));
        $client->addScope(Calendar::CALENDAR_EVENTS);
        $client->setAccessType('offline');
        $client->setPrompt('consent');

        return $client;
    }

    public function redirect()
    {
        $client = $this->getClient();

        // Genera la URL de autorización de Google Calendar.
        return response()->json([
            'url' => $client->createAuthUrl()
        ]);
    }

    public function callback(Request $request)
    {
        $client = $this->getClient();

        // Intercambia el código recibido por el token de acceso.
        $token = $client->fetchAccessTokenWithAuthCode($request->code);

        $user = $request->user();

        // Guarda el token de Google asociado al usuario autenticado.
        $user->update([
            'google_token' => json_encode($token),
        ]);

        // Redirige al calendario del panel webmaster.
        return redirect('https://easyspa.onrender.com/webmaster/calendar');
    }
}