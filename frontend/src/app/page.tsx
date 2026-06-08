'use client';

import { useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setJobs,
  setLoading,
  setError,
  setSearch,
  setTypeFilter,
} from '@/store/jobsSlice';
import Navbar from '@/components/Navbar';
import JobFilters from '@/components/JobFilters';
import JobCard from '@/components/JobCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { jobs, isLoading, error, search, typeFilter } = useAppSelector(
    (state) => state.jobs
  );
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchJobs = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const data = await api.getJobs(debouncedSearch, typeFilter);
      dispatch(setJobs(data.jobs));
    } catch (err) {
      const message =
        err && typeof err === 'object' && 'message' in err
          ? (err as { message: string }).message
          : 'Failed to fetch jobs';
      dispatch(setError(message));
    }
  }, [debouncedSearch, typeFilter, dispatch]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Find Your Next Role</h1>
          <p className="mt-2 text-slate-600">
            Browse open positions from companies hiring now.
          </p>
        </div>

        <JobFilters
          search={search}
          typeFilter={typeFilter}
          onSearchChange={(value) => dispatch(setSearch(value))}
          onTypeChange={(value) => dispatch(setTypeFilter(value))}
        />

        {isLoading ? (
          <LoadingSpinner message="Fetching job listings..." />
        ) : error ? (
          <div className="rounded-lg bg-red-50 p-4 text-center text-red-700">
            <p>{error}</p>
            <button
              onClick={fetchJobs}
              className="mt-2 text-sm font-medium text-red-800 underline"
            >
              Try again
            </button>
          </div>
        ) : jobs.length === 0 ? (
          <EmptyState
            title="No jobs found"
            description={
              search || typeFilter !== 'All'
                ? 'Try adjusting your search or filters.'
                : 'Be the first to post a job listing!'
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
