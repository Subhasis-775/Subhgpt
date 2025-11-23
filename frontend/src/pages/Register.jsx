import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import axios from "axios";
import { useToast } from "../context/ToastContext";

export default function Register() {
    const navigate = useNavigate();
    const toast = useToast();
    const [form, setForm] = useState({ email: '', firstName: '', lastName: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', {
                fullName: {
                    firstName: form.firstName,
                    lastName: form.lastName
                },
                email: form.email,
                password: form.password
            });

            console.log('Registration successful:', response.data);
            toast.success('Account created successfully! Please sign in.');
            navigate('/login');
        } catch (err) {
            console.error('Registration error:', err);
            const errorMsg = err.response?.data?.message || 'Registration failed. Please try again.';
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
                        <h2 className="auth-title">Create account</h2>
                        <p className="auth-sub">Join SubhGPT and start chatting with AI</p>
                    </div>
                </div>

                <form className="auth-form" onSubmit={onSubmit}>
                    {error && <div className="error-message">{error}</div>}

                    <div className="row">
                        <div className="field">
                            <label htmlFor="firstName">First name</label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                placeholder="John"
                                value={form.firstName}
                                onChange={onChange}
                                required
                                autoComplete="given-name"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="lastName">Last name</label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                placeholder="Doe"
                                value={form.lastName}
                                onChange={onChange}
                                required
                                autoComplete="family-name"
                            />
                        </div>
                    </div>

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
                            placeholder="Create a strong password"
                            value={form.password}
                            onChange={onChange}
                            required
                            autoComplete="new-password"
                            minLength="6"
                        />
                    </div>

                    <div className="actions">
                        <button className="btn" type="submit" disabled={loading}>
                            {loading ? (
                                <span className="btn-loading">
                                    <span className="spinner"></span>
                                    Creating account...
                                </span>
                            ) : 'Create account'}
                        </button>
                        <Link className="btn secondary" to="/login">Already have an account?</Link>
                    </div>
                </form>

                <p className="meta">
                    By creating an account you agree to our <Link to="/">Terms of Service</Link>
                </p>
            </div>
        </div>
    );
}