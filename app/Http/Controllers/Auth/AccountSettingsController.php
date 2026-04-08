<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class AccountSettingsController extends Controller
{
    public function update(Request $request)
    {
        $user = $request->user();

        abort_unless($user, 401);

        $validated = $request->validate([
            'fullname' => ['nullable', 'string', 'max:255'],
            'name' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'username' => ['nullable', 'string', 'max:255', Rule::unique('users', 'username')->ignore($user->id)],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ]);

        $user->fullname = $validated['fullname'] ?? $user->fullname;
        $user->name = $validated['name'] ?? $user->name;
        $user->email = $validated['email'];
        $user->username = $validated['username'] ?? $user->username;

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $directory = "img/{$user->id}";
            $extension = $image->extension() ?: 'jpg';
            $filename = 'profile_' . now()->format('YmdHis') . '.' . $extension;

            if (! empty($user->image)) {
                Storage::disk('public')->delete($user->image);
            }

            $imageContents = file_get_contents($image->getRealPath());
            Storage::disk('public')->put("{$directory}/{$filename}", $imageContents);

            $user->image = "{$directory}/{$filename}";
        }

        $user->save();

        $payload = $this->userPayload($user->fresh());

        return response()->json([
            'user' => $payload,
        ]);
    }

    private function userPayload($user): array
    {
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
