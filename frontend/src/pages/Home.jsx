import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/chat');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="page home-page" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: 20,
            textAlign: 'center'
        }}>
            <h1 style={{
                fontSize: '3rem',
                marginBottom: '1rem',
                background: 'linear-gradient(90deg, var(--accent-color), var(--muted-color))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
            }}>
                Welcome to SubhGPT
            </h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'rgba(var(--text), 0.7)' }}>
                Your intelligent AI assistant powered by Google Gemini
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/login" style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(90deg, var(--accent-color), var(--muted-color))',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '10px',
                    fontWeight: 600
                }}>
                    Sign In
                </Link>
                <Link to="/register" style={{
                    padding: '12px 24px',
                    background: 'transparent',
                    border: '1px solid rgba(var(--text), 0.2)',
                    color: 'var(--text-color)',
                    textDecoration: 'none',
                    borderRadius: '10px',
                    fontWeight: 600
                }}>
                    Sign Up
                </Link>
            </div>
        </div>
    );
}