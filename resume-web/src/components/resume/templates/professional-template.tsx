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

export function ProfessionalTemplate({ data }: Props) {
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

  return (
    <>
      {/* Header */}
      <header className="border-b-2 border-slate-800 pb-5 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-1">
          {fullName || title || "Your Name"}
        </h1>
        {fullName && title && (
          <p className="text-lg text-slate-600 mb-2">{title}</p>
        )}
        <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
          {contactEmail && <span>{contactEmail}</span>}
          {contactPhone && <span>{contactPhone}</span>}
          {location && <span>{location}</span>}
        </div>
        {linkItems.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-2">
            {linkItems.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:underline"
              >
                {link.icon} {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-8">
          <p className="text-slate-700 leading-relaxed text-[15px]">
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experiences &&
        experiences.length > 0 &&
        experiences.some((e) => e.jobTitle) && (
          <section className="mb-8">
            <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-2 mb-6">
              Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp, idx) => (
                <div key={idx} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-[17px] text-slate-800">
                      {exp.jobTitle || "Role"}
                    </h3>
                    <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                      {exp.startDate || "Start"} — {exp.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-[15px] font-semibold text-slate-600 mb-2">
                    {exp.company || "Company"}
                    {exp.location ? `, ${exp.location}` : ""}
                  </div>
                  {exp.description && (
                    <ul className="list-disc list-outside ml-5 space-y-1">
                      {exp.description
                        .split("\n")
                        .filter(Boolean)
                        .map((line, i) => (
                          <li
                            key={i}
                            className="text-[14px] text-slate-700 leading-relaxed"
                          >
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
            <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-2 mb-6">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu, idx) => (
                <div key={idx} className="break-inside-avoid">
                  <h3 className="font-bold text-[16px] text-slate-800">
                    {edu.degree}
                    {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                  </h3>
                  <div className="text-[15px] text-slate-600">
                    {edu.institution}
                    {edu.graduationYear ? ` — ${edu.graduationYear}` : ""}
                  </div>
                  {edu.gpa && (
                    <div className="text-[13px] text-slate-500">
                      GPA: {edu.gpa}
                    </div>
                  )}
                  {edu.honors && (
                    <div className="text-[13px] text-slate-500">
                      {edu.honors}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

      {/* Skills */}
      {skills && skills.length > 0 && skills.some((s) => s.name) && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-2 mb-6">
            Skills
          </h2>
          {hardSkills.length > 0 && (
            <div className="mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-2">
                Technical:
              </span>
              <span className="text-[14px] text-slate-700">
                {hardSkills
                  .map((s) => `${s.name}${s.level ? ` (${s.level})` : ""}`)
                  .join(", ")}
              </span>
            </div>
          )}
          {softSkills.length > 0 && (
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-2">
                Interpersonal:
              </span>
              <span className="text-[14px] text-slate-700">
                {softSkills
                  .map((s) => `${s.name}${s.level ? ` (${s.level})` : ""}`)
                  .join(", ")}
              </span>
            </div>
          )}
        </section>
      )}

      {/* Certifications */}
      {certifications &&
        certifications.length > 0 &&
        certifications.some((c) => c.name) && (
          <section className="mb-8">
            <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-2 mb-6">
              Certifications
            </h2>
            <div className="space-y-2">
              {certifications.map((cert, idx) => (
                <div key={idx} className="text-[14px]">
                  <span className="font-semibold text-slate-800">
                    {cert.name}
                  </span>
                  {cert.issuer && (
                    <span className="text-slate-600"> — {cert.issuer}</span>
                  )}
                  {cert.date && (
                    <span className="text-slate-500"> ({cert.date})</span>
                  )}
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-blue-600 hover:underline text-xs"
                    >
                      View
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

      {/* Projects */}
      {projects && projects.length > 0 && projects.some((p) => p.name) && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-2 mb-6">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((proj, idx) => (
              <div key={idx} className="break-inside-avoid">
                <div className="flex items-baseline gap-2">
                  <h3 className="font-bold text-[15px] text-slate-800">
                    {proj.name}
                  </h3>
                  {proj.url && (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-xs"
                    >
                      {proj.url}
                    </a>
                  )}
                </div>
                {proj.description && (
                  <p className="text-[14px] text-slate-700 mt-1">
                    {proj.description}
                  </p>
                )}
                {proj.technologies && (
                  <div className="text-xs text-slate-500 mt-1">
                    Tech: {proj.technologies}
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
          <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-2 mb-6">
            Volunteer Work
          </h2>
          <div className="space-y-4">
            {volunteer.map((vol, idx) => (
              <div key={idx} className="break-inside-avoid">
                <h3 className="font-bold text-[15px] text-slate-800">
                  {vol.role} at {vol.organization}
                </h3>
                {(vol.startDate || vol.endDate) && (
                  <div className="text-xs text-slate-500">
                    {vol.startDate || ""} — {vol.endDate || "Present"}
                  </div>
                )}
                {vol.description && (
                  <p className="text-[14px] text-slate-700 mt-1">
                    {vol.description}
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
          <section className="mb-8">
            <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-2 mb-6">
              Publications
            </h2>
            <div className="space-y-2">
              {publications.map((pub, idx) => (
                <div key={idx} className="text-[14px]">
                  <span className="font-semibold text-slate-800">
                    {pub.title}
                  </span>
                  {pub.publisher && (
                    <span className="text-slate-600"> — {pub.publisher}</span>
                  )}
                  {pub.date && (
                    <span className="text-slate-500"> ({pub.date})</span>
                  )}
                  {pub.url && (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-blue-600 hover:underline text-xs"
                    >
                      Link
                    </a>
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
            <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-2 mb-6">
              Languages
            </h2>
            <div className="flex flex-wrap gap-4">
              {languages.map((lang, idx) => (
                <span key={idx} className="text-[14px] text-slate-700">
                  {lang.language}
                  {lang.fluency ? ` — ${lang.fluency}` : ""}
                </span>
              ))}
            </div>
          </section>
        )}

      {/* References */}
      {references && references.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-2 mb-6">
            References
          </h2>
          {references.map((ref, idx) => (
            <div key={idx} className="text-[14px]">
              {ref.availableUponRequest ? (
                <p className="text-slate-600 italic">Available upon request</p>
              ) : (
                <div className="mb-2">
                  <span className="font-semibold text-slate-800">
                    {ref.name}
                  </span>
                  {ref.company && (
                    <span className="text-slate-600">, {ref.company}</span>
                  )}
                  {ref.contactInfo && (
                    <span className="text-slate-500"> — {ref.contactInfo}</span>
                  )}
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
                <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-2 mb-6">
                  {cs.sectionTitle}
                </h2>
                <p className="text-[14px] text-slate-700 whitespace-pre-wrap">
                  {cs.content}
                </p>
              </section>
            ))}
          </>
        )}
    </>
  );
}
