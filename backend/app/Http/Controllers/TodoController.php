<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    protected Todo $todo;

    public function __construct(Todo $todo)
    {
        $this->todo = $todo;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        $todo = $this->todo->createTodo($request->all());
        return response()->json($todo);
    }

    /**
     * @param $id
     * @param Request $request
     * @return JsonResponse
     */
    public function update($id, Request $request): JsonResponse
    {
        try {
            $todo = $this->todo->updateTodo($id, $request->all());
            return response()->json($todo);
        } catch (ModelNotFoundException $exception) {
            return response()->json(["msg" => $exception->getMessage()], 404);
        }
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function get($id): JsonResponse
    {
        $todo = $this->todo->getTodo($id);
        if ($todo) {
            return response()->json($todo);
        }
        return response()->json(["msg" => "Todo Item Not Found!"], 404);
    }

    /**
     * @return JsonResponse
     */
    public function gets(): JsonResponse
    {
        $todos = $this->todo->getsTodo();
        return response()->json($todos);
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function delete($id): JsonResponse
    {
        try {
            $todo = $this->todo->deleteTodo($id);
            return response()->json(["msg" => "Delete Todo Success!"]);
        } catch (ModelNotFoundException $exception) {
            return response()->json(["msg" => $exception->getMessage()], 404);
        }
    }
}
