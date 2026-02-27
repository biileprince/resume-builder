"use client";

import * as React from "react";
import {
  useFieldArray,
  Control,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { ResumeFormValues } from "@/lib/validations/resume";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Trash2,
  ChevronDown,
  GraduationCap,
  Award,
  FolderOpen,
  Heart,
  BookOpen,
  Globe,
  Users,
  LayoutList,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ── Section Keys for the "Add Section" feature ─────────────────
type OptionalSectionKey =
  | "education"
  | "certifications"
  | "projects"
  | "volunteer"
  | "publications"
  | "languages"
  | "references"
  | "customSections";

const OPTIONAL_SECTIONS: {
  key: OptionalSectionKey;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    key: "education",
    label: "Education",
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    key: "certifications",
    label: "Certifications",
    icon: <Award className="w-4 h-4" />,
  },
  {
    key: "projects",
    label: "Projects",
    icon: <FolderOpen className="w-4 h-4" />,
  },
  {
    key: "volunteer",
    label: "Volunteer Work",
    icon: <Heart className="w-4 h-4" />,
  },
  {
    key: "publications",
    label: "Publications",
    icon: <BookOpen className="w-4 h-4" />,
  },
  { key: "languages", label: "Languages", icon: <Globe className="w-4 h-4" /> },
  {
    key: "references",
    label: "References",
    icon: <Users className="w-4 h-4" />,
  },
  {
    key: "customSections",
    label: "Custom Section",
    icon: <LayoutList className="w-4 h-4" />,
  },
];

interface ResumeFormProps {
  control: Control<ResumeFormValues>;
  register: UseFormRegister<ResumeFormValues>;
  errors: FieldErrors<ResumeFormValues>;
  isSubmitting: boolean;
  documentType: "RESUME" | "CV";
}

const CV_DEFAULT_SECTIONS: OptionalSectionKey[] = [
  "education",
  "publications",
  "references",
  "languages",
  "volunteer",
];

export function ResumeForm({
  control,
  register,
  errors,
  isSubmitting,
  documentType,
}: ResumeFormProps) {
  const [addMenuOpen, setAddMenuOpen] = React.useState(false);
  const [activeSections, setActiveSections] = React.useState<
    Set<OptionalSectionKey>
  >(new Set());

  // Core field arrays
  const {
    fields: expFields,
    append: appendExp,
    remove: removeExp,
  } = useFieldArray({ control, name: "experiences" });
  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({ control, name: "skills" });

  // Optional field arrays
  const {
    fields: eduFields,
    append: appendEdu,
    remove: removeEdu,
  } = useFieldArray({ control, name: "education" });
  const {
    fields: certFields,
    append: appendCert,
    remove: removeCert,
  } = useFieldArray({ control, name: "certifications" });
  const {
    fields: projFields,
    append: appendProj,
    remove: removeProj,
  } = useFieldArray({ control, name: "projects" });
  const {
    fields: volFields,
    append: appendVol,
    remove: removeVol,
  } = useFieldArray({ control, name: "volunteer" });
  const {
    fields: pubFields,
    append: appendPub,
    remove: removePub,
  } = useFieldArray({ control, name: "publications" });
  const {
    fields: langFields,
    append: appendLang,
    remove: removeLang,
  } = useFieldArray({ control, name: "languages" });
  const {
    fields: refFields,
    append: appendRef,
    remove: removeRef,
  } = useFieldArray({ control, name: "references" });
  const {
    fields: csFields,
    append: appendCs,
    remove: removeCs,
  } = useFieldArray({ control, name: "customSections" });

  // ─── Auto-activate CV sections when switching to CV ─────────
  const prevDocType = React.useRef(documentType);
  React.useEffect(() => {
    if (documentType === "CV" && prevDocType.current !== "CV") {
      setActiveSections((prev) => {
        const next = new Set(prev);
        CV_DEFAULT_SECTIONS.forEach((s) => next.add(s));
        return next;
      });
      // Add blank entries for empty CV sections
      if (eduFields.length === 0)
        appendEdu({
          institution: "",
          degree: "",
          fieldOfStudy: "",
          graduationYear: "",
          gpa: "",
          honors: "",
        });
      if (pubFields.length === 0)
        appendPub({ title: "", publisher: "", date: "", url: "" });
      if (refFields.length === 0)
        appendRef({
          name: "",
          company: "",
          contactInfo: "",
          availableUponRequest: true,
        });
      if (langFields.length === 0)
        appendLang({ language: "", fluency: "" });
      if (volFields.length === 0)
        appendVol({
          role: "",
          organization: "",
          startDate: "",
          endDate: "",
          description: "",
        });
    }
    prevDocType.current = documentType;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentType]);

  const toggleSection = (key: OptionalSectionKey) => {
    setActiveSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
        // Auto-add a blank entry when section is first enabled
        addBlankEntry(key);
      }
      return next;
    });
    setAddMenuOpen(false);
  };

  const addBlankEntry = (key: OptionalSectionKey) => {
    const counts: Record<OptionalSectionKey, number> = {
      education: eduFields.length,
      certifications: certFields.length,
      projects: projFields.length,
      volunteer: volFields.length,
      publications: pubFields.length,
      languages: langFields.length,
      references: refFields.length,
      customSections: csFields.length,
    };
    if (counts[key] === 0) {
      switch (key) {
        case "education":
          appendEdu({
            institution: "",
            degree: "",
            fieldOfStudy: "",
            graduationYear: "",
            gpa: "",
            honors: "",
          });
          break;
        case "certifications":
          appendCert({ name: "", issuer: "", date: "", url: "" });
          break;
        case "projects":
          appendProj({ name: "", url: "", description: "", technologies: "" });
          break;
        case "volunteer":
          appendVol({
            role: "",
            organization: "",
            startDate: "",
            endDate: "",
            description: "",
          });
          break;
        case "publications":
          appendPub({ title: "", publisher: "", date: "", url: "" });
          break;
        case "languages":
          appendLang({ language: "", fluency: "" });
          break;
        case "references":
          appendRef({
            name: "",
            company: "",
            contactInfo: "",
            availableUponRequest: true,
          });
          break;
        case "customSections":
          appendCs({ sectionTitle: "", content: "", sortOrder: 0 });
          break;
      }
    }
  };

  return (
    <div className="space-y-8 pb-28 lg:pb-20">
      {/* ── Personal Details ─────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                {...register("fullName")}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                {...register("title")}
                error={errors.title?.message}
                placeholder="e.g. Senior Frontend Engineer"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              {...register("summary")}
              error={errors.summary?.message}
              placeholder="A 2-3 line snapshot of your qualifications and career objectives..."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                {...register("contactEmail")}
                error={errors.contactEmail?.message}
                placeholder="email@example.com"
              />
            </div>
            <div>
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                type="tel"
                {...register("contactPhone")}
                error={errors.contactPhone?.message}
                placeholder="+1 234 567 890"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              {...register("location")}
              placeholder="New York, NY"
            />
          </div>
        </CardContent>
      </Card>

      {/* ── Links & Portfolio ────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Links & Portfolio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="linkedinUrl">LinkedIn</Label>
              <Input
                id="linkedinUrl"
                {...register("linkedinUrl")}
                error={errors.linkedinUrl?.message}
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div>
              <Label htmlFor="githubUrl">GitHub</Label>
              <Input
                id="githubUrl"
                {...register("githubUrl")}
                error={errors.githubUrl?.message}
                placeholder="https://github.com/..."
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="portfolioUrl">Portfolio</Label>
              <Input
                id="portfolioUrl"
                {...register("portfolioUrl")}
                error={errors.portfolioUrl?.message}
                placeholder="https://myportfolio.com"
              />
            </div>
            <div>
              <Label htmlFor="websiteUrl">Personal Website</Label>
              <Input
                id="websiteUrl"
                {...register("websiteUrl")}
                error={errors.websiteUrl?.message}
                placeholder="https://mysite.com"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="dribbbleUrl">Dribbble</Label>
            <Input
              id="dribbbleUrl"
              {...register("dribbbleUrl")}
              error={errors.dribbbleUrl?.message}
              placeholder="https://dribbble.com/..."
            />
          </div>
        </CardContent>
      </Card>

      {/* ── Work Experience ──────────────────────────────────── */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Work Experience</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              appendExp({
                jobTitle: "",
                company: "",
                location: "",
                startDate: "",
                endDate: "",
                description: "",
                bulletPoints: [],
              })
            }
          >
            <PlusCircle className="w-4 h-4 mr-2" /> Add Experience
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <AnimatePresence>
            {expFields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 border-b pb-6 last:border-0 last:pb-0"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-lg">
                    Experience #{index + 1}
                  </h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => removeExp(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Job Title</Label>
                    <Input
                      {...register(`experiences.${index}.jobTitle`)}
                      error={errors.experiences?.[index]?.jobTitle?.message}
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Input
                      {...register(`experiences.${index}.company`)}
                      error={errors.experiences?.[index]?.company?.message}
                      placeholder="Tech Corp"
                    />
                  </div>
                </div>
                <div>
                  <Label>Location</Label>
                  <Input
                    {...register(`experiences.${index}.location`)}
                    placeholder="San Francisco, CA"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      {...register(`experiences.${index}.startDate`)}
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      {...register(`experiences.${index}.endDate`)}
                    />
                  </div>
                </div>
                <div>
                  <Label>Description / Bullet Points</Label>
                  <Textarea
                    {...register(`experiences.${index}.description`)}
                    placeholder="Use action verbs. Quantify accomplishments with metrics. One bullet per line.&#10;&#10;e.g. Increased site performance by 40% through code-splitting and lazy loading."
                    rows={5}
                  />
                  <p className="text-xs text-white/40 mt-1">
                    Tip: Write one accomplishment per line — they&apos;ll appear
                    as bullet points.
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* ── Skills ───────────────────────────────────────────── */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Skills</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              appendSkill({ name: "", level: "", category: "hard" })
            }
          >
            <PlusCircle className="w-4 h-4 mr-2" /> Add Skill
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <AnimatePresence>
            {skillFields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-3"
              >
                <div className="flex-1">
                  <Input
                    {...register(`skills.${index}.name`)}
                    error={errors.skills?.[index]?.name?.message}
                    placeholder="e.g. React.js"
                  />
                </div>
                <div className="w-28">
                  <Input
                    {...register(`skills.${index}.level`)}
                    placeholder="Expert"
                  />
                </div>
                <select
                  {...register(`skills.${index}.category`)}
                  className="h-11 rounded-xl border border-input bg-white/50 dark:bg-black/50 backdrop-blur-sm px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all duration-300"
                >
                  <option value="hard">Hard</option>
                  <option value="soft">Soft</option>
                </select>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => removeSkill(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* ══════════════════════════════════════════════════════════
           DYNAMIC OPTIONAL SECTIONS
         ══════════════════════════════════════════════════════════ */}

      {/* ── Education ────────────────────────────────────────── */}
      {(activeSections.has("education") || eduFields.length > 0) && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Education</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendEdu({
                  institution: "",
                  degree: "",
                  fieldOfStudy: "",
                  graduationYear: "",
                  gpa: "",
                  honors: "",
                })
              }
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Add
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <AnimatePresence>
              {eduFields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 border-b pb-6 last:border-0 last:pb-0"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Education #{index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => removeEdu(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Institution</Label>
                      <Input
                        {...register(`education.${index}.institution`)}
                        error={errors.education?.[index]?.institution?.message}
                        placeholder="MIT"
                      />
                    </div>
                    <div>
                      <Label>Degree</Label>
                      <Input
                        {...register(`education.${index}.degree`)}
                        error={errors.education?.[index]?.degree?.message}
                        placeholder="B.S. Computer Science"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Field of Study</Label>
                      <Input
                        {...register(`education.${index}.fieldOfStudy`)}
                        placeholder="Computer Science"
                      />
                    </div>
                    <div>
                      <Label>Graduation Year</Label>
                      <Input
                        {...register(`education.${index}.graduationYear`)}
                        placeholder="2023"
                      />
                    </div>
                    <div>
                      <Label>GPA</Label>
                      <Input
                        {...register(`education.${index}.gpa`)}
                        placeholder="3.8 / 4.0"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Honors</Label>
                    <Input
                      {...register(`education.${index}.honors`)}
                      placeholder="Cum Laude, Dean's List"
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>
      )}

      {/* ── Certifications ───────────────────────────────────── */}
      {(activeSections.has("certifications") || certFields.length > 0) && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Certifications</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendCert({ name: "", issuer: "", date: "", url: "" })
              }
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Add
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <AnimatePresence>
              {certFields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 border-b pb-6 last:border-0 last:pb-0"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">
                      Certification #{index + 1}
                    </h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => removeCert(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        {...register(`certifications.${index}.name`)}
                        error={errors.certifications?.[index]?.name?.message}
                        placeholder="AWS Solutions Architect"
                      />
                    </div>
                    <div>
                      <Label>Issuer</Label>
                      <Input
                        {...register(`certifications.${index}.issuer`)}
                        placeholder="Amazon Web Services"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Date</Label>
                      <Input
                        {...register(`certifications.${index}.date`)}
                        placeholder="2024"
                      />
                    </div>
                    <div>
                      <Label>URL</Label>
                      <Input
                        {...register(`certifications.${index}.url`)}
                        error={errors.certifications?.[index]?.url?.message}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>
      )}

      {/* ── Projects ─────────────────────────────────────────── */}
      {(activeSections.has("projects") || projFields.length > 0) && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Projects</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendProj({
                  name: "",
                  url: "",
                  description: "",
                  technologies: "",
                })
              }
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Add
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <AnimatePresence>
              {projFields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 border-b pb-6 last:border-0 last:pb-0"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Project #{index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => removeProj(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        {...register(`projects.${index}.name`)}
                        error={errors.projects?.[index]?.name?.message}
                        placeholder="My Awesome Project"
                      />
                    </div>
                    <div>
                      <Label>URL</Label>
                      <Input
                        {...register(`projects.${index}.url`)}
                        error={errors.projects?.[index]?.url?.message}
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      {...register(`projects.${index}.description`)}
                      placeholder="Brief description of the project, its goal, and your contributions..."
                    />
                  </div>
                  <div>
                    <Label>Technologies</Label>
                    <Input
                      {...register(`projects.${index}.technologies`)}
                      placeholder="React, Node.js, PostgreSQL"
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>
      )}

      {/* ── Volunteer Work ───────────────────────────────────── */}
      {(activeSections.has("volunteer") || volFields.length > 0) && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Volunteer Work</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendVol({
                  role: "",
                  organization: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Add
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <AnimatePresence>
              {volFields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 border-b pb-6 last:border-0 last:pb-0"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Volunteer #{index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => removeVol(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Role</Label>
                      <Input
                        {...register(`volunteer.${index}.role`)}
                        error={errors.volunteer?.[index]?.role?.message}
                        placeholder="Mentor"
                      />
                    </div>
                    <div>
                      <Label>Organization</Label>
                      <Input
                        {...register(`volunteer.${index}.organization`)}
                        error={errors.volunteer?.[index]?.organization?.message}
                        placeholder="Code for Good"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        {...register(`volunteer.${index}.startDate`)}
                        placeholder="Jan 2022"
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input
                        {...register(`volunteer.${index}.endDate`)}
                        placeholder="Present"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      {...register(`volunteer.${index}.description`)}
                      placeholder="What you contributed..."
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>
      )}

      {/* ── Publications ─────────────────────────────────────── */}
      {(activeSections.has("publications") || pubFields.length > 0) && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Publications</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendPub({ title: "", publisher: "", date: "", url: "" })
              }
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Add
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <AnimatePresence>
              {pubFields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 border-b pb-6 last:border-0 last:pb-0"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Publication #{index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => removePub(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        {...register(`publications.${index}.title`)}
                        error={errors.publications?.[index]?.title?.message}
                        placeholder="My Research Paper"
                      />
                    </div>
                    <div>
                      <Label>Publisher</Label>
                      <Input
                        {...register(`publications.${index}.publisher`)}
                        placeholder="IEEE"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Date</Label>
                      <Input
                        {...register(`publications.${index}.date`)}
                        placeholder="2024"
                      />
                    </div>
                    <div>
                      <Label>URL</Label>
                      <Input
                        {...register(`publications.${index}.url`)}
                        error={errors.publications?.[index]?.url?.message}
                        placeholder="https://doi.org/..."
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>
      )}

      {/* ── Languages ────────────────────────────────────────── */}
      {(activeSections.has("languages") || langFields.length > 0) && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Languages</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendLang({ language: "", fluency: "" })}
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Add
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <AnimatePresence>
              {langFields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-1">
                    <Input
                      {...register(`languages.${index}.language`)}
                      error={errors.languages?.[index]?.language?.message}
                      placeholder="English"
                    />
                  </div>
                  <div className="flex-1">
                    <select
                      {...register(`languages.${index}.fluency`)}
                      className="h-11 w-full rounded-xl border border-input bg-white/50 dark:bg-black/50 backdrop-blur-sm px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all duration-300"
                    >
                      <option value="">Select fluency</option>
                      <option value="Native">Native</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Basic">Basic</option>
                    </select>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => removeLang(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>
      )}

      {/* ── References ───────────────────────────────────────── */}
      {(activeSections.has("references") || refFields.length > 0) && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>References</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendRef({
                  name: "",
                  company: "",
                  contactInfo: "",
                  availableUponRequest: true,
                })
              }
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Add
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <AnimatePresence>
              {refFields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 border-b pb-6 last:border-0 last:pb-0"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Reference #{index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => removeRef(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      id={`references.${index}.availableUponRequest`}
                      {...register(`references.${index}.availableUponRequest`)}
                      className="rounded"
                    />
                    <Label
                      htmlFor={`references.${index}.availableUponRequest`}
                      className="text-sm"
                    >
                      Available upon request
                    </Label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        {...register(`references.${index}.name`)}
                        placeholder="Jane Smith"
                      />
                    </div>
                    <div>
                      <Label>Company</Label>
                      <Input
                        {...register(`references.${index}.company`)}
                        placeholder="Tech Corp"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Contact Info</Label>
                    <Input
                      {...register(`references.${index}.contactInfo`)}
                      placeholder="jane@company.com | +1 555-0123"
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>
      )}

      {/* ── Custom Sections ──────────────────────────────────── */}
      {(activeSections.has("customSections") || csFields.length > 0) && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Custom Sections</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendCs({ sectionTitle: "", content: "", sortOrder: 0 })
              }
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Add
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <AnimatePresence>
              {csFields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 border-b pb-6 last:border-0 last:pb-0"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">
                      Custom Section #{index + 1}
                    </h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => removeCs(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div>
                    <Label>Section Title</Label>
                    <Input
                      {...register(`customSections.${index}.sectionTitle`)}
                      error={
                        errors.customSections?.[index]?.sectionTitle?.message
                      }
                      placeholder="Awards & Honors"
                    />
                  </div>
                  <div>
                    <Label>Content</Label>
                    <Textarea
                      {...register(`customSections.${index}.content`)}
                      placeholder="Enter your content here..."
                      rows={4}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>
      )}

      {/* ── Add Section Dropdown ─────────────────────────────── */}
      <div className="relative">
        <Button
          type="button"
          variant="outline"
          className="w-full justify-center gap-2 border-dashed border-2 border-white/20 hover:border-white/40 bg-transparent text-white/60 hover:text-white"
          onClick={() => setAddMenuOpen(!addMenuOpen)}
        >
          <PlusCircle className="w-4 h-4" />
          Add Section
          <ChevronDown
            className={`w-4 h-4 transition-transform ${addMenuOpen ? "rotate-180" : ""}`}
          />
        </Button>
        <AnimatePresence>
          {addMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute bottom-full left-0 right-0 mb-2 rounded-xl border border-white/10 bg-[#0A0A16] shadow-2xl overflow-hidden z-50"
            >
              {OPTIONAL_SECTIONS.map((section) => {
                const isActive = activeSections.has(section.key);
                return (
                  <button
                    key={section.key}
                    type="button"
                    onClick={() => toggleSection(section.key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all hover:bg-white/5 ${
                      isActive
                        ? "text-primary"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {section.icon}
                    {section.label}
                    <span className="ml-auto flex items-center gap-2">
                      {documentType === "CV" &&
                        CV_DEFAULT_SECTIONS.includes(section.key) &&
                        !isActive && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary/70 font-medium">
                            CV
                          </span>
                        )}
                      {isActive && (
                        <span className="text-xs text-primary/60">
                          Active
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Submit ───────────────────────────────────────────── */}
      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full md:w-auto"
        >
          {isSubmitting ? "Saving..." : "Save & Export to PDF"}
        </Button>
      </div>
    </div>
  );
}
