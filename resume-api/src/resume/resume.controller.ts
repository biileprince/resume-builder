import { Controller, Get, Post, Body, Param, ParseIntPipe, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { PdfService } from '../pdf/pdf.service';

@Controller('resumes')
export class ResumeController {
  constructor(
    private readonly resumeService: ResumeService,
    private readonly pdfService: PdfService
  ) {}

  @Post()
  create(@Body() createResumeDto: CreateResumeDto) {
    // Note: userId is defaulting to 1 in the service for now
    return this.resumeService.create(createResumeDto);
  }

  @Get()
  findAll() {
    return this.resumeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.resumeService.findOne(id);
  }

  @Get(':id/export')
  async exportPdf(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const resume = await this.resumeService.findOne(id);
    
    // Simplistic HTML generation for demonstration purposes
    const expHtml = resume.experiences.map(exp => `
      <div>
        <h3>${exp.jobTitle} at ${exp.company}</h3>
        <p>${exp.startDate ? exp.startDate.toISOString().split('T')[0] : ''} - ${exp.endDate ? exp.endDate.toISOString().split('T')[0] : 'Present'}</p>
        <p>${exp.description || ''}</p>
      </div>
    `).join('');

    const html = `
      <html>
        <head>
          <style>
            body { font-family: sans-serif; padding: 40px; }
            h1 { color: #333; }
            .section { margin-top: 20px; }
          </style>
        </head>
        <body>
          <h1>${resume.title}</h1>
          <p>${resume.summary || ''}</p>
          <p>Email: ${resume.contactEmail || ''} | Phone: ${resume.contactPhone || ''}</p>
          <div class="section">
            <h2>Experience</h2>
            ${expHtml}
          </div>
        </body>
      </html>
    `;

    const pdfBuffer = await this.pdfService.generatePdf(html);
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="resume-${resume.id}.pdf"`,
      'Content-Length': pdfBuffer.length,
    });
    
    res.end(pdfBuffer);
  }
}
