import React from 'react'

const Footer = () => {
    return (
        <footer className="footer footer-center p-10 bg-base-300 text-base-content rounded-t-xl">
            <aside>
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
                <p className="font-bold text-lg">
                    T-Check
                    <br />
                    <span className="font-normal text-base text-base-content/70">AI-Powered Thai Grammar Checker</span>
                </p>
                <p className="text-sm text-base-content/50">Copyright © {new Date().getFullYear()} - All right reserved by T-Check</p>
            </aside>

        </footer>
    )
}

export default Footer