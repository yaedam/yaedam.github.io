import React from 'react';
import ReactDOM from 'react-dom/client';
import WorkLog from './WorkLog';
import '../index.css';

ReactDOM.createRoot(document.getElementById('worklog-root')).render(
    <React.StrictMode>
        <WorkLog />
    </React.StrictMode>
);
