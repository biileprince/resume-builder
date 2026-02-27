import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { PdfService } from '../pdf/pdf.service';

@Controller('resumes')
export class ResumeController {
  constructor(
    private readonly resumeService: ResumeService,
    private readonly pdfService: PdfService,
  ) {}

  @Post()
  create(@Body() createResumeDto: CreateResumeDto) {
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
    const html = this.buildResumeHtml(resume);
    const pdfBuffer = await this.pdfService.generatePdf(html);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="resume-${resume.id}.pdf"`,
      'Content-Length': pdfBuffer.length,
    });

    res.end(pdfBuffer);
  }

  private buildResumeHtml(resume: any): string {
    const linksHtml = [
      resume.linkedinUrl &&
        `<a href="${resume.linkedinUrl}" style="color:#2563EB;text-decoration:none;">LinkedIn</a>`,
      resume.githubUrl &&
        `<a href="${resume.githubUrl}" style="color:#2563EB;text-decoration:none;">GitHub</a>`,
      resume.portfolioUrl &&
        `<a href="${resume.portfolioUrl}" style="color:#2563EB;text-decoration:none;">Portfolio</a>`,
      resume.websiteUrl &&
        `<a href="${resume.websiteUrl}" style="color:#2563EB;text-decoration:none;">Website</a>`,
      resume.dribbbleUrl &&
        `<a href="${resume.dribbbleUrl}" style="color:#2563EB;text-decoration:none;">Dribbble</a>`,
    ]
      .filter(Boolean)
      .join(' &middot; ');

    const contactParts = [
      resume.contactEmail,
      resume.contactPhone,
      resume.location,
    ]
      .filter(Boolean)
      .join(' | ');

    const expHtml = (resume.experiences || [])
      .map(
        (exp: any) => `
      <div style="margin-bottom:16px;page-break-inside:avoid;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;">
          <strong style="font-size:15px;">${exp.jobTitle}</strong>
          <span style="font-size:13px;color:#6B7280;">${exp.startDate ? new Date(exp.startDate).toISOString().slice(0, 7) : ''} — ${exp.endDate ? new Date(exp.endDate).toISOString().slice(0, 7) : 'Present'}</span>
        </div>
        <div style="font-size:14px;color:#4B5563;margin-bottom:6px;">${exp.company}${exp.location ? ', ' + exp.location : ''}</div>
        ${exp.description ? `<p style="font-size:14px;color:#374151;margin:4px 0;">${exp.description}</p>` : ''}
        ${exp.bulletPoints && exp.bulletPoints.length > 0 ? `<ul style="margin:4px 0 0 18px;padding:0;font-size:14px;color:#374151;">${exp.bulletPoints.map((bp: string) => `<li style="margin-bottom:3px;">${bp}</li>`).join('')}</ul>` : ''}
      </div>
    `,
      )
      .join('');

    const eduHtml = (resume.education || [])
      .map(
        (edu: any) => `
      <div style="margin-bottom:12px;page-break-inside:avoid;">
        <strong style="font-size:15px;">${edu.degree}${edu.fieldOfStudy ? ' in ' + edu.fieldOfStudy : ''}</strong>
        <div style="font-size:14px;color:#4B5563;">${edu.institution}${edu.graduationYear ? ' — ' + edu.graduationYear : ''}</div>
        ${edu.gpa ? `<div style="font-size:13px;color:#6B7280;">GPA: ${edu.gpa}</div>` : ''}
        ${edu.honors ? `<div style="font-size:13px;color:#6B7280;">${edu.honors}</div>` : ''}
      </div>
    `,
      )
      .join('');

    const hardSkills = (resume.skills || []).filter(
      (s: any) => s.category !== 'soft',
    );
    const softSkills = (resume.skills || []).filter(
      (s: any) => s.category === 'soft',
    );
    const skillsHtml = [
      hardSkills.length > 0
        ? `<div style="margin-bottom:8px;"><strong style="font-size:13px;color:#6B7280;">Technical:</strong> <span style="font-size:14px;">${hardSkills.map((s: any) => s.name + (s.level ? ` (${s.level})` : '')).join(', ')}</span></div>`
        : '',
      softSkills.length > 0
        ? `<div><strong style="font-size:13px;color:#6B7280;">Interpersonal:</strong> <span style="font-size:14px;">${softSkills.map((s: any) => s.name + (s.level ? ` (${s.level})` : '')).join(', ')}</span></div>`
        : '',
    ].join('');

    const certHtml = (resume.certifications || [])
      .map(
        (c: any) => `
      <div style="margin-bottom:8px;">
        <strong>${c.name}</strong>${c.issuer ? ` — ${c.issuer}` : ''}${c.date ? ` (${c.date})` : ''}
        ${c.url ? ` <a href="${c.url}" style="color:#2563EB;font-size:13px;">View</a>` : ''}
      </div>
    `,
      )
      .join('');

    const projHtml = (resume.projects || [])
      .map(
        (p: any) => `
      <div style="margin-bottom:12px;">
        <strong>${p.name}</strong>${p.url ? ` — <a href="${p.url}" style="color:#2563EB;font-size:13px;">${p.url}</a>` : ''}
        ${p.description ? `<p style="font-size:14px;color:#374151;margin:4px 0;">${p.description}</p>` : ''}
        ${p.technologies ? `<div style="font-size:13px;color:#6B7280;">Tech: ${p.technologies}</div>` : ''}
      </div>
    `,
      )
      .join('');

    const volHtml = (resume.volunteer || [])
      .map(
        (v: any) => `
      <div style="margin-bottom:12px;">
        <strong>${v.role}</strong> at ${v.organization}
        ${v.startDate || v.endDate ? `<span style="font-size:13px;color:#6B7280;"> (${v.startDate || ''} — ${v.endDate || 'Present'})</span>` : ''}
        ${v.description ? `<p style="font-size:14px;color:#374151;margin:4px 0;">${v.description}</p>` : ''}
      </div>
    `,
      )
      .join('');

    const pubHtml = (resume.publications || [])
      .map(
        (p: any) => `
      <div style="margin-bottom:8px;">
        <strong>${p.title}</strong>${p.publisher ? ` — ${p.publisher}` : ''}${p.date ? ` (${p.date})` : ''}
        ${p.url ? ` <a href="${p.url}" style="color:#2563EB;font-size:13px;">Link</a>` : ''}
      </div>
    `,
      )
      .join('');

    const langHtml = (resume.languages || [])
      .map(
        (l: any) =>
          `<span style="margin-right:16px;">${l.language}${l.fluency ? ` — ${l.fluency}` : ''}</span>`,
      )
      .join('');

    const refHtml = (resume.references || [])
      .map((r: any) => {
        if (r.availableUponRequest)
          return '<p style="font-size:14px;color:#6B7280;font-style:italic;">Available upon request</p>';
        return `<div style="margin-bottom:8px;"><strong>${r.name || ''}</strong>${r.company ? `, ${r.company}` : ''}${r.contactInfo ? ` — ${r.contactInfo}` : ''}</div>`;
      })
      .join('');

    const customHtml = (resume.customSections || [])
      .map(
        (cs: any) => `
      <div class="section">
        <h2>${cs.sectionTitle}</h2>
        <p style="font-size:14px;color:#374151;white-space:pre-wrap;">${cs.content || ''}</p>
      </div>
    `,
      )
      .join('');

    const sectionStyle = `style="margin-top:24px;"`;
    const h2Style = `style="font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#1E293B;border-bottom:2px solid #E2E8F0;padding-bottom:6px;margin-bottom:14px;"`;

    return `
      <html>
        <head>
          <style>
            * { box-sizing: border-box; }
            body { font-family: 'Inter', 'Segoe UI', sans-serif; padding: 48px 56px; color: #1E293B; line-height: 1.5; max-width: 816px; margin: 0 auto; }
            a { color: #2563EB; text-decoration: none; }
            .section { margin-top: 24px; }
            .section h2 { font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #1E293B; border-bottom: 2px solid #E2E8F0; padding-bottom: 6px; margin-bottom: 14px; }
          </style>
        </head>
        <body>
          <header style="border-bottom:3px solid #1E293B;padding-bottom:18px;margin-bottom:8px;">
            <h1 style="font-size:32px;font-weight:800;margin:0 0 4px 0;color:#0F172A;">${resume.fullName || resume.title}</h1>
            ${resume.fullName ? `<div style="font-size:16px;color:#475569;margin-bottom:6px;">${resume.title}</div>` : ''}
            ${contactParts ? `<div style="font-size:13px;color:#64748B;">${contactParts}</div>` : ''}
            ${linksHtml ? `<div style="font-size:13px;margin-top:4px;">${linksHtml}</div>` : ''}
          </header>

          ${resume.summary ? `<section ${sectionStyle}><p style="font-size:14px;color:#475569;line-height:1.6;">${resume.summary}</p></section>` : ''}

          ${expHtml ? `<div class="section"><h2 ${h2Style}>Experience</h2>${expHtml}</div>` : ''}
          ${eduHtml ? `<div class="section"><h2 ${h2Style}>Education</h2>${eduHtml}</div>` : ''}
          ${skillsHtml ? `<div class="section"><h2 ${h2Style}>Skills</h2>${skillsHtml}</div>` : ''}
          ${certHtml ? `<div class="section"><h2 ${h2Style}>Certifications</h2>${certHtml}</div>` : ''}
          ${projHtml ? `<div class="section"><h2 ${h2Style}>Projects</h2>${projHtml}</div>` : ''}
          ${volHtml ? `<div class="section"><h2 ${h2Style}>Volunteer Work</h2>${volHtml}</div>` : ''}
          ${pubHtml ? `<div class="section"><h2 ${h2Style}>Publications</h2>${pubHtml}</div>` : ''}
          ${langHtml ? `<div class="section"><h2 ${h2Style}>Languages</h2><div style="font-size:14px;">${langHtml}</div></div>` : ''}
          ${refHtml ? `<div class="section"><h2 ${h2Style}>References</h2>${refHtml}</div>` : ''}
          ${customHtml}
        </body>
      </html>
    `;
  }
}
