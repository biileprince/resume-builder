'use client';

import * as React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resumeSchema, ResumeFormValues } from '@/lib/validations/resume';
import { ResumeForm } from '@/components/resume/resume-form';
import { ResumePreview } from '@/components/resume/resume-preview';
import { motion } from 'framer-motion';

export default function Home() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      experiences: [{ jobTitle: '', company: '', description: '' }],
      skills: [{ name: '', level: 'Intermediate' }],
    },
  });

  const formData = watch();

  const onSubmit = async (data: ResumeFormValues) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      const res = await fetch(`${API_URL}/resumes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to create resume');
      const savedResume = await res.json();

      const exportRes = await fetch(`${API_URL}/resumes/${savedResume.id}/export`, {
        method: 'GET',
      });
      
      if (!exportRes.ok) throw new Error('Failed to export PDF');

      const blob = await exportRes.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume-${savedResume.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(error);
      alert('An error occurred while saving or exporting.');
    }
  };

  return (
    <main className="h-[100dvh] bg-[#050510] flex flex-col overflow-hidden w-full font-sans text-white">
      {/* Modern Toolbar */}
      <header className="h-14 flex-shrink-0 border-b border-white/10 bg-[#0A0A16] px-4 md:px-6 flex items-center justify-between z-20 shadow-md">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-2 text-sm font-medium">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back
          </Link>
          <div className="h-4 w-px bg-white/20 hidden sm:block"></div>
          <h1 className="text-sm font-medium tracking-tight hidden sm:flex items-center gap-2">
            Professional Resume Builder <span className="text-white/40 font-normal ml-2">Untitled_Resume.pdf</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            type="submit" 
            form="resume-form" 
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? (
              <svg className="animate-spin w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            )}
            Download PDF
          </button>
        </div>
      </header>

      {/* Workspace */}
      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-[450px_1fr] relative w-full">
        
        {/* Left Panel: Form (Settings sidebar) */}
        <div className="h-full overflow-y-auto custom-scrollbar border-r border-white/10 bg-[#0A0A16] relative z-10 flex flex-col shadow-2xl">
          <div className="p-6 md:p-8 w-full flex-1">
            <div className="mb-6 pb-4 border-b border-white/10">
               <h2 className="text-xl font-semibold tracking-tight text-white mb-1">Resume Details</h2>
               <p className="text-sm text-white/50">Edit your information below. The document updates automatically.</p>
            </div>
            {/* The ResumeForm is inside */}
            <div className="w-full">
              <form id="resume-form" onSubmit={handleSubmit(onSubmit)}>
                <ResumeForm 
                  control={control} 
                  register={register} 
                  errors={errors} 
                  isSubmitting={isSubmitting} 
                />
              </form>
            </div>
          </div>
        </div>

        {/* Right Panel: Live Preview Canvas */}
        <div className="hidden lg:flex h-full overflow-y-auto custom-scrollbar items-start justify-center p-8 lg:p-12 bg-[#050510] relative">
          {/* Subtle background pattern for canvas feel */}
          <div className="absolute inset-0 opacity-[0.2] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          {/* Subtle glow behind document */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative w-full max-w-[850px] transition-all z-10">
            <ResumePreview data={formData} />
          </div>
        </div>
      </div>
    </main>
  );
}
