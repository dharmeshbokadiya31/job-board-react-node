'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { validateJobForm } from '@/lib/validation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addJob } from '@/store/jobsSlice';
import { JobFormData, JobType } from '@/types';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';

const JOB_TYPES: JobType[] = ['Full-Time', 'Part-Time', 'Remote'];

const initialForm: JobFormData = {
  title: '',
  company: '',
  location: '',
  type: '',
  description: '',
};

export default function PostJobPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const [form, setForm] = useState<JobFormData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof JobFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setErrors({});

    const validationErrors = validateJobForm(form);
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach((err) => {
        errorMap[err.field] = err.message;
      });
      setErrors(errorMap);
      return;
    }

    if (!token) return;

    setIsSubmitting(true);
    try {
      const data = await api.createJob(form, token);
      dispatch(addJob(data.job));
      router.push('/');
    } catch (err) {
      const apiErr = err as { message?: string; errors?: { field: string; message: string }[] };
      if (apiErr.errors) {
        const errorMap: Record<string, string> = {};
        apiErr.errors.forEach((e) => {
          errorMap[e.field] = e.message;
        });
        setErrors(errorMap);
      } else {
        setSubmitError(apiErr.message || 'Failed to create job. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <Navbar />
      <main className="mx-auto max-w-2xl flex-1 px-4 py-8 sm:px-6">
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Post a Job</h1>
          <p className="mt-2 text-sm text-slate-600">
            Fill in the details below to publish a new listing.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {submitError && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {submitError}
              </div>
            )}

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700">
                Job Title *
              </label>
              <input
                id="title"
                type="text"
                value={form.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-slate-700">
                Company Name *
              </label>
              <input
                id="company"
                type="text"
                value={form.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              {errors.company && (
                <p className="mt-1 text-xs text-red-600">{errors.company}</p>
              )}
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-slate-700">
                Location *
              </label>
              <input
                id="location"
                type="text"
                value={form.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              {errors.location && (
                <p className="mt-1 text-xs text-red-600">{errors.location}</p>
              )}
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-slate-700">
                Job Type *
              </label>
              <select
                id="type"
                value={form.type}
                onChange={(e) => handleChange('type', e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="">Select job type</option>
                {JOB_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="mt-1 text-xs text-red-600">{errors.type}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700">
                Short Description *
              </label>
              <textarea
                id="description"
                rows={4}
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                maxLength={500}
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <p className="mt-1 text-xs text-slate-400">
                {form.description.length}/500 characters
              </p>
              {errors.description && (
                <p className="mt-1 text-xs text-red-600">{errors.description}</p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Job'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/')}
                className="rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </ProtectedRoute>
  );
}
