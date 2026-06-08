import { ApiError, Job, JobFormData, User } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

interface JobsResponse {
  jobs: Job[];
}

interface CreateJobResponse {
  message: string;
  job: Job;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw data as ApiError;
  }

  return data as T;
}

export const api = {
  register: (name: string, email: string, password: string) =>
    request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  login: (email: string, password: string) =>
    request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getJobs: (search?: string, type?: string, token?: string) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (type && type !== 'All') params.set('type', type);

    const query = params.toString();
    const headers: Record<string, string> = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    return request<JobsResponse>(`/api/jobs${query ? `?${query}` : ''}`, {
      headers,
    });
  },

  createJob: (job: JobFormData, token: string) =>
    request<CreateJobResponse>('/api/jobs', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(job),
    }),
};
