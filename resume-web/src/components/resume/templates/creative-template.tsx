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
 * Creative Template: Bold header with gradient accent, vibrant section dividers,
 * uses a full-width layout with signature color pops.
 */
export function CreativeTemplate({ data }: Props) {
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
      icon: <FaLinkedin className="w-3.5 h-3.5" />,
      url: linkedinUrl,
      label: "LinkedIn",
    },
    githubUrl && {
      icon: <FaGithub className="w-3.5 h-3.5" />,
      url: githubUrl,
      label: "GitHub",
    },
    portfolioUrl && {
      icon: <FaLink className="w-3.5 h-3.5" />,
      url: portfolioUrl,
      label: "Portfolio",
    },
    websiteUrl && {
      icon: <FaGlobe className="w-3.5 h-3.5" />,
      url: websiteUrl,
      label: "Website",
    },
    dribbbleUrl && {
      icon: <FaDribbble className="w-3.5 h-3.5" />,
      url: dribbbleUrl,
      label: "Dribbble",
    },
  ].filter(Boolean) as { icon: React.ReactNode; url: string; label: string }[];

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="mb-5 flex items-center gap-3">
      <div className="w-8 h-1 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
      <h2 className="text-base font-extrabold uppercase tracking-[4px] text-slate-800">
        {children}
      </h2>
    </div>
  );

  return (
    <>
      {/* ── Bold Creative Header ──────────────────────────────── */}
      <header className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white rounded-xl p-8 mb-8 -mx-2">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-1">
          {fullName || title || "Your Name"}
        </h1>
        {fullName && title && (
          <p className="text-lg font-medium text-white/80 mb-3">{title}</p>
        )}
        <div className="flex flex-wrap gap-4 text-sm text-white/70">
          {contactEmail && <span>{contactEmail}</span>}
          {contactPhone && <span>{contactPhone}</span>}
          {location && <span>{location}</span>}
        </div>
        {linkItems.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-3">
            {linkItems.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-white/90 hover:text-white bg-white/15 px-2.5 py-1 rounded-full"
              >
                {link.icon} {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-8 bg-slate-50 rounded-lg p-5 border-l-4 border-violet-500">
          <p className="text-[15px] text-slate-700 leading-relaxed italic">
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experiences &&
        experiences.length > 0 &&
        experiences.some((e) => e.jobTitle) && (
          <section className="mb-8">
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-6 relative">
              <div className="absolute left-[3px] top-2 bottom-2 w-px bg-gradient-to-b from-violet-400 to-fuchsia-300" />
              {experiences.map((exp, idx) => (
                <div key={idx} className="pl-6 relative break-inside-avoid">
                  <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-violet-500" />
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-[16px] text-slate-800">
                      {exp.jobTitle}
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">
                      {exp.startDate} — {exp.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-[14px] font-semibold text-violet-600 mb-1">
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
          <section className="mb-8">
            <SectionTitle>Education</SectionTitle>
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div key={idx} className="bg-slate-50 rounded-lg p-4">
                  <h3 className="font-bold text-[15px] text-slate-800">
                    {edu.degree}
                    {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                  </h3>
                  <div className="text-[14px] text-slate-600">
                    {edu.institution}
                    {edu.graduationYear ? ` — ${edu.graduationYear}` : ""}
                  </div>
                  {edu.gpa && (
                    <div className="text-[12px] text-slate-500 mt-1">
                      GPA: {edu.gpa}
                    </div>
                  )}
                  {edu.honors && (
                    <span className="inline-block mt-1 text-[11px] bg-violet-100 text-violet-700 font-medium px-2 py-0.5 rounded-full">
                      {edu.honors}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

      {/* Skills */}
      {skills && skills.length > 0 && skills.some((s) => s.name) && (
        <section className="mb-8">
          <SectionTitle>Skills</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {hardSkills.map((s, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 bg-violet-100 text-violet-800 text-xs font-semibold px-3 py-1.5 rounded-full"
              >
                {s.name}
                {s.level && (
                  <span className="text-violet-500 text-[10px]">
                    ({s.level})
                  </span>
                )}
              </span>
            ))}
            {softSkills.map((s, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 bg-fuchsia-100 text-fuchsia-800 text-xs font-semibold px-3 py-1.5 rounded-full"
              >
                {s.name}
                {s.level && (
                  <span className="text-fuchsia-500 text-[10px]">
                    ({s.level})
                  </span>
                )}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications &&
        certifications.length > 0 &&
        certifications.some((c) => c.name) && (
          <section className="mb-8">
            <SectionTitle>Certifications</SectionTitle>
            <div className="space-y-2">
              {certifications.map((c, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[13px]">
                  <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" />
                  <span className="font-semibold">{c.name}</span>
                  {c.issuer && (
                    <span className="text-slate-600">— {c.issuer}</span>
                  )}
                  {c.date && <span className="text-slate-500">({c.date})</span>}
                </div>
              ))}
            </div>
          </section>
        )}

      {/* Projects */}
      {projects && projects.length > 0 && projects.some((p) => p.name) && (
        <section className="mb-8">
          <SectionTitle>Projects</SectionTitle>
          <div className="grid grid-cols-1 gap-3">
            {projects.map((p, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-lg p-4 border border-slate-100"
              >
                <h3 className="font-bold text-[14px] text-slate-800">
                  {p.name}
                </h3>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-600 text-xs hover:underline"
                  >
                    {p.url}
                  </a>
                )}
                {p.description && (
                  <p className="text-[13px] text-slate-700 mt-1">
                    {p.description}
                  </p>
                )}
                {p.technologies && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {p.technologies.split(",").map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full"
                      >
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Volunteer */}
      {volunteer && volunteer.length > 0 && volunteer.some((v) => v.role) && (
        <section className="mb-8">
          <SectionTitle>Volunteer Work</SectionTitle>
          <div className="space-y-3">
            {volunteer.map((v, idx) => (
              <div key={idx}>
                <h3 className="font-bold text-[14px] text-slate-800">
                  {v.role} — {v.organization}
                </h3>
                {v.description && (
                  <p className="text-[13px] text-slate-700">{v.description}</p>
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
          <section className="mb-8">
            <SectionTitle>Publications</SectionTitle>
            <div className="space-y-1.5">
              {publications.map((p, idx) => (
                <div key={idx} className="text-[13px]">
                  <span className="font-semibold">{p.title}</span>
                  {p.publisher && (
                    <span className="text-slate-600"> — {p.publisher}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

      {/* Languages */}
      {languages &&
        languages.length > 0 &&
        languages.some((l) => l.language) && (
          <section className="mb-8">
            <SectionTitle>Languages</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {languages.map((l, i) => (
                <span
                  key={i}
                  className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  {l.language}
                  {l.fluency ? ` — ${l.fluency}` : ""}
                </span>
              ))}
            </div>
          </section>
        )}

      {/* References */}
      {references && references.length > 0 && (
        <section className="mb-8">
          <SectionTitle>References</SectionTitle>
          {references.map((r, idx) => (
            <div key={idx} className="text-[13px]">
              {r.availableUponRequest ? (
                <p className="text-slate-500 italic">Available upon request</p>
              ) : (
                <div>
                  <span className="font-semibold">{r.name}</span>
                  {r.company && `, ${r.company}`}
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
              <section key={idx} className="mb-8">
                <SectionTitle>{cs.sectionTitle}</SectionTitle>
                <p className="text-[13px] text-slate-700 whitespace-pre-wrap">
                  {cs.content}
                </p>
              </section>
            ))}
          </>
        )}
    </>
  );
}
