import { z } from 'zod';

export const experienceSchema = z.object({
  jobTitle: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company is required'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

export const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  level: z.string().optional(),
});

export const resumeSchema = z.object({
  title: z.string().min(1, 'Resume title is required'),
  summary: z.string().optional(),
  contactEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  contactPhone: z.string().optional(),
  experiences: z.array(experienceSchema).optional(),
  skills: z.array(skillSchema).optional(),
});

export type ResumeFormValues = z.infer<typeof resumeSchema>;
export type ExperienceFormValues = z.infer<typeof experienceSchema>;
export type SkillFormValues = z.infer<typeof skillSchema>;
