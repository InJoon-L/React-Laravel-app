<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function saveComment(Request $req) {
        $validator = Validator::make($req->all(), [
            'content' => 'required',
            'writer' => 'required',
            'movieId' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->toJson(),
            ], 200);
        }

        $comment = new Comment();

        $comment->user_id = $req->writer;
        $comment->movieId = $req->movieId;
        $comment->content = $req->content;

        $comment->save();
        $comment->user;

        return response()->json([
            'success' => true,
            'result' => $comment
        ], 200);
    }

    public function getComments($movieId) {
        $comments = Comment::where('movieId', $movieId)->get();

        foreach($comments as $row) {
            $row->user;
        }

        return response()->json([
            'success' => true,
            'comments' => $comments
        ]);
    }

    public function updateComment(Request $req) {
        $validator = Validator::make($req->all(), [
            'content' => 'required',
            'commentId' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->toJson(),
            ], 200);
        }

        $comment = Comment::find($req->commentId);
        $comment->content = $req->content;

        $comment->save();
        $comment->user;

        return response()->json([
            'success' => true,
            'result' => $comment
        ]);
    }
}
