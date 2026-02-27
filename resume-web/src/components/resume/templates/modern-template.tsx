"use client";

import * as React from "react";
import { ResumeFormValues } from "@/lib/validations/resume";
import {
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaDribbble,
  FaLink,
} from "react-icons/fa";

interface Props {
  data: Partial<ResumeFormValues>;
}

/**
 * Modern Template: Two-column layout with a left accent sidebar
 * Left column: contact info, skills, languages, links
 * Right column: summary, experience, education, etc.
 */
export function ModernTemplate({ data }: Props) {
  const {
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
  } = data;

  const hardSkills = (skills || []).filter((s) => s.category !== "soft");
  const softSkills = (skills || []).filter((s) => s.category === "soft");

  const linkItems = [
    linkedinUrl && {
      icon: <FaLinkedin className="w-3 h-3" />,
      url: linkedinUrl,
      label: "LinkedIn",
    },
    githubUrl && {
      icon: <FaGithub className="w-3 h-3" />,
      url: githubUrl,
      label: "GitHub",
    },
    portfolioUrl && {
      icon: <FaLink className="w-3 h-3" />,
      url: portfolioUrl,
      label: "Portfolio",
    },
    websiteUrl && {
      icon: <FaGlobe className="w-3 h-3" />,
      url: websiteUrl,
      label: "Website",
    },
    dribbbleUrl && {
      icon: <FaDribbble className="w-3 h-3" />,
      url: dribbbleUrl,
      label: "Dribbble",
    },
  ].filter(Boolean) as { icon: React.ReactNode; url: string; label: string }[];

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-sm font-bold uppercase tracking-[3px] text-slate-800 mb-4 pb-1 border-b-2 border-blue-500">
      {children}
    </h2>
  );

  const SidebarSection = ({
    title: sTitle,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="mb-6">
      <h3 className="text-xs font-bold uppercase tracking-[3px] text-slate-200 mb-3">
        {sTitle}
      </h3>
      {children}
    </div>
  );

  return (
    <div className="grid grid-cols-[220px_1fr] min-h-[1056px]">
      {/* ── Left Sidebar ─────────────────────────────────────── */}
      <div className="bg-slate-800 text-white p-6 space-y-1">
        {/* Name */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold leading-tight">
            {fullName || title || "Your Name"}
          </h1>
          {fullName && title && (
            <p className="text-sm text-blue-300 mt-1">{title}</p>
          )}
        </div>

        {/* Contact */}
        <SidebarSection title="Contact">
          <div className="space-y-2 text-xs text-slate-300">
            {contactEmail && <div>{contactEmail}</div>}
            {contactPhone && <div>{contactPhone}</div>}
            {location && <div>{location}</div>}
          </div>
        </SidebarSection>

        {/* Links */}
        {linkItems.length > 0 && (
          <SidebarSection title="Links">
            <div className="space-y-2">
              {linkItems.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-blue-300 hover:text-blue-200"
                >
                  {link.icon} {link.label}
                </a>
              ))}
            </div>
          </SidebarSection>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && skills.some((s) => s.name) && (
          <SidebarSection title="Skills">
            <div className="space-y-1.5">
              {hardSkills.map((s, i) => (
                <div key={i} className="text-xs">
                  <span className="text-slate-200">{s.name}</span>
                  {s.level && (
                    <span className="text-slate-400 ml-1">· {s.level}</span>
                  )}
                </div>
              ))}
              {softSkills.length > 0 && (
                <div className="mt-3 pt-2 border-t border-slate-600">
                  <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">
                    Soft Skills
                  </div>
                  {softSkills.map((s, i) => (
                    <div key={i} className="text-xs text-slate-200">
                      {s.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </SidebarSection>
        )}

        {/* Languages */}
        {languages &&
          languages.length > 0 &&
          languages.some((l) => l.language) && (
            <SidebarSection title="Languages">
              <div className="space-y-1.5">
                {languages.map((l, i) => (
                  <div key={i} className="text-xs">
                    <span className="text-slate-200">{l.language}</span>
                    {l.fluency && (
                      <span className="text-slate-400 ml-1">· {l.fluency}</span>
                    )}
                  </div>
                ))}
              </div>
            </SidebarSection>
          )}
      </div>

      {/* ── Right Content ────────────────────────────────────── */}
      <div className="p-8 space-y-6">
        {/* Summary */}
        {summary && (
          <section>
            <SectionTitle>Profile</SectionTitle>
            <p className="text-[14px] text-slate-700 leading-relaxed">
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experiences &&
          experiences.length > 0 &&
          experiences.some((e) => e.jobTitle) && (
            <section>
              <SectionTitle>Experience</SectionTitle>
              <div className="space-y-5">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="break-inside-avoid">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-[15px] text-slate-800">
                        {exp.jobTitle}
                      </h3>
                      <span className="text-xs text-slate-500">
                        {exp.startDate} — {exp.endDate || "Present"}
                      </span>
                    </div>
                    <div className="text-[13px] font-medium text-blue-600 mb-1">
                      {exp.company}
                      {exp.location ? `, ${exp.location}` : ""}
                    </div>
                    {exp.description && (
                      <ul className="list-disc list-outside ml-4 space-y-0.5">
                        {exp.description
                          .split("\n")
                          .filter(Boolean)
                          .map((line, i) => (
                            <li key={i} className="text-[13px] text-slate-700">
                              {line}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

        {/* Education */}
        {education &&
          education.length > 0 &&
          education.some((e) => e.institution) && (
            <section>
              <SectionTitle>Education</SectionTitle>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={idx}>
                    <h3 className="font-bold text-[14px] text-slate-800">
                      {edu.degree}
                      {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                    </h3>
                    <div className="text-[13px] text-slate-600">
                      {edu.institution}
                      {edu.graduationYear ? ` — ${edu.graduationYear}` : ""}
                    </div>
                    {edu.gpa && (
                      <div className="text-[12px] text-slate-500">
                        GPA: {edu.gpa}
                      </div>
                    )}
                    {edu.honors && (
                      <div className="text-[12px] text-slate-500">
                        {edu.honors}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

        {/* Certifications */}
        {certifications &&
          certifications.length > 0 &&
          certifications.some((c) => c.name) && (
            <section>
              <SectionTitle>Certifications</SectionTitle>
              <div className="space-y-1.5">
                {certifications.map((c, idx) => (
                  <div key={idx} className="text-[13px]">
                    <span className="font-semibold">{c.name}</span>
                    {c.issuer && (
                      <span className="text-slate-600"> — {c.issuer}</span>
                    )}
                    {c.date && (
                      <span className="text-slate-500"> ({c.date})</span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

        {/* Projects */}
        {projects && projects.length > 0 && projects.some((p) => p.name) && (
          <section>
            <SectionTitle>Projects</SectionTitle>
            <div className="space-y-3">
              {projects.map((p, idx) => (
                <div key={idx}>
                  <h3 className="font-bold text-[14px] text-slate-800">
                    {p.name}
                  </h3>
                  {p.description && (
                    <p className="text-[13px] text-slate-700">
                      {p.description}
                    </p>
                  )}
                  {p.technologies && (
                    <div className="text-[12px] text-slate-500">
                      Tech: {p.technologies}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Volunteer */}
        {volunteer && volunteer.length > 0 && volunteer.some((v) => v.role) && (
          <section>
            <SectionTitle>Volunteer Work</SectionTitle>
            <div className="space-y-3">
              {volunteer.map((v, idx) => (
                <div key={idx}>
                  <h3 className="font-bold text-[14px] text-slate-800">
                    {v.role} — {v.organization}
                  </h3>
                  {v.description && (
                    <p className="text-[13px] text-slate-700">
                      {v.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Publications */}
        {publications &&
          publications.length > 0 &&
          publications.some((p) => p.title) && (
            <section>
              <SectionTitle>Publications</SectionTitle>
              <div className="space-y-1.5">
                {publications.map((p, idx) => (
                  <div key={idx} className="text-[13px]">
                    <span className="font-semibold">{p.title}</span>
                    {p.publisher && (
                      <span className="text-slate-600"> — {p.publisher}</span>
                    )}
                    {p.date && (
                      <span className="text-slate-500"> ({p.date})</span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

        {/* References */}
        {references && references.length > 0 && (
          <section>
            <SectionTitle>References</SectionTitle>
            {references.map((r, idx) => (
              <div key={idx} className="text-[13px]">
                {r.availableUponRequest ? (
                  <p className="text-slate-500 italic">
                    Available upon request
                  </p>
                ) : (
                  <div>
                    <span className="font-semibold">{r.name}</span>
                    {r.company && `, ${r.company}`}
                    {r.contactInfo && ` — ${r.contactInfo}`}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Custom Sections */}
        {customSections &&
          customSections.length > 0 &&
          customSections.some((cs) => cs.sectionTitle) && (
            <>
              {customSections.map((cs, idx) => (
                <section key={idx}>
                  <SectionTitle>{cs.sectionTitle}</SectionTitle>
                  <p className="text-[13px] text-slate-700 whitespace-pre-wrap">
                    {cs.content}
                  </p>
                </section>
              ))}
            </>
          )}
      </div>
    </div>
  );
}
