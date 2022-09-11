<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::get('/register/{locale?}', [RegisteredUserController::class, 'create'])
                ->setDefaults(['locale' => 'ar'])->middleware('guest')
                ->middleware('referral')->name('register');

Route::post('/register', [RegisteredUserController::class, 'store'])
                ->middleware('guest')->name('register1');

// Route::post('/login', [AuthenticatedSessionController::class, 'createLogin'])
//                 ->middleware('guest')->name('login');

Route::get('/login/{locale?}', [AuthenticatedSessionController::class, 'loginbyPhoneNumber'])
->setDefaults(['locale' => 'ar'])->middleware('guest')
                ->name('phoneNumberLogin');
Route::post('/LoginOTP/{locale?}', [AuthenticatedSessionController::class, 'createLoginOTP'])
->setDefaults(['locale' => 'ar'])->middleware('guest')->name('LoginOTP');


Route::post('/VerifyOTP/{locale?}', [AuthenticatedSessionController::class, 'VerifyOTP'])->name('VerifyOTP');

// Route::get('/Login/{locale?}', [AuthenticatedSessionController::class, 'Verifypage'])
// ->setDefaults(['locale' => 'ar'])->middleware('guest')->name('Verifypage');

// Route::post('/VerifyOTP/{locale?}', [AuthenticatedSessionController::class, 'store'])
//                 ->middleware('guest')->name('logintest');

Route::get('/forgot-password/{locale?}', [PasswordResetLinkController::class, 'create'])
->setDefaults(['locale' => 'ar'])->middleware('guest')
                ->name('password.request');

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
                ->middleware('guest')
                ->name('password.email');

Route::get('/reset-password/{token}/{locale?}', [NewPasswordController::class, 'create'])
->setDefaults(['locale' => 'ar'])->middleware('guest')
                ->name('password.reset');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
                ->middleware('guest')
                ->name('password.update');

Route::get('/verify-email/{locale?}', [EmailVerificationPromptController::class, '__invoke'])
->setDefaults(['locale' => 'ar'])->middleware('auth')
                ->name('verification.notice');

Route::get('/verify-email/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
                ->middleware(['auth', 'signed', 'throttle:6,1'])
                ->name('verification.verify');

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                ->middleware(['auth', 'throttle:6,1'])
                ->name('verification.send');

Route::get('/confirm-password/{locale?}', [ConfirmablePasswordController::class, 'show'])
->setDefaults(['locale' => 'ar'])->middleware('auth')
                ->name('password.confirm');

Route::post('/confirm-password', [ConfirmablePasswordController::class, 'store'])
                ->middleware('auth');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
                ->middleware('auth')
                ->name('logout');
