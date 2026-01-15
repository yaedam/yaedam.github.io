import React, { useState, useEffect } from 'react';

const WorkLog = () => {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('class-worklog');
        return saved ? JSON.parse(saved) : [
            { id: 1, text: '학급 일지 작성하기', completed: false },
            { id: 2, text: '가정통신문 배부하기', completed: true }
        ];
    });

    useEffect(() => {
        localStorage.setItem('class-worklog', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        const newTask = {
            id: Date.now(),
            text: '',
            completed: false
        };
        setTasks([newTask, ...tasks]);
    };

    const updateTask = (id, text) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, text } : t));
    };

    const toggleComplete = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    // Glassmorphism Styles
    const containerStyle = {
        padding: '20px',
        maxWidth: '800px',
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
        display: 'block',
        width: '100%',
        transition: 'all 0.3s ease',
        textAlign: 'center'
    };

    const taskStyle = (completed) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        padding: '20px',
        background: completed ? 'rgba(255, 255, 255, 0.4)' : 'rgba(224, 247, 250, 0.6)',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        borderRadius: '20px',
        marginBottom: '15px',
        boxShadow: completed ? 'none' : '0 8px 20px rgba(0,0,0,0.05)',
        opacity: completed ? 0.6 : 1,
        transition: 'all 0.3s ease',
        transform: completed ? 'scale(0.98)' : 'scale(1)'
    });

    const checkboxStyle = {
        width: '24px',
        height: '24px',
        cursor: 'pointer',
        accentColor: '#FFB6C1',
        borderRadius: '50%'
    };

    const inputStyle = (completed) => ({
        flex: 1,
        padding: '8px',
        border: 'none',
        background: 'transparent',
        fontSize: '1.2rem',
        textDecoration: completed ? 'line-through' : 'none',
        fontWeight: '500',
        fontFamily: 'inherit',
        color: completed ? '#888' : '#333'
    });

    const deleteBtnStyle = {
        padding: '8px 16px',
        background: 'rgba(255, 182, 193, 0.5)',
        border: 'none',
        borderRadius: '12px',
        color: '#d63384',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(214, 51, 132, 0.1)',
        transition: 'background 0.2s'
    };

    return (
        <div style={containerStyle}>
            <button
                onClick={addTask}
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
                + 새로운 업무 추가
            </button>

            <div>
                {tasks.map(task => (
                    <div key={task.id} style={taskStyle(task.completed)}
                        onMouseEnter={e => !task.completed && (e.currentTarget.style.transform = 'translateY(-2px)')}
                        onMouseLeave={e => !task.completed && (e.currentTarget.style.transform = 'translateY(0)')}
                    >
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleComplete(task.id)}
                            style={checkboxStyle}
                        />
                        <input
                            type="text"
                            value={task.text}
                            onChange={(e) => updateTask(task.id, e.target.value)}
                            placeholder="할 일을 입력하세요..."
                            style={inputStyle(task.completed)}
                        />
                        <button
                            onClick={() => deleteTask(task.id)}
                            style={deleteBtnStyle}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 182, 193, 0.8)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 182, 193, 0.5)'}
                        >
                            삭제
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkLog;
