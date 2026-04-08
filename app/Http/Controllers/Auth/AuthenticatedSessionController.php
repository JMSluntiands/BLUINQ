<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthenticatedSessionController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'password' => ['required', 'string'],
            'remember' => ['sometimes', 'boolean'],
        ]);

        $login = trim((string) ($request->input('login') ?? $request->input('email') ?? ''));

        if ($login === '') {
            throw ValidationException::withMessages([
                'login' => __('An email or username is required.'),
            ]);
        }

        $normalized = mb_strtolower($login, 'UTF-8');

        $user = User::query()
            ->where(function ($q) use ($normalized) {
                $q->whereRaw('LOWER(email) = ?', [$normalized])
                    ->orWhereRaw('LOWER(COALESCE(username, \'\')) = ?', [$normalized]);
            })
            ->first();

        if (! $user || ! Hash::check($request->input('password'), $user->getAuthPassword())) {
            throw ValidationException::withMessages([
                'login' => __('The provided credentials do not match our records.'),
            ]);
        }

        Auth::login($user, $request->boolean('remember'));

        $request->session()->regenerate();

        return response()->json([
            'user' => $this->userPayload($request),
        ]);
    }

    public function destroy(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['ok' => true]);
    }

    private function userPayload(Request $request): array
    {
        $user = $request->user();
        $normalizedImagePath = $this->normalizeImagePath($user->image);

        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'username' => $user->username,
            'fullname' => $user->fullname,
            'role' => $user->role,
            'image' => $normalizedImagePath,
            'image_url' => $normalizedImagePath ? asset('storage/' . $normalizedImagePath) : null,
        ];
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
