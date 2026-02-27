CREATE TABLE "certifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"resume_id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"issuer" varchar(255),
	"date" varchar(50),
	"url" varchar(500),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "custom_sections" (
	"id" serial PRIMARY KEY NOT NULL,
	"resume_id" serial NOT NULL,
	"section_title" varchar(255) NOT NULL,
	"content" text,
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "education" (
	"id" serial PRIMARY KEY NOT NULL,
	"resume_id" serial NOT NULL,
	"institution" varchar(255) NOT NULL,
	"degree" varchar(255) NOT NULL,
	"field_of_study" varchar(255),
	"graduation_year" varchar(10),
	"gpa" varchar(20),
	"honors" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "experiences" (
	"id" serial PRIMARY KEY NOT NULL,
	"resume_id" serial NOT NULL,
	"job_title" varchar(255) NOT NULL,
	"company" varchar(255) NOT NULL,
	"location" varchar(255),
	"start_date" timestamp,
	"end_date" timestamp,
	"description" text,
	"bullet_points" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "languages" (
	"id" serial PRIMARY KEY NOT NULL,
	"resume_id" serial NOT NULL,
	"language" varchar(100) NOT NULL,
	"fluency" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"resume_id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"url" varchar(500),
	"description" text,
	"technologies" varchar(500),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "publications" (
	"id" serial PRIMARY KEY NOT NULL,
	"resume_id" serial NOT NULL,
	"title" varchar(500) NOT NULL,
	"publisher" varchar(255),
	"date" varchar(50),
	"url" varchar(500),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "references" (
	"id" serial PRIMARY KEY NOT NULL,
	"resume_id" serial NOT NULL,
	"name" varchar(255),
	"company" varchar(255),
	"contact_info" varchar(500),
	"available_upon_request" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "resumes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"document_type" varchar(10) DEFAULT 'RESUME' NOT NULL,
	"template_id" varchar(50) DEFAULT 'professional' NOT NULL,
	"full_name" varchar(255),
	"title" varchar(255) NOT NULL,
	"summary" text,
	"contact_email" varchar(255),
	"contact_phone" varchar(50),
	"location" varchar(255),
	"linkedin_url" varchar(500),
	"github_url" varchar(500),
	"portfolio_url" varchar(500),
	"website_url" varchar(500),
	"dribbble_url" varchar(500),
	"theme_config" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"resume_id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"level" varchar(50),
	"category" varchar(20) DEFAULT 'hard'
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "volunteer" (
	"id" serial PRIMARY KEY NOT NULL,
	"resume_id" serial NOT NULL,
	"role" varchar(255) NOT NULL,
	"organization" varchar(255) NOT NULL,
	"start_date" varchar(50),
	"end_date" varchar(50),
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "certifications" ADD CONSTRAINT "certifications_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custom_sections" ADD CONSTRAINT "custom_sections_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "education" ADD CONSTRAINT "education_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "languages" ADD CONSTRAINT "languages_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "publications" ADD CONSTRAINT "publications_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "references" ADD CONSTRAINT "references_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skills" ADD CONSTRAINT "skills_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "volunteer" ADD CONSTRAINT "volunteer_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE no action ON UPDATE no action;