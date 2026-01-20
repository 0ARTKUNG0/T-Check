import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to="/">หน้าหลัก</Link></li>
                        <li><Link to="/login">เข้าสู่ระบบ</Link></li>
                        <li><Link to="/register">สมัครสมาชิก</Link></li>
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl">T-Check</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/">หน้าหลัก</Link></li>
                </ul>
            </div>
            <div className="navbar-end hidden lg:flex gap-2">
                <Link to="/login" className="btn btn-ghost">เข้าสู่ระบบ</Link>
                <Link to="/register" className="btn btn-primary text-white">สมัครสมาชิก</Link>
            </div>
            {/* Mobile Navbar End (Alternative if needed, but Dropdown covers mobile links usually) */}
            <div className="navbar-end lg:hidden">
                <Link to="/register" className="btn btn-sm btn-primary text-white">สมัครสมาชิก</Link>
            </div>
        </div>
    )
}

export default Navbar