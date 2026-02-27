'use client';

import * as React from 'react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-[100dvh] grid grid-cols-1 md:grid-cols-2 bg-[#050510] relative text-white w-full overflow-x-hidden">
      
      {/* Left Pane - Branding & OAuth */}
      <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 relative z-10 md:border-r border-white/5 py-12 md:py-20 h-full">
        
        {/* Subtle Background Glow for Left Pane */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-br from-primary/10 to-transparent blur-3xl rounded-full mix-blend-screen -z-10 pointer-events-none" />

        <div className="mb-12 md:mb-16">
          <Link href="/" className="text-2xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity">
            RESUME<span className="text-primary text-xs align-super ml-1">®</span>
          </Link>
        </div>

        <h1 className="text-3xl sm:text-4xl font-semibold mb-3 tracking-tight">Create your account</h1>
        <p className="text-muted-foreground text-sm mb-10 text-balance">Get started with our free resume builder. Enhance your career journey.</p>

        <div className="w-full max-w-md space-y-4">
          <button className="w-full flex items-center justify-center gap-3 bg-white/[0.02] hover:bg-white/[0.04] transition-colors border border-white/10 rounded-2xl py-3.5 text-sm font-medium">
            <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </button>
          
          <button className="w-full flex items-center justify-center gap-3 bg-white/[0.02] hover:bg-white/[0.04] transition-colors border border-white/10 rounded-2xl py-3.5 text-sm font-medium">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white flex-shrink-0" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            Continue with GitHub
          </button>
          
          <button className="w-full flex items-center justify-center gap-3 bg-white/[0.02] hover:bg-white/[0.04] transition-colors border border-white/10 rounded-2xl py-3.5 text-sm font-medium">
             <svg viewBox="0 0 24 24" className="w-4 h-4 text-white flex-shrink-0" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            Continue with X
          </button>
        </div>
      </div>
      
      {/* Divider with Text (Visible mostly on desktop) */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex-col items-center justify-center pointer-events-none">
        <div className="w-[1px] h-[40vh] bg-gradient-to-b from-transparent via-white/15 to-transparent mb-8" />
        <span className="text-base md:text-lg tracking-[0.25em] font-semibold text-white/50 transform -rotate-90 origin-center absolute bg-[#050510] px-6 whitespace-nowrap">
          OR USE EMAIL
        </span>
        <div className="w-[1px] h-[40vh] bg-gradient-to-b from-transparent via-white/15 to-transparent mt-8" />
      </div>

      {/* Mobile-only divider */}
      <div className="flex md:hidden w-full max-w-sm mx-auto items-center pb-8 px-8 mt-4">
        <div className="flex-1 border-t border-white/15"></div>
        <span className="mx-6 text-sm text-white/50 tracking-[0.2em] font-semibold">OR USE EMAIL</span>
        <div className="flex-1 border-t border-white/15"></div>
      </div>

      {/* Right Pane - Form area matches design aesthetic exactly */}
      <div className="flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 lg:px-20 py-8 md:py-20 bg-[#050510]">
         
        {/* Mock auth form container matching the dark blue panel aesthetic */}
        <div className="w-full max-w-[420px] bg-[#0A0C16] border border-[#1A1C30] rounded-2xl p-8 shadow-2xl relative">
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            <div className="space-y-2">
               <label className="text-sm font-semibold text-white/90">Full Name *</label>
               <div className="relative group">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/40 group-focus-within:text-primary transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                  <input 
                     type="text" 
                     placeholder="Enter your full name" 
                     className="w-full bg-[#03040B] border border-[#1A1C30] rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20 shadow-inner"
                  />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-sm font-semibold text-white/90">Email Address *</label>
               <div className="relative group">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/40 group-focus-within:text-primary transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </div>
                  <input 
                     type="email" 
                     placeholder="Enter your email" 
                     className="w-full bg-[#03040B] border border-[#1A1C30] rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20 shadow-inner"
                  />
               </div>
            </div>

             <div className="space-y-2">
               <label className="text-sm font-semibold text-white/90">Password *</label>
               <div className="relative group">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/40 group-focus-within:text-primary transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <input 
                     type="password" 
                     placeholder="Create a password" 
                     className="w-full bg-[#03040B] border border-[#1A1C30] rounded-xl py-3 pl-10 pr-10 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20 shadow-inner"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-white/40 hover:text-white/80 transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  </div>
               </div>
            </div>

            <div className="flex items-start gap-3 pt-2">
               <div className="flex items-center h-5">
                 <input 
                    type="checkbox" 
                    id="terms" 
                    className="w-4 h-4 rounded border-[#1A1C30] bg-[#03040B] text-[#3B82F6] focus:ring-[#3B82F6]/50 focus:ring-offset-0 transition-all cursor-pointer" 
                 />
               </div>
               <label htmlFor="terms" className="text-sm text-slate-400 select-none cursor-pointer">
                  I agree to the <Link href="/terms" className="text-primary hover:underline hover:text-primary/80 transition-colors">Terms of Service</Link>
               </label>
            </div>

            <button className="w-full bg-[#20438F] hover:bg-[#20438F]/90 text-[#b5cbfe] border border-transparent transition-all py-3.5 rounded-xl font-medium mt-6 shadow-md">
               Create Account
            </button>

            <div className="text-center text-sm text-slate-400 pt-3">
               Already have an account? <Link href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">Sign in</Link>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
