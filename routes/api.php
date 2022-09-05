<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PropertiesController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\notificationController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\SectionsController;
use App\Http\Controllers\PaymentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/payment/prepareCheckout', [PaymentController::class, 'prepareCheckoutEP']);
Route::post('/payment/paymentStatus', [PaymentController::class, 'paymentStatusEP']);

Route::post('/register', [RegisteredUserController::class, 'ApiRegister']);
Route::post('/login', [AuthenticatedSessionController::class, 'ApiAuth']);
Route::post('/loginAPI', [AuthController::class, 'create']);
Route::post('/verifyLoginAPI', [AuthController::class, 'verify']);
Route::post('/logout', [AuthenticatedSessionController::class, 'ApiAuthDestroy'])->middleware('Sanctum');

Route::get('/properties', [PropertiesController::class, 'allPropertiesEP'])->middleware('Sanctum');
Route::get('/property/{id}', [PropertiesController::class, 'singlePropertyEP'])->middleware('Sanctum');
Route::get('/user/{id}', [UserController::class, 'singleUserEP'])->middleware('Sanctum');
Route::get('/users', [UserController::class, 'allUsersEP'])->middleware('Sanctum');
Route::put('/updateUser/{id}', [UserController::class, 'updateUserEP'])->middleware('Sanctum');
Route::post('/saveProperty', [PropertiesController::class, 'savePropertyEP'])->middleware('Sanctum');
Route::delete('/unsaveProperty/{proprerty_id}/{user_id}', [PropertiesController::class, 'unsavePropertyEP'])->middleware('Sanctum');
Route::post('/walletDeposit', [UserController::class, 'walletDepositEP'])->middleware('Sanctum');
Route::post('/walletWithdrawal', [UserController::class, 'walletWithdrawalEP'])->middleware('Sanctum');;
Route::get('/myInvestments/{id}', [UserController::class, 'myInvestmentsEP'])->middleware('Sanctum');
Route::get('/walletOperations/{id}', [UserController::class, 'walletOperationsEP'])->middleware('Sanctum');
Route::post('/addStake', [ContractController::class, 'add_stakeEP'])->middleware('Sanctum')->middleware('Sanctum');
Route::post('/addInvestment', [ContractController::class, 'add_investmentEP'])->middleware('Sanctum');
Route::post('/liquidizeInvestment', [ContractController::class, 'liquidize_investmentEP'])->middleware('Sanctum');
Route::delete('/deleteInvestment/{investment_id}', [ContractController::class, 'delete_investmentEP'])->middleware('Sanctum');
Route::get('/getNotifications/{id}', [notificationController::class,'get_notifications'])->middleware('Sanctum');
Route::get('/markAsRead/{id}', [notificationController::class,'markAsRead'])->middleware('Sanctum');
Route::delete('/deleteNotification/{id}', [notificationController::class,'delete_notification'])->middleware('Sanctum');
Route::put('/pinNotification/{id}', [notificationController::class,'pin_notification'])->middleware('Sanctum');
Route::put('/unpinNotification/{id}', [notificationController::class,'unpin_notification'])->middleware('Sanctum');
Route::delete('/deleteAllNotifications/{id}', [notificationController::class,'delete_all_notifications'])->middleware('Sanctum');
Route::get('/aboutUs', [SectionsController::class,'aboutUs'])->middleware('Sanctum');
Route::get('/howWeWork', [SectionsController::class,'howWeWork'])->middleware('Sanctum');

// Route::delete('/property/{id}', 'PropertiesController@delete');
// Route::delete('/properties/{id}/answers', 'PropertiesController@resetAnswers');
