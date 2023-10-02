<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;




class EventController extends Controller
{

    public function __construct()
    {
        $this->middleware('role:admin')->except('index', 'confirmAttendance', 'show');
    }
//    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $events = Event::all();
        return response()->json($events);
    }

    
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i:s',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('storage', 'public');
        }

        $event = Event::create([
            'title' => $validatedData['title'],
            'date' => $validatedData['date'],
            'time' => $validatedData['time'],
            'description' => $validatedData['description'],
            'image' => $imagePath,
        ]);

        $adminUser = Auth::user();
        $event->user()->associate($adminUser);
        $event->save();

        return response()->json(['message' => 'Event created successfully', 'event' => $event]);
    }


    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        return response()->json($event);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i:s',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif',
        ]);

        if ($request->hasFile('image')) {
            if ($event->image) {
                Storage::disk('public')->delete($event->image);
            }
            $imagePath = $request->file('image')->store('storage', 'public');
            $validatedData['image'] = $imagePath;
        }

        $event->update($validatedData);

        return response()->json(['message' => 'Event updated successfully', 'event' => $event]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        if ($event->image) {
            Storage::disk('public')->delete($event->image);
        }
        $event->delete();
        return response()->json(['message' => 'Event deleted successfully']);
    }

    /**
     * Confirm attendance to an event.
     */

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
    
    // EventController.php
    public function eventAttendees($id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['message' => 'Evento no encontrado'], 404);
        }

        $attendees = $event->attendees;

        return response()->json(['attendees' => $attendees], 200);
    }

    public function userConfirmedDate()
    {
        $user = Auth::user();

        $confirmedDate = $user->confirmAttendance; 
        return response()->json($confirmedDate);
    }
}
 
