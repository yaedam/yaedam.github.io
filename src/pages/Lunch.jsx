import React, { useState, useEffect } from 'react';

const Lunch = () => {
    const days = ['월', '화', '수', '목', '금'];
    const [menu, setMenu] = useState(() => {
        const saved = localStorage.getItem('class-lunch');
        return saved ? JSON.parse(saved) : {
            '월': '잡곡밥, 김치찌개, 계란말이, 김구이, 우유',
            '화': '카레라이스, 깍두기, 닭다리튀김, 과일샐러드, 요구르트',
            '수': '짜장면, 단무지, 탕수육, 만두, 주스',
            '목': '비빔밥, 콩나물국, 오징어볶음, 백김치, 우유',
            '금': '쌀밥, 미역국, 불고기, 잡채, 귤'
        };
    });

    useEffect(() => {
        localStorage.setItem('class-lunch', JSON.stringify(menu));
    }, [menu]);

    const handleMenuChange = (day, text) => {
        setMenu({ ...menu, [day]: text });
    };

    // Glassmorphism Styles
    const containerStyle = {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
    };

    const cardStyle = {
        background: 'rgba(224, 247, 250, 0.6)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        borderRadius: '24px',
        padding: '25px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        transition: 'transform 0.3s ease'
    };

    const dayStyle = {
        fontSize: '1.4rem',
        fontWeight: '800',
        background: 'linear-gradient(to right, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '5px'
    };

    const textareaStyle = {
        width: '100%',
        minHeight: '100px',
        padding: '15px',
        border: 'none',
        borderRadius: '16px',
        fontSize: '1rem',
        fontFamily: 'inherit',
        background: 'rgba(255, 255, 255, 0.5)',
        boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.02)',
        resize: 'vertical',
        lineHeight: '1.6',
        color: '#444',
        outline: 'none'
    };

    return (
        <div style={containerStyle}>
            {days.map(day => (
                <div key={day} style={cardStyle}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div style={dayStyle}>{day}요일</div>
                    <textarea
                        value={menu[day]}
                        onChange={(e) => handleMenuChange(day, e.target.value)}
                        style={textareaStyle}
                        placeholder="이날의 맛있는 급식 메뉴는?"
                    />
                </div>
            ))}
        </div>
    );
};

export default Lunch;
