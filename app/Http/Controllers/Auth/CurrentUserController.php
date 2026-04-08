<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CurrentUserController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'user' => $user ? $user->only(['id', 'name', 'email', 'username', 'fullname', 'role']) : null,
        ]);
    }
}
