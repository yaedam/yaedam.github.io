import React from 'react';

const Timetable = () => {
    const days = ['월', '화', '수', '목', '금'];
    const periods = [1, 2, 3, 4, 5, 6];

    // Dummy Data
    const schedule = {
        '월': ['수학', '영어', '과학', '역사', '미술', '체육'],
        '화': ['국어', '수학', '영어', '음악', '과학', '동아리'],
        '수': ['과학', '역사', '국어', '수학', '영어', '자율'],
        '목': ['미술', '체육', '수학', '영어', '과학', '독서'],
        '금': ['음악', '국어', '역사', '수학', '영어', '청소']
    };

    return (
        <div className="widget-timetable" style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#555' }}>시간표</h3>
            <div style={{ flex: 1, overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '8px', borderBottom: '2px solid rgba(255,255,255,0.5)', textAlign: 'left', color: '#777' }}>교시</th>
                            {days.map(day => <th key={day} style={{ padding: '8px', borderBottom: '2px solid rgba(255,255,255,0.5)', color: '#555' }}>{day}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {periods.map((period, idx) => (
                            <tr key={period} style={{ background: idx % 2 === 0 ? 'rgba(255,255,255,0.1)' : 'transparent' }}>
                                <td style={{ padding: '8px', fontWeight: 'bold', color: '#888' }}>{period}</td>
                                {days.map(day => (
                                    <td key={`${day}-${period}`} style={{ padding: '8px', textAlign: 'center', color: '#444' }}>
                                        {schedule[day][idx]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Timetable;
