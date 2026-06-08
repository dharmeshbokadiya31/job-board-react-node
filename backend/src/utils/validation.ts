import { JobType } from '../types';
import { JOB_TYPES } from '../models/Job';

export interface ValidationError {
  field: string;
  message: string;
}

export const validateRegister = (body: Record<string, unknown>): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!body.name || typeof body.name !== 'string' || !body.name.trim()) {
    errors.push({ field: 'name', message: 'Name is required' });
  }

  if (!body.email || typeof body.email !== 'string' || !body.email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!/^\S+@\S+\.\S+$/.test(body.email)) {
    errors.push({ field: 'email', message: 'Please provide a valid email' });
  }

  if (!body.password || typeof body.password !== 'string') {
    errors.push({ field: 'password', message: 'Password is required' });
  } else if (body.password.length < 6) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters' });
  }

  return errors;
};

export const validateLogin = (body: Record<string, unknown>): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!body.email || typeof body.email !== 'string' || !body.email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  }

  if (!body.password || typeof body.password !== 'string') {
    errors.push({ field: 'password', message: 'Password is required' });
  }

  return errors;
};

export const validateJob = (body: Record<string, unknown>): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!body.title || typeof body.title !== 'string' || !body.title.trim()) {
    errors.push({ field: 'title', message: 'Job title is required' });
  }

  if (!body.company || typeof body.company !== 'string' || !body.company.trim()) {
    errors.push({ field: 'company', message: 'Company name is required' });
  }

  if (!body.location || typeof body.location !== 'string' || !body.location.trim()) {
    errors.push({ field: 'location', message: 'Location is required' });
  }

  if (!body.type || typeof body.type !== 'string') {
    errors.push({ field: 'type', message: 'Job type is required' });
  } else if (!JOB_TYPES.includes(body.type as JobType)) {
    errors.push({ field: 'type', message: 'Job type must be Full-Time, Part-Time, or Remote' });
  }

  if (!body.description || typeof body.description !== 'string' || !body.description.trim()) {
    errors.push({ field: 'description', message: 'Description is required' });
  }

  return errors;
};
