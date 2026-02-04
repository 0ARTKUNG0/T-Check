import React from 'react';
import { Link } from 'react-router-dom';

const NotAllowed = () => {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-base-200 px-4">
            <div className="text-center">
                <div className="mb-6 inline-block p-6 bg-base-100 rounded-full shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-error">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                </div>
                <h1 className="text-4xl font-bold mb-2">เข้าถึงไม่ได้</h1>
                <p className="text-base-content/60 text-lg mb-8 max-w-md mx-auto">
                    ขออภัย คุณไม่มีสิทธิ์เข้าถึงหน้านี้ หรือหน้าดังกล่าวอาจไม่มีอยู่จริง
                </p>
                <Link to="/" className="btn btn-primary btn-lg gap-2 text-white shadow-lg hover:shadow-xl transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    กลับสู่หน้าหลัก
                </Link>
            </div>
        </div>
    );
};

export default NotAllowed;