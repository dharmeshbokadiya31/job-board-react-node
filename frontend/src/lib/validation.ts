import { JobFormData, JobType, ValidationError } from '@/types';

const JOB_TYPES: JobType[] = ['Full-Time', 'Part-Time', 'Remote'];

export const validateJobForm = (data: JobFormData): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.title.trim()) {
    errors.push({ field: 'title', message: 'Job title is required' });
  }

  if (!data.company.trim()) {
    errors.push({ field: 'company', message: 'Company name is required' });
  }

  if (!data.location.trim()) {
    errors.push({ field: 'location', message: 'Location is required' });
  }

  if (!data.type) {
    errors.push({ field: 'type', message: 'Job type is required' });
  } else if (!JOB_TYPES.includes(data.type as JobType)) {
    errors.push({ field: 'type', message: 'Please select a valid job type' });
  }

  if (!data.description.trim()) {
    errors.push({ field: 'description', message: 'Description is required' });
  }

  return errors;
};

export const validateRegisterForm = (
  name: string,
  email: string,
  password: string
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!name.trim()) {
    errors.push({ field: 'name', message: 'Name is required' });
  }

  if (!email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email' });
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' });
  } else if (password.length < 6) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters' });
  }

  return errors;
};

export const validateLoginForm = (
  email: string,
  password: string
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' });
  }

  return errors;
};
