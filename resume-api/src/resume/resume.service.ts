import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../db/database.service';
import {
  resumesTable,
  experiencesTable,
  skillsTable,
  educationTable,
  certificationsTable,
  projectsTable,
  volunteerTable,
  publicationsTable,
  languagesTable,
  referencesTable,
  customSectionsTable,
} from '../db/schema';
import { CreateResumeDto } from './dto/create-resume.dto';
import { eq, and } from 'drizzle-orm';

@Injectable()
export class ResumeService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createResumeDto: CreateResumeDto, userId: number = 1) {
    const {
      title,
      summary,
      contactEmail,
      contactPhone,
      fullName,
      location,
      documentType,
      templateId,
      linkedinUrl,
      githubUrl,
      portfolioUrl,
      websiteUrl,
      dribbbleUrl,
      experiences,
      skills,
      education,
      certifications,
      projects,
      volunteer,
      publications,
      languages,
      references,
      customSections,
    } = createResumeDto;

    return await this.databaseService.db.transaction(async (tx) => {
      // 1. Insert Resume
      const [insertedResume] = await tx
        .insert(resumesTable)
        .values({
          userId,
          documentType: documentType || 'RESUME',
          templateId: templateId || 'professional',
          fullName,
          title,
          summary,
          contactEmail,
          contactPhone,
          location,
          linkedinUrl,
          githubUrl,
          portfolioUrl,
          websiteUrl,
          dribbbleUrl,
        })
        .returning();

      const resumeId = insertedResume.id;

      // 2. Insert Experiences
      if (experiences && experiences.length > 0) {
        await tx.insert(experiencesTable).values(
          experiences.map((exp) => ({
            resumeId,
            jobTitle: exp.jobTitle,
            company: exp.company,
            location: exp.location,
            startDate: exp.startDate ? new Date(exp.startDate) : null,
            endDate: exp.endDate ? new Date(exp.endDate) : null,
            description: exp.description,
            bulletPoints: exp.bulletPoints || null,
          })),
        );
      }

      // 3. Insert Skills
      if (skills && skills.length > 0) {
        await tx.insert(skillsTable).values(
          skills.map((skill) => ({
            resumeId,
            name: skill.name,
            level: skill.level,
            category: skill.category || 'hard',
          })),
        );
      }

      // 4. Insert Education
      if (education && education.length > 0) {
        await tx.insert(educationTable).values(
          education.map((edu) => ({
            resumeId,
            institution: edu.institution,
            degree: edu.degree,
            fieldOfStudy: edu.fieldOfStudy,
            graduationYear: edu.graduationYear,
            gpa: edu.gpa,
            honors: edu.honors,
          })),
        );
      }

      // 5. Insert Certifications
      if (certifications && certifications.length > 0) {
        await tx.insert(certificationsTable).values(
          certifications.map((cert) => ({
            resumeId,
            name: cert.name,
            issuer: cert.issuer,
            date: cert.date,
            url: cert.url,
          })),
        );
      }

      // 6. Insert Projects
      if (projects && projects.length > 0) {
        await tx.insert(projectsTable).values(
          projects.map((proj) => ({
            resumeId,
            name: proj.name,
            url: proj.url,
            description: proj.description,
            technologies: proj.technologies,
          })),
        );
      }

      // 7. Insert Volunteer
      if (volunteer && volunteer.length > 0) {
        await tx.insert(volunteerTable).values(
          volunteer.map((vol) => ({
            resumeId,
            role: vol.role,
            organization: vol.organization,
            startDate: vol.startDate,
            endDate: vol.endDate,
            description: vol.description,
          })),
        );
      }

      // 8. Insert Publications
      if (publications && publications.length > 0) {
        await tx.insert(publicationsTable).values(
          publications.map((pub) => ({
            resumeId,
            title: pub.title,
            publisher: pub.publisher,
            date: pub.date,
            url: pub.url,
          })),
        );
      }

      // 9. Insert Languages
      if (languages && languages.length > 0) {
        await tx.insert(languagesTable).values(
          languages.map((lang) => ({
            resumeId,
            language: lang.language,
            fluency: lang.fluency,
          })),
        );
      }

      // 10. Insert References
      if (references && references.length > 0) {
        await tx.insert(referencesTable).values(
          references.map((ref) => ({
            resumeId,
            name: ref.name,
            company: ref.company,
            contactInfo: ref.contactInfo,
            availableUponRequest: ref.availableUponRequest ?? true,
          })),
        );
      }

      // 11. Insert Custom Sections
      if (customSections && customSections.length > 0) {
        await tx.insert(customSectionsTable).values(
          customSections.map((cs) => ({
            resumeId,
            sectionTitle: cs.sectionTitle,
            content: cs.content,
            sortOrder: cs.sortOrder ?? 0,
          })),
        );
      }

      return insertedResume;
    });
  }

  async findAll(userId: number = 1) {
    return this.databaseService.db
      .select()
      .from(resumesTable)
      .where(eq(resumesTable.userId, userId));
  }

  async findOne(id: number, userId: number = 1) {
    const [resume] = await this.databaseService.db
      .select()
      .from(resumesTable)
      .where(and(eq(resumesTable.id, id), eq(resumesTable.userId, userId)));

    if (!resume) {
      throw new NotFoundException(`Resume with ID ${id} not found`);
    }

    const [
      experiences,
      skills,
      education,
      certifications,
      projects,
      volunteer,
      publications,
      languages,
      references,
      customSections,
    ] = await Promise.all([
      this.databaseService.db
        .select()
        .from(experiencesTable)
        .where(eq(experiencesTable.resumeId, id)),
      this.databaseService.db
        .select()
        .from(skillsTable)
        .where(eq(skillsTable.resumeId, id)),
      this.databaseService.db
        .select()
        .from(educationTable)
        .where(eq(educationTable.resumeId, id)),
      this.databaseService.db
        .select()
        .from(certificationsTable)
        .where(eq(certificationsTable.resumeId, id)),
      this.databaseService.db
        .select()
        .from(projectsTable)
        .where(eq(projectsTable.resumeId, id)),
      this.databaseService.db
        .select()
        .from(volunteerTable)
        .where(eq(volunteerTable.resumeId, id)),
      this.databaseService.db
        .select()
        .from(publicationsTable)
        .where(eq(publicationsTable.resumeId, id)),
      this.databaseService.db
        .select()
        .from(languagesTable)
        .where(eq(languagesTable.resumeId, id)),
      this.databaseService.db
        .select()
        .from(referencesTable)
        .where(eq(referencesTable.resumeId, id)),
      this.databaseService.db
        .select()
        .from(customSectionsTable)
        .where(eq(customSectionsTable.resumeId, id)),
    ]);

    return {
      ...resume,
      experiences,
      skills,
      education,
      certifications,
      projects,
      volunteer,
      publications,
      languages,
      references,
      customSections,
    };
  }
}
