import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContextProvider'
import Swal from 'sweetalert2'

const Register = () => {
    const { register } = useUser();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            Swal.fire({
                icon: 'warning',
                title: 'รหัสผ่านไม่ตรงกัน',
                text: 'กรุณาตรวจสอบรหัสผ่านอีกครั้ง',
            });
            return;
        }

        setLoading(true);
        const res = await register({
            username: formData.username,
            email: formData.email,
            password: formData.password
        });
        setLoading(false);

        if (res.success) {
            Swal.fire({
                icon: 'success',
                title: 'สมัครสมาชิกสำเร็จ',
                text: 'กำลังนำท่านไปยังหน้าเข้าสู่ระบบ...',
                timer: 1500,
                showConfirmButton: false
            });
            navigate('/login');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'สมัครสมาชิกไม่สำเร็จ',
                text: res.error?.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่',
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-base-200 px-4 py-8">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="text-center mb-6">
                        <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold">สร้างบัญชีผู้ใช้</h2>
                        <p className="text-base-content/60 text-sm mt-1">เริ่มต้นใช้งานฟรีไม่มีค่าใช้จ่าย</p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Username Input */}
                        <div className="form-control">
                            <label className="label pt-0 pb-2">
                                <span className="label-text font-medium">ชื่อผู้ใช้</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-base-content/50">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    className="input input-bordered w-full pl-11 h-12 bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="form-control">
                            <label className="label pt-0 pb-2">
                                <span className="label-text font-medium">อีเมล</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-base-content/50">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    className="input input-bordered w-full pl-11 h-12 bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="form-control">
                            <label className="label pt-0 pb-2">
                                <span className="label-text font-medium">รหัสผ่าน</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-base-content/50">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    className="input input-bordered w-full pl-11 h-12 bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength={8}
                                />
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div className="form-control">
                            <label className="label pt-0 pb-2">
                                <span className="label-text font-medium">ยืนยันรหัสผ่าน</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-base-content/50">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                </div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="input input-bordered w-full pl-11 h-12 bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full text-white h-12 text-lg mt-4 shadow-md hover:shadow-lg transition-all"
                            disabled={loading}
                        >
                            {loading ? <span className="loading loading-spinner"></span> : 'สมัครสมาชิก'}
                        </button>
                    </form>

                    <div className="divider text-sm text-base-content/50">หรือ</div>

                    <button className="btn btn-outline w-full gap-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        สมัครด้วย Google
                    </button>

                    <div className="text-center mt-6">
                        <span className="text-sm text-base-content/70">มีบัญชีอยู่แล้ว? </span>
                        <Link to="/login" className="link link-primary text-sm font-semibold">เข้าสู่ระบบ</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;