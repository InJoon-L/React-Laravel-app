<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Validator;

class FavoriteController extends Controller
{

    public function favoriteNumber(Request $req) {
        $validator = Validator::make($req->all(), [
            'movieId' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->toJson(),
            ], 200);
        }

        $number = Favorite::where('movieId', $req->movieId)->get();

        return response()->json([
            'success' => true,
            'favoriteNumber' => $number->count()
        ], 200);
    }

    public function favorited(Request $req) {
        $validator = Validator::make($req->all(), [
            'movieId' => 'required',
            'userFrom' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->toJson(),
            ], 200);
        }

        $favorited = DB::table('favorites')
                    ->where('movieId', '=', $req->movieId)
                    ->where('user_id', '=', $req->userFrom)
                    ->get();

        $result = false;

        if($favorited->count() != 0) {
            $result = true;
        }

        return response()->json([
            'success' => true,
            'favorited' => $result
        ], 200);
    }

    public function removeFromFavorite(Request $req) {
        $validator = Validator::make($req->all(), [
            'movieId' => 'required',
            'userFrom' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->toJson(),
            ], 200);
        }

        $favorited = DB::table('favorites')
                    ->where('movieId', '=', $req->movieId)
                    ->where('user_id', '=', $req->userFrom)
                    ->first();

        Favorite::find($favorited->id)->delete();

        return response()->json([
            'success' => true,
        ], 200);
    }

    public function addToFavorite(Request $req) {
        $validator = Validator::make($req->all(), [
            'movieId' => 'required',
            'userFrom' => 'required',
            'movieTitle' => 'required',
            'moviePost' => 'required',
            'movieRunTime' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->toJson(),
            ], 200);
        }

        $favorite = new Favorite();
        $favorite->user_id = $req->userFrom;
        $favorite->movieId = $req->movieId;
        $favorite->movieTitle = $req->movieTitle;
        $favorite->moviePost = $req->moviePost;
        $favorite->movieRunTime = $req->movieRunTime;

        $favorite->save();
        return response()->json([
            'success' => true,
        ]);
    }

    public function getFavoredMovie(Request $req) {
        $validator = Validator::make($req->all(), [
            'userFrom' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->toJson(),
            ], 200);
        }

        $movies = Favorite::where('user_id', $req->userFrom)->get();

        return response()->json([
            'success' => true,
            'favorites' => $movies
        ], 200);
    }
}
