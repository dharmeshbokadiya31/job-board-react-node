import { Request } from 'express';
import { Document, Types } from 'mongoose';

export type JobType = 'Full-Time' | 'Part-Time' | 'Remote';

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IJob extends Document {
  _id: Types.ObjectId;
  title: string;
  company: string;
  location: string;
  type: JobType;
  description: string;
  postedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export interface JwtPayload {
  id: string;
  email: string;
  name: string;
}
