"use client";

import * as React from "react";
import Link from "next/link";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resumeSchema,
  ResumeFormValues,
  TemplateId,
} from "@/lib/validations/resume";
import { ResumeForm } from "@/components/resume/resume-form";
import { ResumePreview } from "@/components/resume/resume-preview";
import {
  PanelLeftClose,
  PanelLeft,
  Eye,
  FileText,
} from "lucide-react";

const TEMPLATES: { id: TemplateId; label: string; description: string }[] = [
  {
    id: "professional",
    label: "Professional",
    description: "Clean & traditional",
  },
  { id: "modern", label: "Modern", description: "Two-column layout" },
  { id: "creative", label: "Creative", description: "Bold & colorful" },
];

export default function Home() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeSchema) as Resolver<ResumeFormValues>,
    defaultValues: {
      documentType: "RESUME",
      templateId: "professional",
      fullName: "",
      title: "",
      summary: "",
      contactEmail: "",
      contactPhone: "",
      location: "",
      linkedinUrl: "",
      githubUrl: "",
      portfolioUrl: "",
      websiteUrl: "",
      dribbbleUrl: "",
      experiences: [
        {
          jobTitle: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
          bulletPoints: [],
        },
      ],
      skills: [{ name: "", level: "Intermediate", category: "hard" }],
      education: [],
      certifications: [],
      projects: [],
      volunteer: [],
      publications: [],
      languages: [],
      references: [],
      customSections: [],
    },
  });

  const formData = watch();
  const currentTemplate = watch("templateId") || "professional";
  const documentType = watch("documentType") || "RESUME";

  // ─── UI state ──────────────────────────────────────────────
  const [panelWidth, setPanelWidth] = React.useState(450);
  const [isEditorCollapsed, setIsEditorCollapsed] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [mobileView, setMobileView] = React.useState<"editor" | "preview">(
    "editor",
  );

  // ─── Resizable panel drag handling ─────────────────────────
  React.useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => {
      setPanelWidth(
        Math.max(320, Math.min(e.clientX, window.innerWidth - 400)),
      );
    };
    const onUp = () => setIsDragging(false);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [isDragging]);

  const onSubmit = async (data: ResumeFormValues) => {
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

      const res = await fetch(`${API_URL}/resumes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to create resume");
      const savedResume = await res.json();

      const exportRes = await fetch(
        `${API_URL}/resumes/${savedResume.id}/export`,
        {
          method: "GET",
        },
      );

      if (!exportRes.ok) throw new Error("Failed to export PDF");

      const blob = await exportRes.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `resume-${savedResume.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving or exporting.");
    }
  };

  return (
    <main className="h-[100dvh] bg-[#050510] flex flex-col overflow-hidden w-full font-sans text-white">
      {/* Modern Toolbar */}
      <header className="h-14 flex-shrink-0 border-b border-white/10 bg-[#0A0A16] px-4 md:px-6 flex items-center justify-between z-20 shadow-md">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back
          </Link>
          <div className="h-4 w-px bg-white/20 hidden sm:block"></div>
          <h1 className="text-sm font-medium tracking-tight hidden sm:flex items-center gap-2">
            {documentType === "CV" ? "CV" : "Resume"} Builder{" "}
            <span className="text-white/40 font-normal ml-2">
              Untitled_{documentType === "CV" ? "CV" : "Resume"}.pdf
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Document Type Toggle */}
          <div className="flex items-center bg-white/5 rounded-lg border border-white/10 p-0.5">
            {(["RESUME", "CV"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setValue("documentType", type)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  formData.documentType === type
                    ? "bg-primary text-white shadow-sm"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Template Switcher */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-lg border border-white/10 p-0.5">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setValue("templateId", t.id)}
                title={t.description}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  currentTemplate === t.id
                    ? "bg-primary text-white shadow-sm"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Editor Toggle (Desktop) */}
          <button
            type="submit"
            form="resume-form"
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? (
              <svg
                className="animate-spin w-4 h-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
            )}
            Download PDF
          </button>
        </div>
      </header>

      {/* Workspace */}
      <div className="flex-1 overflow-hidden flex relative w-full">
        {/* ─── Editor Panel ─── */}
        <div
          className={`h-full overflow-y-auto bg-[#0A0A16] relative z-10 flex-col shadow-2xl shrink-0 transition-all duration-300 max-lg:w-full! ${
            mobileView === "preview" ? "hidden lg:flex" : "flex"
          } ${
            isEditorCollapsed
              ? "lg:w-0! lg:min-w-0! lg:overflow-hidden lg:opacity-0"
              : "border-r border-white/10"
          }`}
          style={!isEditorCollapsed ? { width: panelWidth } : undefined}
        >
          <div className="p-6 md:p-8 w-full flex-1">
            <div className="mb-6 pb-4 border-b border-white/10">
              <h2 className="text-xl font-semibold tracking-tight text-white mb-1">
                {documentType === "CV" ? "CV Details" : "Resume Details"}
              </h2>
              <p className="text-sm text-white/50">
                {documentType === "CV"
                  ? "A CV is a comprehensive document. Fill in all relevant academic and professional sections."
                  : "Edit your information below. The document updates automatically."}
              </p>
            </div>
            <div className="w-full">
              <form id="resume-form" onSubmit={handleSubmit(onSubmit)}>
                <ResumeForm
                  control={control}
                  register={register}
                  errors={errors}
                  isSubmitting={isSubmitting}
                  documentType={documentType as "RESUME" | "CV"}
                />
              </form>
            </div>
          </div>
        </div>

        {/* ─── Resize Handle + Collapse Toggle (Desktop) ─── */}
        <div className="hidden lg:flex flex-col items-center flex-shrink-0 relative">
          {/* Collapse / Expand button pinned to the edge */}
          <button
            type="button"
            onClick={() => setIsEditorCollapsed(!isEditorCollapsed)}
            className="absolute -left-3 top-4 z-20 w-6 h-6 rounded-full bg-[#0A0A16] border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:bg-primary/20 hover:border-primary/40 transition-all shadow-lg"
            title={isEditorCollapsed ? "Show editor" : "Hide editor"}
          >
            {isEditorCollapsed ? (
              <PanelLeft className="w-3 h-3" />
            ) : (
              <PanelLeftClose className="w-3 h-3" />
            )}
          </button>

          {/* Drag handle */}
          <div
            className="h-full w-3 flex flex-col items-center justify-center cursor-col-resize group select-none bg-white/[0.03] hover:bg-primary/10 border-x border-white/[0.06] hover:border-primary/20 transition-all"
            onMouseDown={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
          >
            <div className="flex flex-col gap-1 opacity-30 group-hover:opacity-80 transition-opacity">
              <div className="w-1 h-1 rounded-full bg-white group-hover:bg-primary" />
              <div className="w-1 h-1 rounded-full bg-white group-hover:bg-primary" />
              <div className="w-1 h-1 rounded-full bg-white group-hover:bg-primary" />
              <div className="w-1 h-1 rounded-full bg-white group-hover:bg-primary" />
              <div className="w-1 h-1 rounded-full bg-white group-hover:bg-primary" />
            </div>
          </div>
        </div>

        {/* ─── Preview Panel ─── */}
        <div
          className={`flex-1 h-full overflow-y-auto items-start justify-center p-6 lg:p-12 bg-[#050510] relative ${
            mobileView === "editor" ? "hidden lg:flex" : "flex"
          }`}
        >
          <div
            className="absolute inset-0 opacity-[0.2] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative w-full max-w-[850px] transition-all z-10 pb-16 lg:pb-0">
            <ResumePreview
              data={formData}
              templateId={
                currentTemplate as "professional" | "modern" | "creative"
              }
            />
          </div>
        </div>
      </div>

      {/* ─── Mobile Bottom Bar ─── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0A0A16]/95 backdrop-blur-md border-t border-white/10 flex">
        <button
          type="button"
          onClick={() => setMobileView("editor")}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-colors ${
            mobileView === "editor"
              ? "text-primary bg-primary/10"
              : "text-white/50 hover:text-white/70"
          }`}
        >
          <FileText className="w-4 h-4" />
          Editor
        </button>
        <div className="w-px bg-white/10" />
        <button
          type="button"
          onClick={() => setMobileView("preview")}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-colors ${
            mobileView === "preview"
              ? "text-primary bg-primary/10"
              : "text-white/50 hover:text-white/70"
          }`}
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>
      </div>
    </main>
  );
}
