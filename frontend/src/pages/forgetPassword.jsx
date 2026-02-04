import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically call an API to send the reset email
        // For now, we'll just toggle the state to show the success view
        setIsSubmitted(true);
    };

    const handleRetry = () => {
        setIsSubmitted(false);
        setEmail('');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-base-200 px-4 py-8">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body text-center">
                    {!isSubmitted ? (
                        /* Form View */
                        <>
                            <div className="mb-6">
                                <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold">ลืมรหัสผ่าน</h2>
                                <p className="text-base-content/60 text-sm mt-1">ทำการเปลี่ยนรหัสผ่านและยืนยันตัวตน</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="form-control text-left">
                                    <label className="label pt-0 pb-2">
                                        <span className="label-text font-medium text-base-content/70">ชื่อผู้ใช้ หรือ อีเมล</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-base-content/50">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                        </div>
                                        <input
                                            type="text"
                                            className="input input-bordered w-full pl-11 h-12 bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all"
                                            placeholder="Username or Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-full text-white h-12 text-lg shadow-md hover:shadow-lg transition-all mt-4"
                                >
                                    ส่งเมลล์ยืนยัน
                                </button>
                            </form>
                        </>
                    ) : (
                        /* Success View */
                        <>
                            <div className="mb-6">
                                <div className="bg-success/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-success">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold">เช็คอีเมลของคุณ</h2>
                                <p className="text-base-content/60 text-sm mt-2">เราได้ส่งอีเมลล์ไปยังกล่องข้อความของคุณแล้ว</p>
                                <p className="text-primary font-medium mt-2">{email || 'example123456@testmail.com'}</p>
                                <p className="text-base-content/60 text-xs mt-4 max-w-xs mx-auto">ได้โปรดเช็คกล่องข้อความภายใน 1 ชั่วโมง<br />ก่อนที่อีเมลล์จะหมดอายุ</p>
                            </div>

                            <div className="pt-4 border-t border-base-200">
                                <p className="text-base-content/70 text-sm mb-3">อีเมลล์ส่งไม่เข้างั้นหรอ ลองอีกครั้งสิ</p>
                                <button
                                    onClick={handleRetry}
                                    className="btn btn-primary w-full text-white h-12 text-lg shadow-md hover:shadow-lg transition-all"
                                >
                                    ลองอีกครั้ง
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="mt-8 text-center w-full">
                <Link to="/" className="btn btn-ghost btn-sm gap-2 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    กลับหน้าหลัก
                </Link>
            </div>
        </div>
    );
};

export default ForgetPassword;