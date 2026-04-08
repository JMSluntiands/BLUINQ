<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserManagementController extends Controller
{
    public function index(Request $request)
    {
        $search = trim((string) $request->query('q', ''));
        $perPage = (int) $request->query('per_page', 10);
        $perPage = max(5, min($perPage, 50));

        $query = User::query()
            ->where('role', '!=', 'admin')
            ->whereNull('archived_at')
            ->orderByRaw('COALESCE(fullname, name)')
            ->orderBy('id', 'desc');

        if ($search !== '') {
            $query->where(function ($inner) use ($search) {
                $inner->where('fullname', 'like', "%{$search}%")
                    ->orWhere('name', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('role', 'like', "%{$search}%");
            });
        }

        $paginator = $query->paginate($perPage)->withQueryString();
        $users = collect($paginator->items())
            ->map(fn (User $user) => $this->userPayload($user))
            ->values();

        return response()->json([
            'users' => $users,
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
                'from' => $paginator->firstItem(),
                'to' => $paginator->lastItem(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'fullname' => ['required', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255', 'unique:users,username'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'role' => ['nullable', 'string', Rule::in(['user', 'staff', 'manager'])],
        ]);

        $user = User::create([
            'fullname' => $validated['fullname'],
            'name' => $validated['name'],
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            'role' => $validated['role'] ?? 'user',
        ]);

        return response()->json(['user' => $this->userPayload($user)], 201);
    }

    public function update(Request $request, int $id)
    {
        $user = User::query()
            ->whereKey($id)
            ->where('role', '!=', 'admin')
            ->whereNull('archived_at')
            ->firstOrFail();

        $validated = $request->validate([
            'fullname' => ['required', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255', Rule::unique('users', 'username')->ignore($user->id)],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'role' => ['nullable', 'string', Rule::in(['user', 'staff', 'manager'])],
            'password' => ['nullable', 'string', 'min:8'],
        ]);

        $user->fullname = $validated['fullname'];
        $user->name = $validated['name'];
        $user->username = $validated['username'];
        $user->email = $validated['email'];
        $user->role = $validated['role'] ?? $user->role;

        if (! empty($validated['password'])) {
            $user->password = $validated['password'];
        }

        $user->save();

        return response()->json(['user' => $this->userPayload($user->fresh())]);
    }

    public function archive(int $id)
    {
        $user = User::query()
            ->whereKey($id)
            ->where('role', '!=', 'admin')
            ->whereNull('archived_at')
            ->firstOrFail();

        $user->archived_at = now();
        $user->save();

        return response()->json(['ok' => true]);
    }

    private function userPayload(User $user): array
    {
        return [
            'id' => $user->id,
            'fullname' => $user->fullname,
            'name' => $user->name,
            'username' => $user->username,
            'email' => $user->email,
            'role' => $user->role,
        ];
    }
}
