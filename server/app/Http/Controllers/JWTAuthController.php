<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JWTAuthController extends Controller
{
    public function user() {
        return response()->json(auth('api')->user());
    }

    public function auth(Request $req) {
        $user = User::find($req->id);
        return response()->json([
            '_id' => $user->id,
            'isAdmin' => $user->role == 0 ? false : true,
            'isAuth' => true,
            'email' => $user->email,
            'name' => $user->name,
            'role' => $user->role,
            'image' => $user->image
        ]);
    }

    public function register(Request $req) {
        $validator = Validator::make($req->all(), [
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|string|min:8|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->toJson()
            ], 200);
        }

        $user = new User();
        $user->fill($req->all());
        $user->password = bcrypt($req->password);
        $user->save();

        return response()->json([
            'success' => true,
        ], 200);
    }

    public function login(Request $req) {
        $validator = Validator::make($req->all(), [
            'email' => 'required|email|max:255',
            'password' => 'required|string|min:8|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->toJson(),
            ], 200);
        }

        $credentials = $req->all();
        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unuthorized'], 401);
        }

        return $this->respondWithToken($token, $req->email);
    }

    protected function respondWithToken($token, $email) {
        $user_id = User::where('email', $email)->first()->id;
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 360,
            'loginSuccess' => true,
            'userId' => $user_id,
        ], 200);
    }

    public function refresh() {
        return $this->respondWithToken(auth('api')->refresh());
    }

    public function logout() {
        auth('api')->logout();

        return response()->json([
            'success' => true,
            'message' => 'logout'
        ], 200);
    }
}
