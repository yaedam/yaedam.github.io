import React, { useState, useEffect } from 'react';

const Notice = () => {
    const [notices, setNotices] = useState(() => {
        const saved = localStorage.getItem('class-notices');
        return saved ? JSON.parse(saved) : [
            { id: 1, title: '내일 준비물', content: '색종이, 가위, 풀', date: '2026-01-16' }
        ];
    });

    useEffect(() => {
        localStorage.setItem('class-notices', JSON.stringify(notices));
    }, [notices]);

    const addNotice = () => {
        const newNotice = {
            id: Date.now(),
            title: '새로운 알림',
            content: '',
            date: new Date().toISOString().split('T')[0]
        };
        setNotices([newNotice, ...notices]);
    };

    const deleteNotice = (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            setNotices(notices.filter(n => n.id !== id));
        }
    };

    const updateNotice = (id, field, value) => {
        setNotices(notices.map(n =>
            n.id === id ? { ...n, [field]: value } : n
        ));
    };

    // Glassmorphism Styles
    const containerStyle = {
        padding: '20px',
        maxWidth: '1000px',
        margin: '0 auto'
    };

    const buttonStyle = {
        padding: '15px 25px',
        fontSize: '1rem',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
        color: '#fff',
        cursor: 'pointer',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
        marginBottom: '30px',
        transition: 'all 0.3s',
        display: 'block',
        width: '100%',
        textAlign: 'center'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '25px'
    };

    const cardStyle = {
        background: 'rgba(224, 247, 250, 0.6)', // Sky Blue Tint
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255,255,255,0.6)',
        borderRadius: '20px',
        padding: '25px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        position: 'relative',
        minHeight: '250px',
        transition: 'transform 0.3s ease'
    };

    const tapeStyle = {
        position: 'absolute',
        top: '-12px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80px',
        height: '25px',
        background: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(2px)',
        borderRadius: '2px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        zIndex: 1
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1.2rem',
        fontFamily: 'inherit',
        background: 'rgba(255,255,255,0.4)',
        color: '#444',
        marginBottom: '5px'
    };

    const textareaStyle = {
        ...inputStyle,
        flex: 1,
        resize: 'none',
        fontSize: '1rem',
        lineHeight: '1.6',
        background: 'rgba(255,255,255,0.4)',
        minHeight: '150px'
    };

    const deleteBtnStyle = {
        alignSelf: 'flex-end',
        padding: '8px 16px',
        background: 'rgba(255, 182, 193, 0.5)',
        borderRadius: '20px',
        border: 'none',
        color: '#d63384',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(214, 51, 132, 0.15)',
        marginTop: '10px',
        transition: 'background 0.2s'
    };

    const emptyStateStyle = {
        textAlign: 'center',
        padding: '60px',
        border: '2px dashed #ccc',
        borderRadius: '30px',
        color: '#888',
        background: 'rgba(255,255,255,0.2)'
    };

    return (
        <div style={containerStyle}>
            <button
                onClick={addNotice}
                style={buttonStyle}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                }}
            >
                + 새로운 알림장 붙이기
            </button>

            {notices.length === 0 ? (
                <div style={emptyStateStyle}>
                    <h2>📭 알림장이 비어있어요!</h2>
                    <p>위의 버튼을 눌러 새로운 알림을 추가해보세요.</p>
                </div>
            ) : (
                <div style={gridStyle}>
                    {notices.map(notice => (
                        <div key={notice.id} style={cardStyle}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <div style={tapeStyle}></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    value={notice.title}
                                    onChange={(e) => updateNotice(notice.id, 'title', e.target.value)}
                                    style={{ ...inputStyle, fontWeight: 'bold' }}
                                    placeholder="제목"
                                />
                            </div>
                            <div style={{ textAlign: 'right', marginBottom: '5px' }}>
                                <input
                                    type="date"
                                    value={notice.date}
                                    onChange={(e) => updateNotice(notice.id, 'date', e.target.value)}
                                    style={{
                                        border: 'none', background: 'transparent', textAlign: 'right',
                                        fontFamily: 'inherit', color: '#666', fontSize: '0.9rem'
                                    }}
                                />
                            </div>
                            <textarea
                                value={notice.content}
                                onChange={(e) => updateNotice(notice.id, 'content', e.target.value)}
                                style={textareaStyle}
                                placeholder="내용을 자유롭게 작성하세요..."
                            />
                            <button
                                onClick={() => deleteNotice(notice.id)}
                                style={deleteBtnStyle}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 182, 193, 0.8)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 182, 193, 0.5)'}
                            >
                                🗑️ 떼어내기
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notice;
