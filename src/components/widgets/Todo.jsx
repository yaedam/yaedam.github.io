import React, { useState } from 'react';

const Todo = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: '숙제 검사', done: false },
        { id: 2, text: '가정통신문 배부', done: true },
    ]);
    const [input, setInput] = useState('');

    const toggleTodo = (id) => {
        setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    const addTodo = (e) => {
        if (e.key === 'Enter' && input.trim()) {
            setTodos([...todos, { id: Date.now(), text: input, done: false }]);
            setInput('');
        }
    };

    return (
        <div className="widget-todo" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#555' }}>오늘의 할 일</h3>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={addTodo}
                placeholder="할 일을 입력하세요..."
                style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '10px',
                    border: 'none',
                    outline: 'none',
                    background: 'rgba(255,255,255,0.6)',
                    marginBottom: '10px',
                    fontFamily: 'inherit'
                }}
            />
            <div style={{ flex: 1, overflowY: 'auto' }}>
                {todos.map(t => (
                    <div key={t.id} onClick={() => toggleTodo(t.id)} style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px',
                        cursor: 'pointer',
                        opacity: t.done ? 0.6 : 1,
                        textDecoration: t.done ? 'line-through' : 'none'
                    }}>
                        <div style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            border: '2px solid var(--accent-pink)',
                            background: t.done ? 'var(--accent-pink)' : 'transparent',
                            marginRight: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {t.done && <span style={{ color: '#fff', fontSize: '10px' }}>✓</span>}
                        </div>
                        <span>{t.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Todo;
