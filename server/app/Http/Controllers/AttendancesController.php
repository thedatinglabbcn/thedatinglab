<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AttendancesController extends Controller
{
    public function confirmAttendance($id)
    { 
        $user = Auth::user();
        
        $event = Event::find($id);
        
        $event->confirmAttendance()->attach($user);

        $confirmedDate = $user->confirmAttendance;
        
        return response()->json([
            'res' => true,
            'confirmedDate' => $confirmedDate,
        ]);
    }
    public function eventAttendees($id)
    {
        $user = Auth::user();

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
