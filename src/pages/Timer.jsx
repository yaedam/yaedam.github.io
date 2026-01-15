import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);
    const [milliseconds, setMilliseconds] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30000); // 30000 units, where each unit is 10ms. So 30000 * 10ms = 300000ms = 5min
    const [isActive, setIsActive] = useState(false);
    const [isTimeUp, setIsTimeUp] = useState(false);

    // Sync timeLeft when inputs change (only if not active)
    useEffect(() => {
        if (!isActive && !isTimeUp) {
            setTimeLeft((minutes * 60 + seconds) * 100); // Convert to 10ms units
            setMilliseconds(0);
        }
    }, [minutes, seconds, isActive, isTimeUp]);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 10); // 10ms interval
        } else if (timeLeft <= 0 && isActive) { // Changed condition to <= 0
            clearInterval(interval);
            setIsActive(false);
            setIsTimeUp(true);
            // Optional: Audio alert here
            // alert('Time is up!'); // Removing alert for a better UX (visual only first)
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    // Update display inputs when timer is running
    useEffect(() => {
        if (isActive) {
            const totalSeconds = Math.floor(timeLeft / 100); // Convert 10ms units back to seconds
            setMinutes(Math.floor(totalSeconds / 60));
            setSeconds(totalSeconds % 60);
            setMilliseconds(timeLeft % 100); // Remaining 10ms units
        }
    }, [timeLeft, isActive]);

    const toggleTimer = () => {
        if (isTimeUp) {
            resetTimer();
        } else {
            setIsActive(!isActive);
        }
    };

    const resetTimer = () => {
        setIsActive(false);
        setIsTimeUp(false);
        setMinutes(5);
        setSeconds(0);
        setMilliseconds(0);
        setTimeLeft(30000); // 5 minutes in 10ms units
    };

    const setTime = (min, sec = 0) => {
        setIsActive(false);
        setIsTimeUp(false);
        setMinutes(min);
        setSeconds(sec);
        setMilliseconds(0);
        setTimeLeft((min * 60 + sec) * 100); // Convert to 10ms units
    };

    const handleMinuteChange = (e) => {
        const val = Math.max(0, parseInt(e.target.value) || 0);
        setMinutes(val);
        setIsTimeUp(false);
    };

    const handleSecondChange = (e) => {
        const val = Math.max(0, Math.min(59, parseInt(e.target.value) || 0));
        setSeconds(val);
        setIsTimeUp(false);
    };

    // Glassmorphism Styles
    const containerStyle = {
        textAlign: 'center',
        padding: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px',
        background: isTimeUp ? 'rgba(255, 182, 193, 0.6)' : 'rgba(224, 247, 250, 0.4)',
        borderRadius: '30px',
        border: '1px solid rgba(255,255,255,0.5)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
        backdropFilter: 'blur(8px)',
        transition: 'all 0.4s ease'
    };

    const inputGroupStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '20px'
    };

    const inputStyle = {
        width: '140px',
        height: '110px',
        fontSize: '4.5rem',
        textAlign: 'center',
        border: 'none',
        borderRadius: '20px',
        boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.05)',
        outline: 'none',
        background: 'rgba(255, 255, 255, 0.7)',
        fontWeight: '300',
        fontFamily: 'monospace',
        color: isTimeUp ? '#ff4757' : '#444'
    };

    const msStyle = {
        width: '90px',
        height: '70px',
        fontSize: '2.5rem',
        textAlign: 'center',
        border: 'none',
        borderRadius: '16px',
        boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.05)',
        background: 'rgba(255, 255, 255, 0.5)',
        fontWeight: '400',
        fontFamily: 'monospace',
        color: '#666',
        alignSelf: 'flex-end',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const colonStyle = {
        fontSize: '4rem',
        fontWeight: '300',
        color: '#fff',
        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
    };

    const buttonStyle = (bg) => ({
        padding: '16px 45px',
        fontSize: '1.4rem',
        fontWeight: '600',
        border: 'none',
        borderRadius: '50px',
        background: bg,
        color: '#fff',
        cursor: 'pointer',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    });

    const presetBtnStyle = {
        padding: '10px 18px',
        fontSize: '1rem',
        fontWeight: '600',
        border: '1px solid rgba(255,255,255,0.6)',
        borderRadius: '15px',
        background: 'rgba(255, 255, 255, 0.4)',
        color: '#555',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        transition: 'all 0.2s'
    };

    return (
        <div style={containerStyle}>
            {isTimeUp && <h2 style={{ color: '#ff4757', fontSize: '2.5rem', margin: '0 0 20px 0', textShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>⏰ TIME IS UP! ⏰</h2>}

            <div style={inputGroupStyle}>
                <input
                    type="number"
                    value={minutes.toString().padStart(2, '0')}
                    onChange={handleMinuteChange}
                    disabled={isActive || isTimeUp}
                    style={inputStyle}
                />
                <span style={colonStyle}>:</span>
                <input
                    type="number"
                    value={seconds.toString().padStart(2, '0')}
                    onChange={handleSecondChange}
                    disabled={isActive || isTimeUp}
                    style={inputStyle}
                />
                <span style={{ ...colonStyle, fontSize: '2.5rem', alignSelf: 'flex-end', marginBottom: '15px', marginLeft: '5px' }}>.</span>
                <div style={msStyle}>
                    {milliseconds.toString().padStart(2, '0')}
                </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '600px' }}>
                <button onClick={() => setTime(0, 10)} style={presetBtnStyle}>10초</button>
                <button onClick={() => setTime(0, 30)} style={presetBtnStyle}>30초</button>
                <button onClick={() => setTime(1)} style={presetBtnStyle}>1분</button>
                <button onClick={() => setTime(3)} style={presetBtnStyle}>3분</button>
                <button onClick={() => setTime(5)} style={presetBtnStyle}>5분</button>
                <button onClick={() => setTime(10)} style={presetBtnStyle}>10분</button>
            </div>

            <div style={{ display: 'flex', gap: '25px', marginTop: '30px' }}>
                <button
                    onClick={toggleTimer}
                    style={buttonStyle(isActive ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' : 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)')}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                    }}
                >
                    {isTimeUp ? '🔁 RESTART' : (isActive ? '⏸ PAUSE' : '▶ START')}
                </button>

                <button
                    onClick={resetTimer}
                    style={buttonStyle('linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)')}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                    }}
                >
                    ↺ RESET
                </button>
            </div>
        </div>
    );
};

export default Timer;
