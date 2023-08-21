import React, { useState } from 'react';

function CreateTodoForm({ onCreate }) {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost/api/todo/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, content }),
            });

            if (response.ok) {
                console.log('Todo created successfully!');
                onCreate(); // Call the callback to refresh the todo list
                setName('');
                setContent('');
            } else {
                console.error('Error creating todo:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    return (
        <div>
            <h2>Create Todo</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Content:
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateTodoForm;
