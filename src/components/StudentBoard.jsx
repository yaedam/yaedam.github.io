import React, { useState, useEffect } from 'react';

const StudentBoard = () => {
    // Initialize students and logs from localStorage or defaults
    const [students, setStudents] = useState(() => {
        const saved = localStorage.getItem('class-students');
        return saved ? JSON.parse(saved) : Array.from({ length: 20 }, (_, i) => ({
            id: i + 1,
            name: `학생 ${i + 1}`,
            points: 0
        }));
    });

    const [logs, setLogs] = useState(() => {
        const saved = localStorage.getItem('class-student-logs');
        return saved ? JSON.parse(saved) : {};
    });

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newLog, setNewLog] = useState('');

    useEffect(() => {
        localStorage.setItem('class-students', JSON.stringify(students));
    }, [students]);

    useEffect(() => {
        localStorage.setItem('class-student-logs', JSON.stringify(logs));
    }, [logs]);

    const handleStudentClick = (student) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
        setNewLog('');
    };

    const handlePointUpdate = (delta) => {
        if (!selectedStudent) return;
        const updatedStudents = students.map(s =>
            s.id === selectedStudent.id ? { ...s, points: s.points + delta } : s
        );
        setStudents(updatedStudents);
        // Update selected student ref for modal display
        setSelectedStudent(updatedStudents.find(s => s.id === selectedStudent.id));
    };

    const handleAddLog = () => {
        if (!newLog.trim() || !selectedStudent) return;
        const studentLogs = logs[selectedStudent.id] || [];
        const logEntry = {
            id: Date.now(),
            text: newLog,
            date: new Date().toLocaleDateString()
        };
        setLogs({
            ...logs,
            [selectedStudent.id]: [logEntry, ...studentLogs]
        });
        setNewLog('');
    };

    // Glassmorphism Styles
    const containerStyle = {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    };

    const cardStyle = {
        background: 'rgba(224, 247, 250, 0.6)', // Sky Blue Tint
        border: '1px solid rgba(255, 255, 255, 0.6)',
        borderRadius: '20px',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative'
    };

    return (
        <div style={containerStyle}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '20px',
                paddingBottom: '20px'
            }}>
                {students.map((student) => (
                    <div key={student.id}
                        onClick={() => handleStudentClick(student)}
                        style={cardStyle}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)';
                        }}
                    >
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            marginBottom: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            color: '#fff',
                            background: student.points > 0 ? 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' : (student.points < 0 ? 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' : '#ddd'),
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                        }}>
                            {student.id}
                        </div>
                        <span style={{ fontWeight: '600', color: '#444' }}>{student.name}</span>
                        {student.points !== 0 && (
                            <span style={{
                                marginTop: '5px',
                                fontWeight: '800',
                                color: student.points > 0 ? '#FF69B4' : '#888'
                            }}>
                                {student.points > 0 ? '+' : ''}{student.points}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && selectedStudent && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 2000
                }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setIsModalOpen(false);
                    }}>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '24px',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                        padding: '30px',
                        width: '90%',
                        maxWidth: '500px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        border: '1px solid rgba(255,255,255,0.5)'
                    }}>
                        <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '15px', marginTop: 0, color: '#333' }}>
                            {selectedStudent.name} <span style={{ fontSize: '0.8em', color: '#666' }}>(점수: {selectedStudent.points})</span>
                        </h2>

                        <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
                            <button onClick={() => handlePointUpdate(1)} style={{
                                flex: 1, padding: '12px', border: 'none', borderRadius: '12px',
                                background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                                color: '#555', fontWeight: 'bold', cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)', transition: 'transform 0.2s'
                            }}
                                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
                                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                👍 칭찬해요 (+1)
                            </button>
                            <button onClick={() => handlePointUpdate(-1)} style={{
                                flex: 1, padding: '12px', border: 'none', borderRadius: '12px',
                                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                                color: '#555', fontWeight: 'bold', cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)', transition: 'transform 0.2s'
                            }}
                                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
                                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                👎 반성해요 (-1)
                            </button>
                        </div>

                        <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
                            <h3 style={{ marginTop: 0, color: '#444' }}>📝 생활 기록</h3>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                                <input
                                    type="text"
                                    placeholder="기록할 내용 입력..."
                                    value={newLog}
                                    onChange={e => setNewLog(e.target.value)}
                                    style={{
                                        flex: 1, padding: '12px', borderRadius: '12px',
                                        border: '1px solid #ddd', background: '#f9f9f9', outline: 'none'
                                    }}
                                />
                                <button onClick={handleAddLog} style={{
                                    border: 'none', borderRadius: '12px', background: '#FFB6C1',
                                    color: '#fff', fontWeight: 'bold',
                                    padding: '0 20px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(255, 182, 193, 0.4)'
                                }}>
                                    등록
                                </button>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, maxHeight: '200px', overflowY: 'auto' }}>
                                {(logs[selectedStudent.id] || []).map(log => (
                                    <li key={log.id} style={{
                                        borderBottom: '1px solid #eee', padding: '12px', marginBottom: '5px',
                                        background: 'rgba(255,255,255,0.5)', borderRadius: '8px'
                                    }}>
                                        <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '3px' }}>{log.date}</div>
                                        <div style={{ color: '#444' }}>{log.text}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button onClick={() => setIsModalOpen(false)} style={{
                            width: '100%', padding: '12px', marginTop: '15px',
                            background: '#eee', color: '#555', border: 'none', borderRadius: '12px', fontWeight: 'bold',
                            cursor: 'pointer', transition: 'background 0.2s'
                        }}
                            onMouseEnter={e => e.currentTarget.style.background = '#ddd'}
                            onMouseLeave={e => e.currentTarget.style.background = '#eee'}
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentBoard;
