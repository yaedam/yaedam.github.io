import React from 'react';
import ReactDOM from 'react-dom/client';
import StudentBoard from '../components/StudentBoard';


ReactDOM.createRoot(document.getElementById('observation-root')).render(
    <React.StrictMode>
        <div style={{ padding: '20px' }}>
            <StudentBoard />
        </div>
    </React.StrictMode>
);
