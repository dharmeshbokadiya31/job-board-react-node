export type JobType = 'Full-Time' | 'Part-Time' | 'Remote';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface PostedBy {
  _id: string;
  name: string;
  email: string;
}

export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  description: string;
  postedBy: PostedBy;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface JobsState {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  search: string;
  typeFilter: JobType | 'All';
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  message: string;
  errors?: ValidationError[];
}

export interface JobFormData {
  title: string;
  company: string;
  location: string;
  type: JobType | '';
  description: string;
}
