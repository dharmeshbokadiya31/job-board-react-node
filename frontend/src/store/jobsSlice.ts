import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Job, JobType, JobsState } from '@/types';

const initialState: JobsState = {
  jobs: [],
  isLoading: false,
  error: null,
  search: '',
  typeFilter: 'All',
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addJob: (state, action: PayloadAction<Job>) => {
      state.jobs.unshift(action.payload);
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setTypeFilter: (state, action: PayloadAction<JobType | 'All'>) => {
      state.typeFilter = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setJobs,
  addJob,
  setSearch,
  setTypeFilter,
} = jobsSlice.actions;
export default jobsSlice.reducer;
