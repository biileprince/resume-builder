'use client';

import * as React from 'react';
import { ResumeFormValues } from '@/lib/validations/resume';
import { motion } from 'framer-motion';

interface ResumePreviewProps {
  data: Partial<ResumeFormValues>;
}

export function ResumePreview({ data }: ResumePreviewProps) {
  const { title, summary, contactEmail, contactPhone, experiences, skills } = data;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white text-black p-8 md:p-12 min-h-[842px] w-full max-w-[595px] mx-auto shadow-2xl rounded-sm print:shadow-none"
    >
      <header className="border-b-2 border-slate-800 pb-4 mb-6">
        <h1 className="text-4xl font-serif font-bold tracking-tight text-slate-900 mb-2">
          {title || 'Your Name / Title'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          {contactEmail && <span>{contactEmail}</span>}
          {contactPhone && <span>{contactPhone}</span>}
        </div>
      </header>

      {summary && (
        <section className="mb-8">
          <p className="text-slate-700 leading-relaxed text-sm">
            {summary}
          </p>
        </section>
      )}

      {experiences && experiences.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-2 mb-4">
            Experience
          </h2>
          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <div key={idx} className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-lg text-slate-800">{exp.jobTitle || 'Role'}</h3>
                  <span className="text-sm font-medium text-slate-500">
                    {exp.startDate || 'Start'} — {exp.endDate || 'Present'}
                  </span>
                </div>
                <div className="text-md font-semibold text-slate-700 mb-2">
                  {exp.company || 'Company Name'}
                </div>
                <p className="text-sm text-slate-600 whitespace-pre-wrap">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section>
          <h2 className="text-xl font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-2 mb-4">
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {skills.map((skill, idx) => (
              <div key={idx} className="flex justify-between border-b border-slate-100 pb-1">
                <span className="font-medium text-sm text-slate-800">{skill.name || 'Skill Name'}</span>
                {skill.level && <span className="text-sm text-slate-500">{skill.level}</span>}
              </div>
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
}
