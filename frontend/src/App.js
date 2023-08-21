import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, useParams} from 'react-router-dom';
import CreateTodoForm from './components/CreateTodoForm';
import TodoDetail from "./components/TodoDetail";

// function TodoDetail() {
//     const { id } = useParams();
//     const [selectedTodo, setSelectedTodo] = useState(null);
//
//     useEffect(() => {
//         fetch(`http://localhost/api/todo/get/${id}`)
//             .then(response => response.json())
//             .then(data => setSelectedTodo(data))
//             .catch(error => console.error('Error fetching todo details:', error));
//     }, [id]);
//
//     return (
//         <div>
//             {selectedTodo && (
//                 <div>
//                     <h2>Selected Todo</h2>
//                     <p>ID: {selectedTodo.id}</p>
//                     <p>Name: {selectedTodo.name}</p>
//                     <p>Content: {selectedTodo.content}</p>
//                 </div>
//             )}
//         </div>
//     );
// }

function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await fetch('http://localhost/api/todo/gets');
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleCreateTodo = () => {
        fetchTodos();
    };

    const handleTodoUpdate = () => {
        fetchTodos();
    };

    return (
        <Router>
            <div>
                <h1>Todo List</h1>
                <ul>
                    {todos.map(todo => (
                        <li key={todo.id}>
                            <Link to={`/todo/${todo.id}`}>{todo.name}</Link>
                        </li>
                    ))}
                </ul>
                <Routes>
                    <Route path="/todo/:id" element={<TodoDetail onTodoUpdate={handleTodoUpdate}/>} />
                </Routes>
                <CreateTodoForm onCreate={handleCreateTodo} />
            </div>
        </Router>
    );
}

export default App;
