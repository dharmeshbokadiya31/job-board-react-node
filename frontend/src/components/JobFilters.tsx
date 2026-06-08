'use client';

import { JobType } from '@/types';

interface JobFiltersProps {
  search: string;
  typeFilter: JobType | 'All';
  onSearchChange: (value: string) => void;
  onTypeChange: (value: JobType | 'All') => void;
}

const JOB_TYPES: (JobType | 'All')[] = ['All', 'Full-Time', 'Part-Time', 'Remote'];

export default function JobFilters({
  search,
  typeFilter,
  onSearchChange,
  onTypeChange,
}: JobFiltersProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row">
      <div className="flex-1">
        <label htmlFor="search" className="sr-only">
          Search jobs
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search by job title or company..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      <div className="sm:w-48">
        <label htmlFor="type" className="sr-only">
          Filter by job type
        </label>
        <select
          id="type"
          value={typeFilter}
          onChange={(e) => onTypeChange(e.target.value as JobType | 'All')}
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          {JOB_TYPES.map((type) => (
            <option key={type} value={type}>
              {type === 'All' ? 'All Types' : type}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
