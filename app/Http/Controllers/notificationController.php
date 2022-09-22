<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Pagination\Paginator;

class notificationController extends Controller
{
    function get_notifications(Request $request,$id){
        $user = User::find($id);
        return $user->notifications()->paginate($request->current_page,['*'],'page'); 
    }
    function markAsRead($id){
        $user = User::find($id);
        $user->unreadNotifications->markAsRead();
        return $user->notifications;
    }
    function markAllAsRead($id){
        $user = User::find($id);
        $user->unreadNotifications->markAsRead();
        return true;
    }
    function delete_notification($id){
        $notification=DatabaseNotification::find($id);
        // return $notification;
        if ($notification != null) {
        $notification->delete();
        return 1;}
    }
    function pin_notification($id){
        $notification=DatabaseNotification::find($id);
        $notification->pinned=1;
        $notification->save();
        return 1;
    }
    function unpin_notification($id){
        $notification=DatabaseNotification::find($id);
        $notification->pinned=0;
        $notification->save();
        return 1;
    }
    function delete_all_notifications($id){
        $user = User::find($id);
        $user->notifications()->delete();
        return $user->notifications;
    }
}
