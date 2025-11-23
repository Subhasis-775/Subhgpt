import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../styles/chat.css';

const API_URL = 'http://localhost:5000';

export default function Chat() {
    const { user, token, logout } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();
    const [chats, setChats] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [socket, setSocket] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const textareaRef = useRef(null);

    // Initialize socket connection
    useEffect(() => {
        if (!token) return;

        const newSocket = io(API_URL, {
            withCredentials: true,
            auth: {
                token: token
            },
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5
        });

        newSocket.on('connect', () => {
            console.log('Socket connected');
            toast.success('Connected to server');
        });

        newSocket.on('ai-response', (data) => {
            console.log('AI response received:', data);
            setMessages(prev => [...prev, {
                role: 'model',
                content: data.content,
                createdAt: new Date()
            }]);
            setLoading(false);
        });

        newSocket.on('ai-error', (error) => {
            console.error('AI error:', error);
            setLoading(false);
            toast.error('Error: ' + error.message);
        });

        newSocket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        newSocket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        setSocket(newSocket);

        return () => {
            console.log('Cleaning up socket connection');
            newSocket.removeAllListeners();
            newSocket.close();
        };
    }, [token]); // Removed toast from dependencies to prevent reconnections

    // Load chats on mount
    useEffect(() => {
        if (token) {
            loadChats();
        }
    }, [token]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [inputMessage]);

    const loadChats = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/chat`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setChats(response.data.chats);
        } catch (error) {
            console.error('Error loading chats:', error);
            if (error.response?.status === 401) {
                toast.error('Session expired. Please login again.');
                logout();
                navigate('/login');
            }
        }
    };

    const loadMessages = async (chatId) => {
        try {
            const response = await axios.get(`${API_URL}/api/chat/${chatId}/messages`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(response.data.messages);
        } catch (error) {
            console.error('Error loading messages:', error);
            toast.error('Failed to load messages');
        }
    };

    const createNewChat = async () => {
        try {
            const response = await axios.post(`${API_URL}/api/chat`, {
                title: 'New Chat'
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const newChat = response.data.chat;
            setChats([newChat, ...chats]);
            setActiveChat(newChat);
            setMessages([]);
            toast.success('New chat created');
        } catch (error) {
            console.error('Error creating chat:', error);
            toast.error('Failed to create chat');
        }
    };

    const deleteChat = async (chatId, e) => {
        e.stopPropagation();
        
        try {
            await axios.delete(`${API_URL}/api/chat/${chatId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setChats(chats.filter(c => c._id !== chatId));
            if (activeChat?._id === chatId) {
                setActiveChat(null);
                setMessages([]);
            }
            toast.success('Chat deleted');
        } catch (error) {
            console.error('Error deleting chat:', error);
            toast.error('Failed to delete chat');
        }
    };

    const selectChat = (chat) => {
        setActiveChat(chat);
        loadMessages(chat._id);
    };

    const sendMessage = async () => {
        if (!inputMessage.trim() || !activeChat || !socket) return;

        const userMessage = {
            role: 'user',
            content: inputMessage,
            createdAt: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setLoading(true);

        socket.emit('ai-message', {
            chat: activeChat._id,
            content: inputMessage
        });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            toast.info('Processing file...');
            const response = await axios.post(`${API_URL}/api/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setInputMessage(prev => prev + '\n\n' + response.data.text);
            toast.success('File processed successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Error uploading file: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleLogout = () => {
        logout();
        toast.info('Logged out successfully');
        navigate('/login');
    };

    const getUserInitials = () => {
        if (!user?.name) return 'U';
        const names = user.name.split(' ');
        return names.map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <div className="chat-container">
            {/* Sidebar */}
            <div className={`chat-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>SubhGPT</h2>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="toggle-btn">
                        {sidebarOpen ? '←' : '→'}
                    </button>
                </div>

                <button onClick={createNewChat} className="new-chat-btn">
                    New Chat
                </button>

                <div className="chat-list">
                    {chats.map(chat => (
                        <div
                            key={chat._id}
                            className={`chat-item ${activeChat?._id === chat._id ? 'active' : ''}`}
                            onClick={() => selectChat(chat)}
                        >
                            <span className="chat-title">{chat.title}</span>
                            <button
                                onClick={(e) => deleteChat(chat._id, e)}
                                className="delete-btn"
                                title="Delete chat"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>

                <div className="sidebar-footer">
                    <div className="user-info">
                        <span>{user?.name || 'User'}</span>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="chat-main">
                {!activeChat ? (
                    <div className="empty-state">
                        <h1>Welcome to SubhGPT</h1>
                        <p>Create a new chat to get started</p>
                    </div>
                ) : (
                    <>
                        <div className="messages-container">
                            {messages.map((msg, idx) => (
                                <div key={msg._id || `msg-${idx}`} className={`message ${msg.role}`}>
                                    <div className="message-avatar">
                                        {msg.role === 'user' ? getUserInitials() : 'AI'}
                                    </div>
                                    <div className="message-content">
                                        <ReactMarkdown
                                            components={{
                                                code({ node, inline, className, children, ...props }) {
                                                    const match = /language-(\w+)/.exec(className || '');
                                                    return !inline && match ? (
                                                        <SyntaxHighlighter
                                                            style={vscDarkPlus}
                                                            language={match[1]}
                                                            PreTag="div"
                                                            {...props}
                                                        >
                                                            {String(children).replace(/\n$/, '')}
                                                        </SyntaxHighlighter>
                                                    ) : (
                                                        <code className={className} {...props}>
                                                            {children}
                                                        </code>
                                                    );
                                                }
                                            }}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="message model">
                                    <div className="message-avatar">AI</div>
                                    <div className="message-content loading">
                                        <span className="dot"></span>
                                        <span className="dot"></span>
                                        <span className="dot"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="input-container">
                            <div className="input-wrapper">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    accept=".pdf,.txt,.docx,.doc"
                                    style={{ display: 'none' }}
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="file-btn"
                                    title="Upload file"
                                >
                                    📎
                                </button>
                                <textarea
                                    ref={textareaRef}
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            sendMessage();
                                        }
                                    }}
                                    placeholder="Type your message..."
                                    rows={1}
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={loading || !inputMessage.trim()}
                                    className="send-btn"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
