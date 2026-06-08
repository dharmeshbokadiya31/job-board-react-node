import { Job } from '@/types';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const typeColors: Record<string, string> = {
    'Full-Time': 'bg-blue-100 text-blue-800',
    'Part-Time': 'bg-amber-100 text-amber-800',
    Remote: 'bg-green-100 text-green-800',
  };

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
          <p className="text-sm font-medium text-indigo-600">{job.company}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${typeColors[job.type] || 'bg-slate-100 text-slate-800'}`}
        >
          {job.type}
        </span>
      </div>

      <p className="mb-3 text-sm text-slate-500">{job.location}</p>
      <p className="line-clamp-3 text-sm text-slate-700">{job.description}</p>

      {job.postedBy?.name && (
        <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-400">
          Posted by {job.postedBy.name}
        </p>
      )}
    </article>
  );
}
