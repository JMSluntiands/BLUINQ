<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\AccountSettingsController;
use App\Http\Controllers\Auth\CurrentUserController;
use App\Http\Controllers\Auth\UserManagementController;
use Illuminate\Support\Facades\Route;

Route::view('/', 'welcome');
Route::view('/dashboard', 'welcome');
Route::view('/account-settings', 'welcome');
Route::view('/users/add', 'welcome');
Route::view('/users/list', 'welcome');
Route::redirect('/canvas', '/dashboard');

Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth');
Route::get('/me', [CurrentUserController::class, 'show']);
Route::put('/account/settings', [AccountSettingsController::class, 'update'])->middleware('auth');
Route::get('/users', [UserManagementController::class, 'index'])->middleware('auth');
Route::post('/users', [UserManagementController::class, 'store'])->middleware('auth');
Route::put('/users/{id}', [UserManagementController::class, 'update'])->middleware('auth');
Route::delete('/users/{id}/archive', [UserManagementController::class, 'archive'])->middleware('auth');
