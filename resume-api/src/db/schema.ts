import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  jsonb,
  boolean,
  integer,
} from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const resumesTable = pgTable('resumes', {
  id: serial('id').primaryKey(),
  userId: serial('user_id')
    .references(() => usersTable.id)
    .notNull(),

  // Document metadata
  documentType: varchar('document_type', { length: 10 })
    .notNull()
    .default('RESUME'), // 'RESUME' | 'CV'
  templateId: varchar('template_id', { length: 50 })
    .notNull()
    .default('professional'), // 'professional' | 'modern' | 'creative'

  // Personal details / header
  fullName: varchar('full_name', { length: 255 }),
  title: varchar('title', { length: 255 }).notNull(),
  summary: text('summary'),
  contactEmail: varchar('contact_email', { length: 255 }),
  contactPhone: varchar('contact_phone', { length: 50 }),
  location: varchar('location', { length: 255 }),

  // Portfolio & social links
  linkedinUrl: varchar('linkedin_url', { length: 500 }),
  githubUrl: varchar('github_url', { length: 500 }),
  portfolioUrl: varchar('portfolio_url', { length: 500 }),
  websiteUrl: varchar('website_url', { length: 500 }),
  dribbbleUrl: varchar('dribbble_url', { length: 500 }),

  themeConfig: jsonb('theme_config'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const experiencesTable = pgTable('experiences', {
  id: serial('id').primaryKey(),
  resumeId: serial('resume_id')
    .references(() => resumesTable.id)
    .notNull(),
  jobTitle: varchar('job_title', { length: 255 }).notNull(),
  company: varchar('company', { length: 255 }).notNull(),
  location: varchar('location', { length: 255 }),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  description: text('description'),
  bulletPoints: jsonb('bullet_points').$type<string[]>(), // action-driven accomplishments
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const skillsTable = pgTable('skills', {
  id: serial('id').primaryKey(),
  resumeId: serial('resume_id')
    .references(() => resumesTable.id)
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  level: varchar('level', { length: 50 }),
  category: varchar('category', { length: 20 }).default('hard'), // 'hard' | 'soft'
});

export const educationTable = pgTable('education', {
  id: serial('id').primaryKey(),
  resumeId: serial('resume_id')
    .references(() => resumesTable.id)
    .notNull(),
  institution: varchar('institution', { length: 255 }).notNull(),
  degree: varchar('degree', { length: 255 }).notNull(),
  fieldOfStudy: varchar('field_of_study', { length: 255 }),
  graduationYear: varchar('graduation_year', { length: 10 }),
  gpa: varchar('gpa', { length: 20 }),
  honors: varchar('honors', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const certificationsTable = pgTable('certifications', {
  id: serial('id').primaryKey(),
  resumeId: serial('resume_id')
    .references(() => resumesTable.id)
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  issuer: varchar('issuer', { length: 255 }),
  date: varchar('date', { length: 50 }),
  url: varchar('url', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const projectsTable = pgTable('projects', {
  id: serial('id').primaryKey(),
  resumeId: serial('resume_id')
    .references(() => resumesTable.id)
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  url: varchar('url', { length: 500 }),
  description: text('description'),
  technologies: varchar('technologies', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const volunteerTable = pgTable('volunteer', {
  id: serial('id').primaryKey(),
  resumeId: serial('resume_id')
    .references(() => resumesTable.id)
    .notNull(),
  role: varchar('role', { length: 255 }).notNull(),
  organization: varchar('organization', { length: 255 }).notNull(),
  startDate: varchar('start_date', { length: 50 }),
  endDate: varchar('end_date', { length: 50 }),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const publicationsTable = pgTable('publications', {
  id: serial('id').primaryKey(),
  resumeId: serial('resume_id')
    .references(() => resumesTable.id)
    .notNull(),
  title: varchar('title', { length: 500 }).notNull(),
  publisher: varchar('publisher', { length: 255 }),
  date: varchar('date', { length: 50 }),
  url: varchar('url', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const languagesTable = pgTable('languages', {
  id: serial('id').primaryKey(),
  resumeId: serial('resume_id')
    .references(() => resumesTable.id)
    .notNull(),
  language: varchar('language', { length: 100 }).notNull(),
  fluency: varchar('fluency', { length: 50 }), // e.g. 'Native', 'Fluent', 'Intermediate', 'Basic'
});

export const referencesTable = pgTable('references', {
  id: serial('id').primaryKey(),
  resumeId: serial('resume_id')
    .references(() => resumesTable.id)
    .notNull(),
  name: varchar('name', { length: 255 }),
  company: varchar('company', { length: 255 }),
  contactInfo: varchar('contact_info', { length: 500 }),
  availableUponRequest: boolean('available_upon_request').default(true),
});

export const customSectionsTable = pgTable('custom_sections', {
  id: serial('id').primaryKey(),
  resumeId: serial('resume_id')
    .references(() => resumesTable.id)
    .notNull(),
  sectionTitle: varchar('section_title', { length: 255 }).notNull(),
  content: text('content'),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
