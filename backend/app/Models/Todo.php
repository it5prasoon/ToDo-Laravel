<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class Todo extends Model
{
    use HasFactory;

    protected $table="todo";

    /**
     * @param array $attributes
     * @return Todo
     */
    public function createTodo(array $attributes): Todo
    {
        $todo = new self();
        $todo->name = $attributes["name"];
        $todo->content = $attributes["content"];
        $todo->save();
        return $todo;
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function getTodo(int $id): mixed
    {
        $todo = $this->where("id",$id)->first();
        return $todo;
    }

    /**
     * @return Todo[]|Collection
     */
    public function getsTodo(): Collection|array
    {
        return $this::all();
    }

    /**
     * @param int $id
     * @param array $attributes
     * @return mixed
     */
    public function updateTodo(int $id, array $attributes): mixed
    {
        $todo = $this->getTodo($id);
        if($todo == null){
            throw new ModelNotFoundException("Can't Find Todo!");
        }
        $todo->name = $attributes["name"];
        $todo->content = $attributes["content"];
        $todo->save();
        return $todo;
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function deleteTodo(int $id): mixed
    {
        $todo = $this->getTodo($id);
        if($todo == null){
            throw new ModelNotFoundException("Todo Item Not Found!");
        }
        return $todo->delete();
    }
}
