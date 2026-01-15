import React from 'react';

const Events = () => {
    const events = [
        { date: '1월 15일', title: '겨울 캠프' },
        { date: '1월 20일', title: '체육대회' },
        { date: '1월 25일', title: '학부모 총회' },
    ];

    return (
        <div className="widget-events" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '1.2rem', color: '#555' }}>이달의 행사</h3>
            <div style={{ flex: 1, overflowY: 'auto' }}>
                {events.map((evt, i) => (
                    <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                        background: 'rgba(255,255,255,0.5)',
                        padding: '10px',
                        borderRadius: '12px'
                    }}>
                        <div style={{
                            background: 'var(--accent-purple)',
                            color: '#fff',
                            padding: '5px 10px',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            marginRight: '10px'
                        }}>
                            {evt.date}
                        </div>
                        <div style={{ fontWeight: '600', color: '#555' }}>{evt.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;
