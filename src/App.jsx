import { useState } from 'react';
import './index.css';
import Background from './components/Background';
import StudentBoard from './components/StudentBoard';
import Dashboard from './components/Dashboard'; // Placeholder import

function App() {
  return (
    <>
      <Background />
      <div className="app-container" style={{ width: '100%', height: '100%', display: 'flex', padding: '30px', gap: '30px', position: 'relative', zIndex: 1 }}>
        {/* Left Panel */}
        <div className="left-panel" style={{ flex: '2', background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', borderRadius: '30px', boxShadow: 'var(--glass-shadow)', padding: '30px', overflow: 'hidden' }}>
          <StudentBoard />
        </div>

        {/* Right Panel */}
        <div className="right-panel" style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Dashboard placeholder - will replace with component later */}
          <Dashboard />
        </div>
      </div>
    </>
  );
}

export default App;
