import React from 'react';

const ClassLog = () => {
    return (
        <div className="widget-log" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#555' }}>학급 일지</h3>
            <textarea
                placeholder="오늘의 특이사항을 기록하세요..."
                style={{
                    flex: 1,
                    width: '100%',
                    background: 'rgba(255,255,255,0.4)',
                    border: 'none',
                    borderRadius: '15px',
                    padding: '15px',
                    resize: 'none',
                    outline: 'none',
                    fontFamily: 'inherit',
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    color: '#444'
                }}
            />
        </div>
    );
};

export default ClassLog;
