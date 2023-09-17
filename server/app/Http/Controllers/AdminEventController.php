<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminEventController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum'); // Use Sanctum's authentication middleware
        $this->middleware('role:admin'); // Restrict access to admins
    }

    public function index()
    {
        $events = Event::all();

         return response()->json(['events' => $events]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required|time',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif', // Adjust image validation as needed
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('storage', 'public');
        }

        $event = Event::create([
            'title' => $validatedData['name'],
            'date' => $validatedData['date'],
            'time' => $validatedData['time'],
            'description' => $validatedData['description'],
            'image' => $imagePath,
        ]);

        return response()->json(['message' => 'Event created successfully', 'event' => $event]);
    }


    public function update(Request $request, Event $event)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required|time',
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

    public function destroy(Event $event)
    {
        if ($event->image) {
            Storage::disk('public')->delete($event->image);
        }

        $event->delete();

        return response()->json(['message' => 'Event deleted successfully']);
    }

}
