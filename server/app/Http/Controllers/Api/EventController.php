<?php

namespace App\Http\Controllers\Api;

use App\Models\Event;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:admin')->except('index', 'show');
    }

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
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i:s',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ], 422);
        }

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('uploads', 'public');
        }

        $event = Event::create([
            'title' => $request->input('title'),
            'date' => $request->input('date'),
            'time' => $request->input('time'),
            'description' => $request->input('description'),
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
}
