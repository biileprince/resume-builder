"use client";

import * as React from "react";
import { ResumeFormValues, TemplateId } from "@/lib/validations/resume";
import { motion } from "framer-motion";
import { ProfessionalTemplate } from "./templates/professional-template";
import { ModernTemplate } from "./templates/modern-template";
import { CreativeTemplate } from "./templates/creative-template";

interface ResumePreviewProps {
  data: Partial<ResumeFormValues>;
  templateId?: TemplateId;
}

export function ResumePreview({
  data,
  templateId = "professional",
}: ResumePreviewProps) {
  const isModern = templateId === "modern";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`bg-white text-slate-900 ${isModern ? "" : "p-10 md:p-14"} min-h-[1056px] w-full max-w-[816px] mx-auto shadow-2xl rounded-sm print:shadow-none font-sans overflow-hidden`}
    >
      {templateId === "professional" && <ProfessionalTemplate data={data} />}
      {templateId === "modern" && <ModernTemplate data={data} />}
      {templateId === "creative" && <CreativeTemplate data={data} />}
    </motion.div>
  );
}
