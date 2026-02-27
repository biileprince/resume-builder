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
      className="bg-white text-slate-900 p-10 md:p-14 min-h-[1056px] w-full max-w-[816px] mx-auto shadow-2xl rounded-sm print:shadow-none font-sans"
    >
      <header className="border-b-2 border-slate-800 pb-5 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-3">
          {title || 'Your Name / Title'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
          {contactEmail && <span>{contactEmail}</span>}
          {contactPhone && <span>{contactPhone}</span>}
        </div>
      </header>

      {summary && (
        <section className="mb-10">
          <p className="text-slate-700 leading-relaxed text-[15px]">
            {summary}
          </p>
        </section>
      )}

      {experiences && experiences.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-2 mb-6">
            Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className="break-inside-avoid group">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[17px] text-slate-800">{exp.jobTitle || 'Role'}</h3>
                  <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                    {exp.startDate || 'Start'} — {exp.endDate || 'Present'}
                  </span>
                </div>
                <div className="text-[15px] font-semibold text-slate-600 mb-3">
                  {exp.company || 'Company Name'}
                </div>
                <p className="text-[15px] text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section>
          <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-2 mb-6">
            Skills
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
            {skills.map((skill, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="font-semibold text-[15px] text-slate-800">{skill.name || 'Skill Name'}</span>
                {skill.level && <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{skill.level}</span>}
              </div>
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
}
