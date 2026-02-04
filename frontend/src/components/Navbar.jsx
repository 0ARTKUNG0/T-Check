import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../contexts/UserContextProvider'

const Navbar = () => {
    const { user, logout, isAuthenticated } = useUser();

    // Initialize theme from localStorage or default to light
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        localStorage.setItem("theme", theme);
        // Set date-theme attribute for DaisyUI/Tailwind
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    return (
        <div className="navbar sticky top-0 z-50 bg-base-100/90 backdrop-blur-lg shadow-sm px-4 md:px-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to="/">หน้าหลัก</Link></li>
                        {!isAuthenticated ? (
                            <>
                                <li><Link to="/login">เข้าสู่ระบบ</Link></li>
                                <li><Link to="/register">สมัครสมาชิก</Link></li>
                            </>
                        ) : (
                            <li><button onClick={logout}>ออกจากระบบ</button></li>
                        )}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-2xl font-bold text-primary gap-0">
                    T<span className="text-base-content">-Check</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-medium">
                    <li><Link to="/">หน้าหลัก</Link></li>
                    {/* Add more links here later */}
                </ul>
            </div>
            <div className="navbar-end flex gap-3">
                {/* Theme Toggle */}
                <label className="swap swap-rotate btn btn-ghost btn-circle">
                    {/* this hidden checkbox controls the state */}
                    <input
                        type="checkbox"
                        className="theme-controller"
                        checked={theme === "dark"}
                        onChange={handleToggle}
                    />

                    {/* sun icon */}
                    <svg
                        className="swap-off h-5 w-5 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,5.64,7.05Zm12,1.41a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41l-.71.71A1,1,0,0,0,17.65,8.46Zm1.75,3.84H20a1,1,0,0,0,0-2h-1.6a1,1,0,0,0,0,2Zm-3.75,5.19a1,1,0,0,0,.7,5.5,1,1,0,0,0,.71,5.5,1,1,0,0,0,0,1l.71.71a1,1,0,1,0,1.41-1.41l-.71-.71A1,1,0,0,0,18.36,17.06Zm-5.36,1.41a1,1,0,0,0-1,1v1.6a1,1,0,0,0,2,0v-1.6A1,1,0,0,0,12,18.46ZM12,6a6,6,0,1,0,6,6A6,6,0,0,0,12,6Z" />
                    </svg>

                    {/* moon icon */}
                    <svg
                        className="swap-on h-5 w-5 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                </label>
                {!isAuthenticated ? (
                    <>
                        <Link to="/login" className="btn btn-ghost hover:bg-base-200 hidden lg:flex">เข้าสู่ระบบ</Link>
                        <Link to="/register" className="btn btn-primary text-white shadow-md hover:shadow-lg transition-all hidden lg:flex">สมัครสมาชิก</Link>
                        {/* Mobile Register Button - Visible only on small screens */}
                        <Link to="/register" className="btn btn-sm btn-primary text-white lg:hidden">สมัครสมาชิก</Link>
                    </>
                ) : (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                {/* Placeholder for user image or initials */}
                                <div className="bg-neutral text-neutral-content w-full h-full flex items-center justify-center text-lg font-bold">
                                    {user?.username?.charAt(0).toUpperCase()}
                                </div>
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-200">
                            <li className="menu-title px-4 py-2">
                                <span className="text-xs opacity-50">เข้าสู่ระบบโดย</span>
                                <span className="font-bold text-base-content block truncate max-w-[10rem]">{user?.username}</span>
                            </li>
                            <div className="divider my-0"></div>
                            <li><a>โปรไฟล์</a></li>
                            <li><a>การตั้งค่า</a></li>
                            <li><button onClick={logout} className="text-error font-medium hover:bg-error/10">ออกจากระบบ</button></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar