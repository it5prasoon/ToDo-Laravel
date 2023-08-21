import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TodoDetail({ onTodoUpdate }) {
    const { id } = useParams();
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedContent, setUpdatedContent] = useState('');

    useEffect(() => {
        fetch(`http://localhost/api/todo/get/${id}`)
            .then(response => response.json())
            .then(data => {
                setSelectedTodo(data);
                setUpdatedName(data.name);
                setUpdatedContent(data.content);
            })
            .catch(error => console.error('Error fetching todo details:', error));
    }, [id]);

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost/api/todo/update/${id}?name=${encodeURIComponent(updatedName)}&content=${encodeURIComponent(updatedContent)}`, {
                method: 'PUT',
            });

            if (response.ok) {
                console.log('Todo updated successfully!');
                onTodoUpdate();
            } else {
                console.error('Error updating todo:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost/api/todo/delete/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Todo deleted successfully!');
                onTodoUpdate();
            } else {
                console.error('Error deleting todo:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div>
            {selectedTodo && (
                <div>
                    <h2>Selected Todo</h2>
                    <p>ID: {selectedTodo.id}</p>
                    <div>
                        <label>
                            Updated Name:
                            <input
                                type="text"
                                value={updatedName}
                                onChange={e => setUpdatedName(e.target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Updated Content:
                            <textarea
                                value={updatedContent}
                                onChange={e => setUpdatedContent(e.target.value)}
                            />
                        </label>
                    </div>
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
}

export default TodoDetail;
