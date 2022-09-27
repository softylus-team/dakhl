<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Pagination\Paginator;

class notificationController extends Controller
{
    function get_notifications(Request $request,$id){
        try{
        $user = User::find($id);
        return $user->notifications()->paginate($request->current_page,['*'],'page'); 
        }catch(Exception $ex ){
            return $ex->getMessage();
        }
    }
    function markAsRead($id){
        try{
        $user = User::find($id);
        $user->unreadNotifications->markAsRead();
        return $user->notifications;
        }catch(Exception $ex ){
            return $ex->getMessage();
        }
    }
    function markAllAsRead($id){
        try{
        $user = User::find($id);
        $user->unreadNotifications->markAsRead();
        return true;
        }catch(Exception $ex ){
            return $ex->getMessage();
        }
    }
    function delete_notification($id){
        try{
        $notification=DatabaseNotification::find($id);
        // return $notification;
        if ($notification != null) {
        $notification->delete();
        return 1;}
        }catch(Exception $ex ){
            return $ex->getMessage();
        }
    }
    function pin_notification($id){
        try{
        $notification=DatabaseNotification::find($id);
        $notification->pinned=1;
        $notification->save();
        return 1;
        }catch(Exception $ex ){
            return $ex->getMessage();
        }
    }
    function unpin_notification($id){
        try{
        $notification=DatabaseNotification::find($id);
        $notification->pinned=0;
        $notification->save();
        return 1;
        }catch(Exception $ex ){
            return $ex->getMessage();
        }
    }
    function delete_all_notifications($id){
        try{
        $user = User::find($id);
        $user->notifications()->delete();
        return $user->notifications;
        }catch(Exception $ex ){
            return $ex->getMessage();
        }
    }
}
