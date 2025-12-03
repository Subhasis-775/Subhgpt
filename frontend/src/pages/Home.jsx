import React, { useEffect, Suspense, lazy } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import "../styles/home.css";

// Lazy load 3D scene for better performance
const Scene3D = lazy(() => import("../components/Scene3D"));

export default function Home() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/chat');
        }
    }, [isAuthenticated, navigate]);

    const features = [
        {
            icon: "🤖",
            title: "AI-Powered Conversations",
            description: "Intelligent responses powered by Google Gemini AI with advanced natural language understanding"
        },
        {
            icon: "⚡",
            title: "Real-time Messaging",
            description: "Lightning-fast WebSocket connections for instant AI responses and seamless communication"
        },
        {
            icon: "🔍",
            title: "Semantic Search",
            description: "Vector embeddings with Pinecone for context-aware, intelligent conversation history"
        },
        {
            icon: "📁",
            title: "File Upload",
            description: "Upload and analyze PDF, DOCX, and TXT files with intelligent text extraction"
        },
        {
            icon: "🎨",
            title: "Modern Interface",
            description: "Beautiful ChatGPT-inspired UI with dark mode, syntax highlighting, and markdown support"
        },
        {
            icon: "🔒",
            title: "Secure & Private",
            description: "JWT authentication, encrypted passwords, and protected API routes for your security"
        }
    ];

    const stats = [
        { number: "100%", label: "Open Source" },
        { number: "24/7", label: "Availability" },
        { number: "∞", label: "Possibilities" }
    ];

    return (
        <div className="home-page">
            {/* 3D Background */}
            <Suspense fallback={null}>
                <Scene3D />
            </Suspense>

            {/* Hero Section */}
            <section className="hero-section">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="hero-title">
                        Welcome to SubhGPT
                    </h1>
                    <p className="hero-subtitle">
                        Your intelligent AI assistant powered by Google Gemini. 
                        Experience the future of conversational AI with real-time responses, 
                        semantic search, and a beautiful interface.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/login" className="btn btn-primary">
                            Get Started
                        </Link>
                        <Link to="/register" className="btn btn-secondary">
                            Create Account
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Powerful Features
                </motion.h2>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="feature-card"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="feature-icon">{feature.icon}</div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Built for Excellence
                </motion.h2>
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="stat-card"
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="stat-number">{stat.number}</div>
                            <div className="stat-label">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="cta-title">Ready to Get Started?</h2>
                    <p className="cta-description">
                        Join thousands of users experiencing the power of AI-driven conversations. 
                        Create your free account today and unlock limitless possibilities.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/register" className="btn btn-primary">
                            Sign Up Free
                        </Link>
                        <Link to="/login" className="btn btn-secondary">
                            Sign In
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}