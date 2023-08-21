@extends('layouts.app')

@section('content')
<h1>Todos</h1>
<ul>
    @foreach($todos as $todo)
    <li>
        <a href="{{ route('todo.show', ['id' => $todo->id]) }}">{{ $todo->name }}</a>
    </li>
    @endforeach
</ul>
<a href="{{ route('todo.create') }}">Create New Todo</a>
@endsection
