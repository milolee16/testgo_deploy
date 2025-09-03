import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const Chat = () => {
    const [username, setUsername] = useState('');
    const [isUsernameSet, setIsUsernameSet] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);

    // 닉네임 설정
    const handleUsernameSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            setIsUsernameSet(true);
        }
    };

    // 메시지 전송
    const handleMessageSubmit = (e) => {
        e.preventDefault();
        if (message.trim() && username.trim()) {
            const chatMessage = {
                room: 'general', // 고정된 방 이름 사용
                sender: username,
                message: message,
            };
            // 'chatMessage' 이벤트와 함께 메시지 객체를 서버로 전송
            socketRef.current.emit('chatMessage', chatMessage);
            setMessage('');
        }
    };

    useEffect(() => {
        if (isUsernameSet) {
            // 1. 소켓 인스턴스 생성
            socketRef.current = io('http://localhost:9095', {
                withCredentials: false, // CORS 문제 최소화용
            });

            // 2. 소켓 연결 성공 시 실행될 로직
            socketRef.current.on('connect', () => {
                console.log('Socket connected:', socketRef.current.id);
                // 연결이 성공한 후에 방 참여 이벤트를 전송합니다.
                socketRef.current.emit('joinRoom', 'general');
            });

            // 3. 서버로부터 메시지 수신
            socketRef.current.on('chatMessage', (msg) => {
                setMessages((prevMessages) => [...prevMessages, msg]);
            });

            // 4. 연결 끊김 이벤트 처리 (선택 사항이지만 디버깅에 유용)
            socketRef.current.on('disconnect', (reason) => {
                console.log('Socket disconnected:', reason);
            });

            // 5. 컴포넌트가 언마운트될 때 소켓 리스너를 정리하고 연결을 해제합니다.
            return () => {
                socketRef.current.off('connect');
                socketRef.current.off('disconnect');
                socketRef.current.off('chatMessage');
                socketRef.current.disconnect();
            };
        }
    }, [isUsernameSet]);

    useEffect(() => {
        // 새 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);


    // 닉네임 입력 화면
    if (!isUsernameSet) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
                <form onSubmit={handleUsernameSubmit}>
                    <h2>채팅 닉네임을 입력하세요</h2>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="닉네임"
                        style={{ padding: '10px', width: '200px' }}
                    />
                    <button type="submit" style={{ padding: '10px' }}>입장</button>
                </form>
            </div>
        );
    }

    // 채팅 화면
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '80vh', border: '1px solid #ccc' }}>
            <div style={{ flexGrow: 1, overflowY: 'auto', padding: '10px' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <strong>{msg.sender}: </strong>{msg.message}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleMessageSubmit} style={{ display: 'flex', padding: '10px' }}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="메시지를 입력하세요"
                    style={{ flexGrow: 1, padding: '10px' }}
                />
                <button type="submit" style={{ padding: '10px' }}>전송</button>
            </form>
        </div>
    );
}

export default Chat