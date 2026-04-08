<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CurrentUserController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();
        $normalizedImagePath = $this->normalizeImagePath($user?->image);

        return response()->json([
            'user' => $user
                ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'username' => $user->username,
                    'fullname' => $user->fullname,
                    'role' => $user->role,
                    'image' => $normalizedImagePath,
                    'image_url' => $normalizedImagePath ? asset('storage/' . $normalizedImagePath) : null,
                ]
                : null,
        ]);
    }

    private function normalizeImagePath(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        $normalized = trim(str_replace('\\', '/', $path), '/');
        $normalized = preg_replace('#^storage/#', '', $normalized);
        $normalized = preg_replace('#^public/#', '', $normalized);

        return $normalized ?: null;
    }
}
