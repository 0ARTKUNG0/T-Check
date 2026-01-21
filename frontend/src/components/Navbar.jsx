import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../contexts/UserContextProvider'

const Navbar = () => {
    const { user, logout, isAuthenticated } = useUser();

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
            <div className="navbar-end hidden lg:flex gap-3">
                {!isAuthenticated ? (
                    <>
                        <Link to="/login" className="btn btn-ghost hover:bg-base-200">เข้าสู่ระบบ</Link>
                        <Link to="/register" className="btn btn-primary text-white shadow-md hover:shadow-lg transition-all">สมัครสมาชิก</Link>
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

            {/* Mobile Navbar End */}
            {!isAuthenticated && (
                <div className="navbar-end lg:hidden">
                    <Link to="/register" className="btn btn-sm btn-primary text-white">สมัครสมาชิก</Link>
                </div>
            )}
        </div>
    )
}

export default Navbar