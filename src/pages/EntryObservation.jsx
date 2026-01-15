import React from 'react';
import ReactDOM from 'react-dom/client';
import StudentBoard from '../components/StudentBoard';
import '../index.css'; // Import global styles if needed (tailored for components)

ReactDOM.createRoot(document.getElementById('observation-root')).render(
    <React.StrictMode>
        <div style={{ padding: '20px' }}>
            <StudentBoard />
        </div>
    </React.StrictMode>
);
