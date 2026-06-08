import mongoose, { Schema } from 'mongoose';
import { IJob, JobType } from '../types';

const JOB_TYPES: JobType[] = ['Full-Time', 'Part-Time', 'Remote'];

const jobSchema = new Schema<IJob>(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: [100, 'Company name cannot exceed 100 characters'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      maxlength: [100, 'Location cannot exceed 100 characters'],
    },
    type: {
      type: String,
      required: [true, 'Job type is required'],
      enum: {
        values: JOB_TYPES,
        message: 'Job type must be Full-Time, Part-Time, or Remote',
      },
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

jobSchema.index({ title: 'text', company: 'text' });

export const Job = mongoose.model<IJob>('Job', jobSchema);
export { JOB_TYPES };
