import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../db/database.service';
import { resumesTable, experiencesTable, skillsTable } from '../db/schema';
import { CreateResumeDto } from './dto/create-resume.dto';
import { eq, and } from 'drizzle-orm';

@Injectable()
export class ResumeService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createResumeDto: CreateResumeDto, userId: number = 1) {
    const { title, summary, contactEmail, contactPhone, experiences, skills } = createResumeDto;
    
    return await this.databaseService.db.transaction(async (tx) => {
      // 1. Insert Resume
      const [insertedResume] = await tx.insert(resumesTable).values({
        userId,
        title,
        summary,
        contactEmail,
        contactPhone,
      }).returning();

      // 2. Insert Experiences
      if (experiences && experiences.length > 0) {
        await tx.insert(experiencesTable).values(
          experiences.map(exp => ({
            resumeId: insertedResume.id,
            jobTitle: exp.jobTitle,
            company: exp.company,
            startDate: exp.startDate ? new Date(exp.startDate) : null,
            endDate: exp.endDate ? new Date(exp.endDate) : null,
            description: exp.description,
          }))
        );
      }

      // 3. Insert Skills
      if (skills && skills.length > 0) {
        await tx.insert(skillsTable).values(
          skills.map(skill => ({
            resumeId: insertedResume.id,
            name: skill.name,
            level: skill.level,
          }))
        );
      }

      return insertedResume;
    });
  }

  async findAll(userId: number = 1) {
    return this.databaseService.db.select().from(resumesTable).where(eq(resumesTable.userId, userId));
  }

  async findOne(id: number, userId: number = 1) {
    const [resume] = await this.databaseService.db.select().from(resumesTable)
      .where(and(eq(resumesTable.id, id), eq(resumesTable.userId, userId)));
    
    if (!resume) {
      throw new NotFoundException(`Resume with ID ${id} not found`);
    }

    const experiences = await this.databaseService.db.select().from(experiencesTable).where(eq(experiencesTable.resumeId, id));
    const skills = await this.databaseService.db.select().from(skillsTable).where(eq(skillsTable.resumeId, id));

    return {
      ...resume,
      experiences,
      skills,
    };
  }
}
