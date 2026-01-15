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

    // Cubism Styles
    const containerStyle = {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    };

    const cardStyle = {
        background: '#fff',
        border: '3px solid #000',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        boxShadow: '6px 6px 0 #000',
        cursor: 'pointer',
        transition: 'all 0.1s',
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
                        onMouseDown={e => {
                            e.currentTarget.style.transform = 'translate(2px, 2px)';
                            e.currentTarget.style.boxShadow = '4px 4px 0 #000';
                        }}
                        onMouseUp={e => {
                            e.currentTarget.style.transform = 'translate(0, 0)';
                            e.currentTarget.style.boxShadow = '6px 6px 0 #000';
                        }}
                    >
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            border: '2px solid #000',
                            marginBottom: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            background: student.points > 0 ? '#90EE90' : (student.points < 0 ? '#FFB6C1' : '#eee')
                        }}>
                            {student.id}
                        </div>
                        <span style={{ fontWeight: 'bold' }}>{student.name}</span>
                        {student.points !== 0 && (
                            <span style={{
                                marginTop: '5px',
                                fontWeight: '900',
                                color: student.points > 0 ? 'green' : 'red'
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
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 2000
                }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setIsModalOpen(false);
                    }}>
                    <div style={{
                        background: '#fff',
                        border: '4px solid #000',
                        boxShadow: '10px 10px 0 #000',
                        padding: '30px',
                        width: '90%',
                        maxWidth: '500px',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}>
                        <h2 style={{ borderBottom: '3px solid #000', paddingBottom: '10px', marginTop: 0 }}>
                            {selectedStudent.name} (점수: {selectedStudent.points})
                        </h2>

                        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                            <button onClick={() => handlePointUpdate(1)} style={{
                                flex: 1, padding: '10px', border: '2px solid #000',
                                background: '#90EE90', fontWeight: 'bold', cursor: 'pointer',
                                boxShadow: '3px 3px 0 #000'
                            }}>
                                👍 칭찬해요 (+1)
                            </button>
                            <button onClick={() => handlePointUpdate(-1)} style={{
                                flex: 1, padding: '10px', border: '2px solid #000',
                                background: '#FFB6C1', fontWeight: 'bold', cursor: 'pointer',
                                boxShadow: '3px 3px 0 #000'
                            }}>
                                👎 반성해요 (-1)
                            </button>
                        </div>

                        <div style={{ borderTop: '3px solid #000', paddingTop: '20px' }}>
                            <h3 style={{ marginTop: 0 }}>📝 생활 기록</h3>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                                <input
                                    type="text"
                                    placeholder="기록할 내용 입력..."
                                    value={newLog}
                                    onChange={e => setNewLog(e.target.value)}
                                    style={{ flex: 1, padding: '8px', border: '2px solid #000' }}
                                />
                                <button onClick={handleAddLog} style={{
                                    border: '2px solid #000', background: '#FFD700', fontWeight: 'bold',
                                    padding: '0 15px', cursor: 'pointer', boxShadow: '2px 2px 0 #000'
                                }}>
                                    등록
                                </button>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, maxHeight: '200px', overflowY: 'auto' }}>
                                {(logs[selectedStudent.id] || []).map(log => (
                                    <li key={log.id} style={{
                                        border: '2px solid #000', padding: '10px', marginBottom: '10px',
                                        background: '#F0F8FF', boxShadow: '2px 2px 0 #000'
                                    }}>
                                        <div style={{ fontSize: '0.8rem', color: '#555', marginBottom: '5px' }}>{log.date}</div>
                                        <div>{log.text}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button onClick={() => setIsModalOpen(false)} style={{
                            width: '100%', padding: '10px', marginTop: '10px',
                            background: '#000', color: '#fff', border: 'none', fontWeight: 'bold',
                            cursor: 'pointer'
                        }}>
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentBoard;
