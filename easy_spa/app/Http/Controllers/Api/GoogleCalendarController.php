<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Google\Client;
use Google\Service\Calendar;
use Illuminate\Http\Request;

class GoogleCalendarController extends Controller
{
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

        return response()->json([
            'url' => $client->createAuthUrl()
        ]);
    }

    public function callback(Request $request)
    {
        $client = $this->getClient();

        $token = $client->fetchAccessTokenWithAuthCode($request->code);

        $user = $request->user();

        $user->update([
            'google_token' => json_encode($token),
        ]);

        return redirect('https://easyspa.onrender.com/webmaster/calendar');
    }
}
