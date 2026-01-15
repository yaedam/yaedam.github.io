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

    // Cubism Styles
    const containerStyle = {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto'
    };

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '1rem',
        fontWeight: 'bold',
        border: '3px solid #000',
        background: '#FFD700',
        color: '#000',
        cursor: 'pointer',
        boxShadow: '4px 4px 0 #000',
        marginBottom: '20px',
        transition: 'all 0.1s'
    };

    const cardStyle = {
        background: '#fff',
        border: '3px solid #000',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '6px 6px 0 #000',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        border: '2px solid #000',
        fontSize: '1rem',
        fontFamily: 'inherit',
        background: '#F0F8FF'
    };

    const textareaStyle = {
        ...inputStyle,
        minHeight: '100px',
        resize: 'vertical'
    };

    const deleteBtnStyle = {
        alignSelf: 'flex-end',
        padding: '5px 10px',
        background: '#FF69B4',
        border: '2px solid #000',
        color: '#000',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '2px 2px 0 #000'
    };

    return (
        <div style={containerStyle}>
            <button
                onClick={addNotice}
                style={buttonStyle}
                onMouseDown={e => {
                    e.currentTarget.style.transform = 'translate(2px, 2px)';
                    e.currentTarget.style.boxShadow = '2px 2px 0 #000';
                }}
                onMouseUp={e => {
                    e.currentTarget.style.transform = 'translate(0, 0)';
                    e.currentTarget.style.boxShadow = '4px 4px 0 #000';
                }}
            >
                + 알림 추가하기
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {notices.map(notice => (
                    <div key={notice.id} style={cardStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                            <input
                                type="text"
                                value={notice.title}
                                onChange={(e) => updateNotice(notice.id, 'title', e.target.value)}
                                style={{ ...inputStyle, fontWeight: 'bold' }}
                                placeholder="제목"
                            />
                            <input
                                type="date"
                                value={notice.date}
                                onChange={(e) => updateNotice(notice.id, 'date', e.target.value)}
                                style={{ ...inputStyle, width: '150px' }}
                            />
                        </div>
                        <textarea
                            value={notice.content}
                            onChange={(e) => updateNotice(notice.id, 'content', e.target.value)}
                            style={textareaStyle}
                            placeholder="내용을 입력하세요..."
                        />
                        <button
                            onClick={() => deleteNotice(notice.id)}
                            style={deleteBtnStyle}
                        >
                            삭제
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notice;
