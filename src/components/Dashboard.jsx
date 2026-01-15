import React from 'react';
import Timetable from './widgets/Timetable';
import LunchMenu from './widgets/LunchMenu';
import Events from './widgets/Events';
import Todo from './widgets/Todo';
import ClassLog from './widgets/ClassLog';

const Dashboard = () => {
    return (
        <div className="dashboard-container" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            height: '100%',
            overflowY: 'auto', // Ensure scrolling if content overflows
            paddingRight: '5px' // Space for scrollbar
        }}>
            {/* Top Row: Timetable */}
            <div className="glass-panel" style={{ flex: '0 0 auto', padding: '15px' }}>
                <Timetable />
            </div>

            {/* Middle Row: Lunch & Events */}
            <div style={{ display: 'flex', gap: '20px', flex: '1' }}>
                <div className="glass-panel" style={{ flex: 1, padding: '15px' }}>
                    <LunchMenu />
                </div>
                <div className="glass-panel" style={{ flex: 1, padding: '15px' }}>
                    <Events />
                </div>
            </div>

            {/* Bottom Row: Todo & Log */}
            <div style={{ display: 'flex', gap: '20px', flex: '1.5' }}>
                <div className="glass-panel" style={{ flex: 1, padding: '15px' }}>
                    <Todo />
                </div>
                <div className="glass-panel" style={{ flex: 1, padding: '15px' }}>
                    <ClassLog />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
