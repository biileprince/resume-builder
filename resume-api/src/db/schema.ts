import { pgTable, serial, varchar, text, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const resumesTable = pgTable('resumes', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').references(() => usersTable.id).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  summary: text('summary'),
  contactEmail: varchar('contact_email', { length: 255 }),
  contactPhone: varchar('contact_phone', { length: 50 }),
  themeConfig: jsonb('theme_config'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const experiencesTable = pgTable('experiences', {
  id: serial('id').primaryKey(),
  resumeId: serial('resume_id').references(() => resumesTable.id).notNull(),
  jobTitle: varchar('job_title', { length: 255 }).notNull(),
  company: varchar('company', { length: 255 }).notNull(),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  description: text('description'), // or bullet points as jsonb
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const skillsTable = pgTable('skills', {
  id: serial('id').primaryKey(),
  resumeId: serial('resume_id').references(() => resumesTable.id).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  level: varchar('level', { length: 50 }),
});
