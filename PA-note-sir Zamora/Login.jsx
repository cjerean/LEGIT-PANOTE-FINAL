'use client';

import React, { useState, useEffect } from 'react';


const Login = () => {
    const [theme, setTheme] = useState('light');
    const [isRegister, setIsRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });

    // Initialize theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
    }, []);

    const toggleTheme = (e) => {
        const newTheme = e.target.checked ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const switchForm = (toRegister) => {
        setError('');
        setSuccessMessage('');
        setFormData({ username: '', password: '', email: '' });
        setIsRegister(toRegister);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (isRegister) {
                console.log('Register payload:', {
                    username: formData.username,
                    email: formData.email,
                    password: '***'
                });
                setSuccessMessage('Account created successfully! You can now login.');
                setTimeout(() => {
                    switchForm(false);
                }, 2000);
            } else {
                console.log('Login payload:', {
                    username: formData.username,
                    password: '***'
                });
                alert('Login successful! Redirecting...');
                // Router.push('/dashboard'); // specific to Next.js
            }
        } catch (err) {
            setError(isRegister ? 'Error creating account' : 'Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

    const isDark = theme === 'dark';

    return (
        <div className={`min-h-screen flex items-center justify-center w-full transition-all duration-300 ${isDark ? 'bg-[#18191a] text-[#e4e6eb]' : 'bg-[#f0f2f5] text-[#1a1a1a]'
            }`}>
            {/* Theme Toggle */}
            <div className="absolute top-5 right-5">
                <label className="relative inline-block w-[50px] h-[26px] cursor-pointer">
                    <input
                        type="checkbox"
                        className="opacity-0 w-0 h-0"
                        checked={isDark}
                        onChange={toggleTheme}
                    />
                    <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-400 ${isDark ? 'bg-[#4a90e2]' : 'bg-gray-300'
                        } before:absolute before:content-[''] before:h-[18px] before:w-[18px] before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-400 ${isDark ? 'before:translate-x-6' : ''
                        }`}></span>
                </label>
            </div>

            {/* Container */}
            <div className="w-full max-w-[400px] px-5">
                <div className={`rounded-xl shadow-lg p-10 text-center relative overflow-hidden transition-all duration-300 animate-fadeIn ${isDark ? 'bg-[#242526] shadow-[0_4px_12px_rgba(0,0,0,0.3)]' : 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)]'
                    }`}>
                    {/* Logo */}
                    <div className="mb-6">
                        <img
                            src="/pa-note-logo.png"
                            alt="Pa-note Logo"
                            className="h-20 w-auto mx-auto max-w-full object-contain transition-all duration-300"
                        />
                    </div>

                    {!isRegister ? (
                        /* Login Form */
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">Welcome Back</h2>
                            <p className={`mb-8 text-[0.95rem] ${isDark ? 'text-[#b0b3b8]' : 'text-[#65676b]'}`}>
                                Login to access your notes
                            </p>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-5 text-left">
                                    <label htmlFor="username" className={`block mb-2 text-sm font-medium ${isDark ? 'text-[#b0b3b8]' : 'text-[#65676b]'
                                        }`}>
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        placeholder="Enter your username"
                                        required
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 rounded-lg border text-base outline-none transition-all duration-300 ${isDark
                                            ? 'bg-[#3a3b3c] border-[#3e4042] text-[#e4e6eb] focus:border-[#4a90e2]'
                                            : 'bg-[#f5f6f7] border-[#dddfe2] text-[#1a1a1a] focus:border-[#4a90e2]'
                                            } focus:shadow-[0_0_0_2px_rgba(74,144,226,0.2)]`}
                                    />
                                </div>

                                <div className="mb-5 text-left">
                                    <label htmlFor="password" className={`block mb-2 text-sm font-medium ${isDark ? 'text-[#b0b3b8]' : 'text-[#65676b]'
                                        }`}>
                                        Password
                                    </label>
                                    <div className="relative w-full">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            placeholder="Enter your password"
                                            required
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 rounded-lg border text-base outline-none transition-all duration-300 ${isDark
                                                ? 'bg-[#3a3b3c] border-[#3e4042] text-[#e4e6eb] focus:border-[#4a90e2]'
                                                : 'bg-[#f5f6f7] border-[#dddfe2] text-[#1a1a1a] focus:border-[#4a90e2]'
                                                } focus:shadow-[0_0_0_2px_rgba(74,144,226,0.2)]`}
                                        />
                                        <i
                                            className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors duration-300 ${isDark ? 'text-[#b0b3b8] hover:text-[#4a90e2]' : 'text-[#65676b] hover:text-[#4a90e2]'
                                                }`}
                                            onClick={togglePasswordVisibility}
                                        ></i>
                                    </div>
                                    {error && !isRegister && (
                                        <div className="text-[#dc3545] text-[0.85rem] mt-1">{error}</div>
                                    )}
                                </div>

                                <a href="/forgot-password" className="block text-right -mt-2.5 mb-5 text-[0.85rem] text-[#4a90e2] no-underline hover:underline">
                                    Forgot Password?
                                </a>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full px-3 py-3 bg-[#4a90e2] text-white rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2.5 mb-4 hover:bg-[#357abd] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span><i className="fas fa-spinner fa-spin"></i> Logging in...</span>
                                    ) : (
                                        <span>Login</span>
                                    )}
                                </button>
                            </form>

                            <div className="flex items-center my-6">
                                <div className={`flex-1 border-b ${isDark ? 'border-[#3e4042]' : 'border-[#dddfe2]'}`}></div>
                                <span className={`px-2.5 text-sm ${isDark ? 'text-[#b0b3b8]' : 'text-[#65676b]'}`}>OR</span>
                                <div className={`flex-1 border-b ${isDark ? 'border-[#3e4042]' : 'border-[#dddfe2]'}`}></div>
                            </div>

                            <button className={`w-full px-3 py-3 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2.5 mb-6 border ${isDark
                                ? 'bg-[#242526] border-[#3e4042] text-[#e4e6eb] hover:bg-[#3a3b3c]'
                                : 'bg-white border-[#dddfe2] text-[#1a1a1a] hover:bg-[#f5f6f7]'
                                }`}>
                                <img
                                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                    alt="Google"
                                    className="w-5 h-5"
                                />
                                <span>Login with Google</span>
                            </button>

                            <div className={`text-sm ${isDark ? 'text-[#b0b3b8]' : 'text-[#65676b]'}`}>
                                Don't have an account? <a onClick={() => switchForm(true)} className="text-[#4a90e2] no-underline font-medium cursor-pointer hover:underline">Register</a>
                            </div>
                        </div>
                    ) : (
                        /* Register Form */
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">Create Account</h2>
                            <p className={`mb-8 text-[0.95rem] ${isDark ? 'text-[#b0b3b8]' : 'text-[#65676b]'}`}>
                                Join Pa-note today
                            </p>

                            {successMessage && (
                                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                                    {successMessage}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-5 text-left">
                                    <label htmlFor="username" className={`block mb-2 text-sm font-medium ${isDark ? 'text-[#b0b3b8]' : 'text-[#65676b]'
                                        }`}>
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        placeholder="Choose a username"
                                        required
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 rounded-lg border text-base outline-none transition-all duration-300 ${isDark
                                            ? 'bg-[#3a3b3c] border-[#3e4042] text-[#e4e6eb] focus:border-[#4a90e2]'
                                            : 'bg-[#f5f6f7] border-[#dddfe2] text-[#1a1a1a] focus:border-[#4a90e2]'
                                            } focus:shadow-[0_0_0_2px_rgba(74,144,226,0.2)]`}
                                    />
                                </div>

                                <div className="mb-5 text-left">
                                    <label htmlFor="email" className={`block mb-2 text-sm font-medium ${isDark ? 'text-[#b0b3b8]' : 'text-[#65676b]'
                                        }`}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 rounded-lg border text-base outline-none transition-all duration-300 ${isDark
                                            ? 'bg-[#3a3b3c] border-[#3e4042] text-[#e4e6eb] focus:border-[#4a90e2]'
                                            : 'bg-[#f5f6f7] border-[#dddfe2] text-[#1a1a1a] focus:border-[#4a90e2]'
                                            } focus:shadow-[0_0_0_2px_rgba(74,144,226,0.2)]`}
                                    />
                                </div>

                                <div className="mb-5 text-left">
                                    <label htmlFor="password" className={`block mb-2 text-sm font-medium ${isDark ? 'text-[#b0b3b8]' : 'text-[#65676b]'
                                        }`}>
                                        Password
                                    </label>
                                    <div className="relative w-full">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            placeholder="Create a password"
                                            required
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 rounded-lg border text-base outline-none transition-all duration-300 ${isDark
                                                ? 'bg-[#3a3b3c] border-[#3e4042] text-[#e4e6eb] focus:border-[#4a90e2]'
                                                : 'bg-[#f5f6f7] border-[#dddfe2] text-[#1a1a1a] focus:border-[#4a90e2]'
                                                } focus:shadow-[0_0_0_2px_rgba(74,144,226,0.2)]`}
                                        />
                                        <i
                                            className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors duration-300 ${isDark ? 'text-[#b0b3b8] hover:text-[#4a90e2]' : 'text-[#65676b] hover:text-[#4a90e2]'
                                                }`}
                                            onClick={togglePasswordVisibility}
                                        ></i>
                                    </div>
                                    {error && isRegister && (
                                        <div className="text-[#dc3545] text-[0.85rem] mt-1">{error}</div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full px-3 py-3 bg-[#4a90e2] text-white rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2.5 mb-4 hover:bg-[#357abd] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span><i className="fas fa-spinner fa-spin"></i> Creating Account...</span>
                                    ) : (
                                        <span>Register</span>
                                    )}
                                </button>
                            </form>

                            <div className="flex items-center my-6">
                                <div className={`flex-1 border-b ${isDark ? 'border-[#3e4042]' : 'border-[#dddfe2]'}`}></div>
                                <span className={`px-2.5 text-sm ${isDark ? 'text-[#b0b3b8]' : 'text-[#65676b]'}`}>OR</span>
                                <div className={`flex-1 border-b ${isDark ? 'border-[#3e4042]' : 'border-[#dddfe2]'}`}></div>
                            </div>

                            <button className={`w-full px-3 py-3 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2.5 mb-6 border ${isDark
                                ? 'bg-[#242526] border-[#3e4042] text-[#e4e6eb] hover:bg-[#3a3b3c]'
                                : 'bg-white border-[#dddfe2] text-[#1a1a1a] hover:bg-[#f5f6f7]'
                                }`}>
                                <img
                                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                    alt="Google"
                                    className="w-5 h-5"
                                />
                                <span>Register with Google</span>
                            </button>

                            <div className={`text-sm ${isDark ? 'text-[#b0b3b8]' : 'text-[#65676b]'}`}>
                                Already have an account? <a onClick={() => switchForm(false)} className="text-[#4a90e2] no-underline font-medium cursor-pointer hover:underline">Login</a>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default Login;
