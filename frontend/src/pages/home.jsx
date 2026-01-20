import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8 lg:py-16">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-base-200 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-primary"></span>
          AI-Powered Grammar Correction v3.0
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          เขียนได้อย่าง <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">มั่นใจ</span>
        </h1>

        <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          ยกระดับงานเขียนของคุณด้วยผู้ช่วย AI อัจฉริยะ ตรวจสอบและแก้ไขไวยากรณ์ภาษาไทยได้ทันที อย่างแม่นยำและเป็นธรรมชาติ
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/app" className="btn btn-primary text-white btn-lg no-animation">
            เริ่มต้นใช้งาน <span className="text-xl">→</span>
          </Link>
          <Link to="/about" className="btn btn-outline btn-lg">
            เรียนรู้การทำงาน
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="card bg-base-200/50 hover:bg-base-200 transition-colors border border-base-content/5 p-6">
          <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center text-success mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">แก้ไขทันที</h3>
          <p className="text-base-content/70">
            ตรวจสอบไวยากรณ์ คำผิด และเครื่องหมายวรรคตอนได้แบบ Real-time ของภาษาไทย
          </p>
        </div>

        {/* Card 2 */}
        <div className="card bg-base-200/50 hover:bg-base-200 transition-colors border border-base-content/5 p-6">
          <div className="w-12 h-12 rounded-xl bg-orange-400/10 flex items-center justify-center text-orange-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">แนะนำสไตล์</h3>
          <p className="text-base-content/70">
            ปรับปรุงความชัดเจน โทนเสียง และการเรียบเรียงประโยคให้ดูเป็นมืออาชีพมากยิ่งขึ้น
          </p>
        </div>

        {/* Card 3 */}
        <div className="card bg-base-200/50 hover:bg-base-200 transition-colors border border-base-content/5 p-6">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">ความเป็นส่วนตัว</h3>
          <p className="text-base-content/70">
            ข้อความของคุณจะถูกประมวลผลอย่างปลอดภัยและไม่มีการจัดเก็บข้อมูลโดยไม่ได้รับอนุญาต
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home
