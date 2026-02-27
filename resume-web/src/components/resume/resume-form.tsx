'use client';

import * as React from 'react';
import { useFieldArray, Control, UseFormRegister, FieldErrors } from 'react-hook-form';
import { ResumeFormValues } from '@/lib/validations/resume';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResumeFormProps {
  control: Control<ResumeFormValues>;
  register: UseFormRegister<ResumeFormValues>;
  errors: FieldErrors<ResumeFormValues>;
  isSubmitting: boolean;
}

export function ResumeForm({ control, register, errors, isSubmitting }: ResumeFormProps) {
  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({
    control,
    name: 'experiences',
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: 'skills',
  });

  return (
    <div className="space-y-8 pb-20">
      <Card>
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Resume Title</Label>
            <Input id="title" {...register('title')} error={errors.title?.message} placeholder="e.g. Senior Frontend Engineer" />
          </div>
          <div>
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea id="summary" {...register('summary')} error={errors.summary?.message} placeholder="A short summary about your professional background..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input id="contactEmail" type="email" {...register('contactEmail')} error={errors.contactEmail?.message} placeholder="email@example.com" />
            </div>
            <div>
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input id="contactPhone" type="tel" {...register('contactPhone')} error={errors.contactPhone?.message} placeholder="+1 234 567 890" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Work Experience</CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={() => appendExp({ jobTitle: '', company: '', startDate: '', endDate: '', description: '' })}>
            <PlusCircle className="w-4 h-4 mr-2" /> Add Experience
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <AnimatePresence>
            {expFields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 border-b pb-6 last:border-0 last:pb-0"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-lg">Experience #{index + 1}</h4>
                  <Button type="button" variant="ghost" size="icon" className="text-destructive" onClick={() => removeExp(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`experiences.${index}.jobTitle`}>Job Title</Label>
                    <Input {...register(`experiences.${index}.jobTitle`)} error={errors.experiences?.[index]?.jobTitle?.message} placeholder="Software Engineer" />
                  </div>
                  <div>
                    <Label htmlFor={`experiences.${index}.company`}>Company</Label>
                    <Input {...register(`experiences.${index}.company`)} error={errors.experiences?.[index]?.company?.message} placeholder="Tech Corp" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`experiences.${index}.startDate`}>Start Date</Label>
                    <Input type="month" {...register(`experiences.${index}.startDate`)} />
                  </div>
                  <div>
                    <Label htmlFor={`experiences.${index}.endDate`}>End Date</Label>
                    <Input type="month" {...register(`experiences.${index}.endDate`)} />
                  </div>
                </div>
                <div>
                  <Label htmlFor={`experiences.${index}.description`}>Description</Label>
                  <Textarea {...register(`experiences.${index}.description`)} placeholder="Describe your responsibilities and achievements..." />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Skills</CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={() => appendSkill({ name: '', level: '' })}>
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
                className="flex items-center gap-4"
              >
                <div className="flex-1">
                  <Input {...register(`skills.${index}.name`)} error={errors.skills?.[index]?.name?.message} placeholder="e.g. React.js" />
                </div>
                <div className="flex-1">
                  <Input {...register(`skills.${index}.level`)} placeholder="e.g. Expert" />
                </div>
                <Button type="button" variant="ghost" size="icon" className="text-destructive" onClick={() => removeSkill(index)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
          {isSubmitting ? 'Saving...' : 'Save & Export to PDF'}
        </Button>
      </div>
    </div>
  );
}
