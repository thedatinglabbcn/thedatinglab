<?php

  

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\DemoMail;

  

class MailController extends Controller

{

    /**

     * Write code on Method

     */

     public function sendPaymentReminderEmail(Request $request)
     {
         // Obtén la dirección de correo electrónico del usuario desde la autenticación o la base de datos
         $userEmail = $request->user()->email;
     
         // Crea un arreglo con los datos del correo (opcional)
         $mailData = [
             'title' => 'Recordatorio de Pago',
             'body' => 'Por favor, abone el evento para completar su asistencia.'
         ];
     
         // Envía el correo electrónico utilizando la clase DemoMail
         Mail::to($userEmail)->send(new DemoMail($mailData));
     
         return response()->json(['message' => 'Correo electrónico de recordatorio de pago enviado con éxito']);
     }

}