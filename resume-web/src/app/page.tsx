'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MdLanguage } from 'react-icons/md';
import { HiMenu } from 'react-icons/hi';
import { FaRegFileAlt, FaBriefcase, FaGraduationCap, FaTwitter, FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent blur-3xl rounded-full mix-blend-screen" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
        <div className="bg-[#ffffff]/[0.02] backdrop-blur-xl border border-white/5 rounded-full px-6 py-2.5 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity">
              RESUME<span className="text-primary text-xs align-super ml-1">®</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center justify-center flex-1 gap-12 text-sm font-medium text-white/80">
            <Link href="#templates" className="hover:text-white transition-colors">Templates</Link>
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            {/* Language Dropdown */}
            <div className="relative group hidden sm:flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white cursor-pointer transition-colors py-2">
              <MdLanguage className="text-lg" /> EN
              <div className="absolute top-full right-0 mt-2 w-32 bg-[#0A0C16] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden transform origin-top-right scale-95 group-hover:scale-100">
                <div className="flex flex-col py-1">
                  <span className="px-4 py-2 hover:bg-white/5 text-white/90 text-sm transition-colors cursor-pointer">🇺🇸 English</span>
                  <span className="px-4 py-2 hover:bg-white/5 text-white/60 text-sm transition-colors cursor-pointer">🇪🇸 Español</span>
                  <span className="px-4 py-2 hover:bg-white/5 text-white/60 text-sm transition-colors cursor-pointer">🇫🇷 Français</span>
                </div>
              </div>
            </div>
            
            <Link 
              href="/signup" 
              className="bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] whitespace-nowrap"
            >
              Sign Up Now
            </Link>
            <button className="md:hidden text-white/80 hover:text-white transition-colors ml-1">
              <HiMenu className="text-2xl" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-40 pb-20 px-4 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        
        {/* Floating Background Icons */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 left-[15%] text-white/[0.03] text-8xl pointer-events-none -z-10 hidden md:block"
        >
          <FaRegFileAlt />
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-64 right-[10%] text-white/[0.03] text-9xl pointer-events-none -z-10 hidden md:block"
        >
          <FaBriefcase />
        </motion.div>

        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-96 left-[10%] text-white/[0.02] text-7xl pointer-events-none -z-10 hidden md:block"
        >
          <FaGraduationCap />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold tracking-wider mb-8 shadow-[0_0_15px_rgba(59,130,246,0.15)] backdrop-blur-sm"
        >
          LAUNCHING 2025
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-[80px] font-medium tracking-tight text-white mb-6 leading-[1.1] max-w-4xl"
        >
          Build your career.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-white/40">Smarter.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance leading-relaxed"
        >
          Powerful, professional resume building to help you convert interviews, engage recruiters, and retain your ATS score. Trusted by over 4,000 professionals.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-8"
        >
          <Link 
            href="/editor" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-medium transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] w-full sm:w-auto"
          >
            Get Started Free
          </Link>
          <Link 
            href="#learn-more" 
            className="glass hover:bg-white/10 text-white px-8 py-3 rounded-full font-medium transition-all w-full sm:w-auto"
          >
            Learn More
          </Link>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-sm text-muted-foreground/60 mb-20"
        >
          Trusted by over 4,000 professionals
        </motion.p>

        {/* Mock Dashboard Graphic */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative w-full max-w-5xl mx-auto aspect-[16/9] md:aspect-[21/9] rounded-t-3xl overflow-hidden glass-panel border-b-0 mb-32"
        >
           {/* Decorative Top Sphere Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-32 bg-gradient-to-t from-primary/30 to-transparent blur-2xl" />
          
          {/* Inner Dashboard Mock */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[80%] bg-[#0a0a0a] rounded-t-2xl border border-white/10 flex flex-col overflow-hidden">
            {/* Mock Nav Bar */}
            <div className="h-14 border-b border-white/5 flex items-center px-6 gap-4">
              <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                 <div className="w-4 h-4 rounded-sm bg-primary" />
              </div>
              <div className="font-medium text-white/90">Resume Dashboard</div>
              <div className="ml-auto w-64 h-8 bg-white/5 rounded-md flex items-center px-3">
                 <span className="text-xs text-white/30">Search resumes...</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-medium text-white ml-2">JD</div>
            </div>

            {/* Mock Stat Cards */}
            <div className="p-6 grid grid-cols-4 gap-4">
              {[
                { label: 'Total Views', val: '4200', inc: '+320' },
                { label: 'New Interviews', val: '180', inc: '+12%' },
                { label: 'Profile Engagements', val: '950', inc: '+5%' },
                { label: 'ATS Score', val: '87%', inc: 'Top 10%' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="text-xs text-white/40 mb-3 flex justify-between">
                    {stat.label}
                    <span className="flex gap-0.5">
                      <span className="w-1 h-1 bg-white/20 rounded-full"/>
                      <span className="w-1 h-1 bg-white/20 rounded-full"/>
                      <span className="w-1 h-1 bg-white/20 rounded-full"/>
                    </span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="text-2xl font-bold text-white">{stat.val}</div>
                    <div className="text-xs text-emerald-400">{stat.inc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Global Reach / Map Block */}
        <div className="w-full relative py-20 mt-10">
           {/* Section Headers */}
           <div className="mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-[#091E42] text-primary text-[10px] font-bold tracking-widest uppercase mb-6 shadow-[#091E42]/50">
                 OUR GLOBAL REACH
              </div>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6">
                 Where We Work
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 text-balance">
                 Explore our worldwide presence and see where our templates and services are making an impact.
              </p>
           </div>

           {/* The Map graphic */}
           <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] flex items-center justify-center">
              {/* Fake dotted background map */}
              <div 
                 className="absolute inset-0 opacity-10 pointer-events-none"
                 style={{
                    backgroundImage: 'radial-gradient(circle, #3B82F6 1px, transparent 1px)',
                    backgroundSize: '12px 12px',
                    maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)'
                 }}
              />
              {/* Highlight Nodes */}
              {[{top:'35%', left:'20%'}, {top:'55%', left:'25%'}, {top:'45%', left:'70%'}, {top:'60%', left:'85%'}].map((pos, i) => (
                 <div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_15px_3px_rgba(59,130,246,0.8)]" style={pos} />
              ))}

              {/* Ready to Get Started Card */}
              <div className="relative z-10 w-full max-w-lg bg-[#0A0C16] border border-[#1A1C30] rounded-2xl p-8 shadow-2xl text-left">
                  <h3 className="text-2xl font-medium text-white mb-3 tracking-tight">Ready to Get Started?</h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                     Join 4,000+ startups using our analytics platform to grow smarter.
                  </p>
                  <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                     <input 
                        type="email" 
                        placeholder="Enter your email address" 
                        className="w-full bg-[#03040B] border border-[#1A1C30] rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/30 shadow-inner"
                     />
                     <button className="w-full bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white font-medium py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                        Get Started Free
                     </button>
                  </form>
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                     No credit card required • 14-day free trial
                  </p>
              </div>

               {/* Stylized background text as requested */}
               <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[15vw] font-bold text-white/[0.02] uppercase select-none pointer-events-none whitespace-nowrap overflow-hidden">
                  BRAND
               </div>
           </div>
        </div>
      </main>
      
      {/* Footer Section (Matches bottom of user images) */}
      <footer className="border-t border-white/5 mt-20">
         <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
            <div className="col-span-2">
               <div className="text-xl font-bold tracking-tight text-white mb-6">RESUME<span className="text-primary text-xs align-super ml-1">®</span></div>
               <p className="text-sm text-muted-foreground/80 max-w-xs mb-8">
                  Build stunning professional resumes with our modern templates. Designed for developers, loved by recruiters.
               </p>
               <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-white/60 hover:text-white">
                     <FaTwitter />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-white/60 hover:text-white">
                     <FaGithub />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-white/60 hover:text-white">
                     <FaLinkedin />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-white/60 hover:text-white">
                     <FaDiscord />
                  </div>
               </div>
            </div>
            
            {[
               { title: 'PRODUCT', links: ['Features', 'Pricing', 'Templates', 'Integrations'] },
               { title: 'COMPANY', links: ['About', 'Blog', 'Careers', 'Contact'] },
               { title: 'LEGAL', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'] },
            ].map((col, i) => (
               <div key={i}>
                  <h4 className="text-xs font-semibold text-white mb-6 tracking-wider">{col.title}</h4>
                  <ul className="space-y-4">
                     {col.links.map(link => (
                        <li key={link}><Link href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">{link}</Link></li>
                     ))}
                  </ul>
               </div>
            ))}
         </div>
         <div className="max-w-7xl mx-auto px-4 py-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
            <div>© 2026 Resume Builder. All rights reserved.</div>
            <div>Made with 💙 by Engineer</div>
         </div>
      </footer>
    </div>
  );
}
