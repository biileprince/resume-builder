import { z } from "zod";

// ── Core Sections ──────────────────────────────────────────────

export const experienceSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
  bulletPoints: z.array(z.string()).optional(),
});

export const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  level: z.string().optional(),
  category: z.enum(["hard", "soft"]).optional().default("hard"),
});

export const educationSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().optional(),
  graduationYear: z.string().optional(),
  gpa: z.string().optional(),
  honors: z.string().optional(),
});

// ── Dynamic Optional Sections ──────────────────────────────────

export const certificationSchema = z.object({
  name: z.string().min(1, "Certification name is required"),
  issuer: z.string().optional(),
  date: z.string().optional(),
  url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  description: z.string().optional(),
  technologies: z.string().optional(),
});

export const volunteerSchema = z.object({
  role: z.string().min(1, "Role is required"),
  organization: z.string().min(1, "Organization is required"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

export const publicationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  publisher: z.string().optional(),
  date: z.string().optional(),
  url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export const languageSchema = z.object({
  language: z.string().min(1, "Language is required"),
  fluency: z.string().optional(),
});

export const referenceSchema = z.object({
  name: z.string().optional(),
  company: z.string().optional(),
  contactInfo: z.string().optional(),
  availableUponRequest: z.boolean().optional().default(true),
});

export const customSectionSchema = z.object({
  sectionTitle: z.string().min(1, "Section title is required"),
  content: z.string().optional(),
  sortOrder: z.number().optional().default(0),
});

// ── Document Type & Template ───────────────────────────────────

export const documentTypeEnum = z.enum(["RESUME", "CV"]);
export const templateIdEnum = z.enum(["professional", "modern", "creative"]);

// ── Main Resume Schema ─────────────────────────────────────────

export const resumeSchema = z.object({
  // Metadata
  documentType: documentTypeEnum.default("RESUME"),
  templateId: templateIdEnum.default("professional"),

  // Personal details / header
  fullName: z.string().optional(),
  title: z.string().min(1, "Resume title is required"),
  summary: z.string().optional(),
  contactEmail: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),
  contactPhone: z.string().optional(),
  location: z.string().optional(),

  // Links & portfolio
  linkedinUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  portfolioUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  websiteUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  dribbbleUrl: z.string().url("Invalid URL").optional().or(z.literal("")),

  // Core sections
  experiences: z.array(experienceSchema).optional(),
  skills: z.array(skillSchema).optional(),
  education: z.array(educationSchema).optional(),

  // Dynamic optional sections
  certifications: z.array(certificationSchema).optional(),
  projects: z.array(projectSchema).optional(),
  volunteer: z.array(volunteerSchema).optional(),
  publications: z.array(publicationSchema).optional(),
  languages: z.array(languageSchema).optional(),
  references: z.array(referenceSchema).optional(),
  customSections: z.array(customSectionSchema).optional(),
});

// ── Inferred Types ─────────────────────────────────────────────

export type ResumeFormValues = z.infer<typeof resumeSchema>;
export type ExperienceFormValues = z.infer<typeof experienceSchema>;
export type SkillFormValues = z.infer<typeof skillSchema>;
export type EducationFormValues = z.infer<typeof educationSchema>;
export type CertificationFormValues = z.infer<typeof certificationSchema>;
export type ProjectFormValues = z.infer<typeof projectSchema>;
export type VolunteerFormValues = z.infer<typeof volunteerSchema>;
export type PublicationFormValues = z.infer<typeof publicationSchema>;
export type LanguageFormValues = z.infer<typeof languageSchema>;
export type ReferenceFormValues = z.infer<typeof referenceSchema>;
export type CustomSectionFormValues = z.infer<typeof customSectionSchema>;
export type DocumentType = z.infer<typeof documentTypeEnum>;
export type TemplateId = z.infer<typeof templateIdEnum>;
