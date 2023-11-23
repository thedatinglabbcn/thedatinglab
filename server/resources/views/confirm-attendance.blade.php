@component('mail::message')
# Confirmación de Asistencia

¡Gracias por confirmar tu asistencia al evento {{ $event->title }}!

Detalles del evento:
- Fecha: {{ $event->date }}
- Lugar: {{ $event->location }}
- Descripción: {{ $event->description }}

¡Esperamos verte allí!

Saludos,
{{ config('app.name') }}
@endcomponent