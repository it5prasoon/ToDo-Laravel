import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <Link to="/create">Create Todo</Link>
        </nav>
    );
}

export default Navigation;
