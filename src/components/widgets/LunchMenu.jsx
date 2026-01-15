import React from 'react';

const LunchMenu = () => {
    return (
        <div className="widget-lunch" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '1.2rem', color: '#555' }}>오늘의 급식</h3>
            <div style={{
                background: 'rgba(255, 255, 255, 0.4)',
                borderRadius: '15px',
                padding: '20px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
            }}>
                <span style={{ fontSize: '3rem', marginBottom: '10px' }}>🍱</span>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '1rem', color: '#444' }}>
                    <li style={{ margin: '5px 0' }}>잡곡밥</li>
                    <li style={{ margin: '5px 0' }}>제육볶음</li>
                    <li style={{ margin: '5px 0' }}>계란국</li>
                    <li style={{ margin: '5px 0' }}>배추김치</li>
                    <li style={{ margin: '5px 0', fontWeight: 'bold', color: 'var(--accent-pink)' }}>과일 샐러드</li>
                </ul>
            </div>
        </div>
    );
};

export default LunchMenu;
