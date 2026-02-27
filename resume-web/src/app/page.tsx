'use client';

import * as React from 'react';
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
      // Typically API endpoint is on port 3001. We will use localhost:3001 for now.
      // But we can also set it up dynamically.
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      const res = await fetch(`${API_URL}/resumes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to create resume');
      const savedResume = await res.json();

      // Trigger PDF export download
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
    <main className="min-h-screen p-4 md:p-8 lg:p-12 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-primary to-indigo-600">
          Supercharge Your Career
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl text-balance">
          Build a stunning resume with our real-time editor and instantly export to a pixel-perfect PDF.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
        <div className="lg:col-span-5 h-[calc(100vh-16rem)] overflow-y-auto pr-4 custom-scrollbar">
          <form id="resume-form" onSubmit={handleSubmit(onSubmit)}>
            <ResumeForm 
              control={control} 
              register={register} 
              errors={errors} 
              isSubmitting={isSubmitting} 
            />
          </form>
        </div>

        <div className="lg:col-span-7 sticky top-4 h-[calc(100vh-16rem)] overflow-y-auto hidden md:flex items-start justify-center pb-20 rounded-xl bg-slate-900/5 shadow-inner">
          <ResumePreview data={formData} />
        </div>
      </div>
    </main>
  );
}
