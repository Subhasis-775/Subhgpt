import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const toast = useToast();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email: form.email,
                password: form.password
            }, {
                withCredentials: true
            });

            console.log('Login successful:', response.data);
            login(response.data.user, response.data.token);
            toast.success('Welcome back! Login successful.');
            navigate('/chat');
        } catch (err) {
            console.error('Login error:', err);
            const errorMsg = err.response?.data?.message || 'Login failed. Please try again.';
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-root">
            <div className="auth-card" role="main">
                <div className="auth-header">
                    <div className="auth-logo">SG</div>
                    <div>
                        <h2 className="auth-title">Welcome back</h2>
                        <p className="auth-sub">Sign in to continue to your account</p>
                    </div>
                </div>

                <form className="auth-form" onSubmit={onSubmit}>
                    {error && <div className="error-message">{error}</div>}

                    <div className="field">
                        <label htmlFor="email">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={onChange}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={onChange}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <div className="actions">
                        <button className="btn" type="submit" disabled={loading}>
                            {loading ? (
                                <span className="btn-loading">
                                    <span className="spinner"></span>
                                    Signing in...
                                </span>
                            ) : 'Sign in'}
                        </button>
                        <Link className="btn secondary" to="/register">Create account</Link>
                    </div>
                </form>

                <p className="meta">
                    New to SubhGPT? <Link to="/register">Create an account</Link>
                </p>
            </div>
        </div>
    );
}