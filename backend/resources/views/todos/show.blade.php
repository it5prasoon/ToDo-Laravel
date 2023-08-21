@extends('layouts.app')

@section('content')
<h1>{{ $todo->name }}</h1>
<p>{{ $todo->content }}</p>
<a href="{{ route('todo.edit', ['id' => $todo->id]) }}">Edit</a>
<form action="{{ route('todo.destroy', ['id' => $todo->id]) }}" method="POST">
    @method('DELETE')
    @csrf
    <button type="submit">Delete</button>
</form>
<a href="{{ route('todo.index') }}">Back to Todos</a>
@endsection
