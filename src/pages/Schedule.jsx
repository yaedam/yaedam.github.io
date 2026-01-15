import React, { useState, useEffect } from 'react';

const Schedule = () => {
    const days = ['월', '화', '수', '목', '금'];
    const periods = [1, 2, 3, 4, 5, 6];

    // Initial state structure: { "월-1": "국어", "월-2": "수학", ... }
    const [schedule, setSchedule] = useState(() => {
        const saved = localStorage.getItem('class-schedule');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('class-schedule', JSON.stringify(schedule));
    }, [schedule]);

    const handleChange = (day, period, value) => {
        setSchedule({ ...schedule, [`${day}-${period}`]: value });
    };

    // Glassmorphism Styles
    const containerStyle = {
        padding: '20px',
        maxWidth: '1000px',
        margin: '0 auto',
        overflowX: 'auto',
        borderRadius: '24px',
        background: 'rgba(224, 247, 250, 0.3)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)'
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: '0',
        border: 'none',
        borderRadius: '20px',
        overflow: 'hidden'
    };

    const thStyle = {
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(5px)',
        fontSize: '1.2rem',
        fontWeight: '700',
        textAlign: 'center',
        color: '#555',
        borderBottom: '1px solid rgba(255,255,255,0.5)'
    };

    const tdStyle = {
        padding: '12px',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.3)',
        borderBottom: '1px solid rgba(255,255,255,0.3)',
        borderRight: '1px solid rgba(255,255,255,0.3)'
    };

    const inputStyle = {
        width: '100%',
        padding: '8px',
        border: 'none',
        borderRadius: '8px',
        textAlign: 'center',
        fontSize: '1rem',
        fontWeight: '500',
        background: 'rgba(255,255,255,0.5)',
        color: '#333',
        fontFamily: 'inherit',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)'
    };

    return (
        <div style={containerStyle}>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={{ ...thStyle, width: '80px', color: '#888' }}>교시</th>
                        {days.map(day => (
                            <th key={day} style={thStyle}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {periods.map(period => (
                        <tr key={period}>
                            <td style={{ ...tdStyle, background: 'rgba(255, 182, 193, 0.3)', color: '#d63384', fontWeight: 'bold' }}>{period}</td>
                            {days.map(day => {
                                // Wednesday has only 5 periods
                                if (day === '수' && period === 6) {
                                    return <td key={`${day}-${period}`} style={{ ...tdStyle, background: 'rgba(0,0,0,0.05)' }}></td>;
                                }
                                return (
                                    <td key={`${day}-${period}`} style={tdStyle}>
                                        <input
                                            type="text"
                                            value={schedule[`${day}-${period}`] || ''}
                                            onChange={(e) => handleChange(day, period, e.target.value)}
                                            style={inputStyle}
                                            placeholder="-"
                                        />
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Schedule;
