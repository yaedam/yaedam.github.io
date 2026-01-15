import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);
    const [timeLeft, setTimeLeft] = useState(300);
    const [isActive, setIsActive] = useState(false);

    // Sync timeLeft when inputs change (only if not active)
    useEffect(() => {
        if (!isActive) {
            setTimeLeft(minutes * 60 + seconds);
        }
    }, [minutes, seconds, isActive]);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            clearInterval(interval);
            setIsActive(false);
            // Optional: Audio alert here
            alert('Time is up!');
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    // Update display inputs when timer is running
    useEffect(() => {
        if (isActive) {
            setMinutes(Math.floor(timeLeft / 60));
            setSeconds(timeLeft % 60);
        }
    }, [timeLeft, isActive]);

    const toggleTimer = () => setIsActive(!isActive);
    
    const resetTimer = () => {
        setIsActive(false);
        setMinutes(5);
        setSeconds(0);
        setTimeLeft(300);
    };

    const handleMinuteChange = (e) => {
        const val = Math.max(0, parseInt(e.target.value) || 0);
        setMinutes(val);
    };

    const handleSecondChange = (e) => {
        const val = Math.max(0, Math.min(59, parseInt(e.target.value) || 0));
        setSeconds(val);
    };

    // Cubism Styles
    const containerStyle = {
        textAlign: 'center',
        padding: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px'
    };

    const inputGroupStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '4rem',
        fontWeight: '900',
        fontFamily: 'monospace',
        marginBottom: '20px'
    };

    const inputStyle = {
        width: '120px',
        height: '100px',
        fontSize: '4rem',
        textAlign: 'center',
        border: '4px solid #000',
        boxShadow: '6px 6px 0 #000',
        outline: 'none',
        background: '#fff',
        fontWeight: '900',
        fontFamily: 'monospace'
    };

    const colonStyle = {
        fontSize: '4rem',
        fontWeight: '900',
        color: '#000',
        textShadow: '3px 3px 0 #fff'
    };

    const buttonStyle = (bg) => ({
        padding: '15px 40px',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        border: '3px solid #000',
        background: bg,
        color: '#000',
        cursor: 'pointer',
        boxShadow: '5px 5px 0 #000',
        transition: 'all 0.1s',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    });

    return (
        <div style={containerStyle}>
            <div style={inputGroupStyle}>
                <input
                    type="number"
                    value={minutes.toString().padStart(2, '0')}
                    onChange={handleMinuteChange}
                    disabled={isActive}
                    style={inputStyle}
                />
                <span style={colonStyle}>:</span>
                <input
                    type="number"
                    value={seconds.toString().padStart(2, '0')}
                    onChange={handleSecondChange}
                    disabled={isActive}
                    style={inputStyle}
                />
            </div>
            
            <div style={{ display: 'flex', gap: '20px' }}>
                <button 
                    onClick={toggleTimer} 
                    style={buttonStyle(isActive ? '#FF69B4' : '#FFD700')}
                    onMouseDown={(e) => {
                        e.currentTarget.style.transform = 'translate(2px, 2px)';
                        e.currentTarget.style.boxShadow = '3px 3px 0 #000';
                    }}
                    onMouseUp={(e) => {
                        e.currentTarget.style.transform = 'translate(0, 0)';
                        e.currentTarget.style.boxShadow = '5px 5px 0 #000';
                    }}
                >
                    {isActive ? '⏸ PAUSE' : '▶ START'}
                </button>
                
                <button 
                    onClick={resetTimer} 
                    style={buttonStyle('#fff')}
                    onMouseDown={(e) => {
                        e.currentTarget.style.transform = 'translate(2px, 2px)';
                        e.currentTarget.style.boxShadow = '3px 3px 0 #000';
                    }}
                    onMouseUp={(e) => {
                        e.currentTarget.style.transform = 'translate(0, 0)';
                        e.currentTarget.style.boxShadow = '5px 5px 0 #000';
                    }}
                >
                    ↺ RESET
                </button>
            </div>
        </div>
    );
};

export default Timer;
