<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Mail;


class AttendancesController extends Controller
{
    public function confirmAttendance($id)
    { 
        $user = Auth::user();
        
        $event = Event::find($id);
        
        $event->confirmAttendance()->attach($user);

        $confirmedDate = $user->confirmAttendance;
        
        try {
            // Envío del correo electrónico de confirmación de asistencia
            Mail::to($user->email)->send(new ConfirmAttendanceMail($event));
            
            return response()->json([
                'message' => 'Correo electrónico de confirmación enviado correctamente',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'res' => false,
                'message' => 'Error al enviar el correo electrónico: ' . $e->getMessage(),
            ], 500);
        }

        return response()->json([
            'res' => true,
            'confirmedDate' => $confirmedDate,
        ]);
    }
    public function eventAttendees($id)
    {

        $event = Event::find($id);

        if (!$event) {
            return response()->json(['message' => 'Evento no encontrado'], 404);
        }

        $attendees = $event->confirmAttendance()->with('profile')->get(); 

        return response()->json(['attendees' => $attendees], 200); 
    }

    public function getEventsForUser($userId)
    {

        $user = User::find($userId);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $event = $user->confirmAttendance()->get();

        return response()->json(['event' => $event], 200);
    }
}
