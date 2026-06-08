import { Router, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { Job } from '../models/Job';
import { authenticate } from '../middleware/auth';
import { AuthRequest, IJob, JobType } from '../types';
import { validateJob } from '../utils/validation';

const router = Router();

router.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { search, type } = req.query;
    const filter: FilterQuery<IJob> = {};

    if (search && typeof search === 'string' && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [{ title: searchRegex }, { company: searchRegex }];
    }

    if (type && typeof type === 'string' && type !== 'All') {
      const validTypes: JobType[] = ['Full-Time', 'Part-Time', 'Remote'];
      if (validTypes.includes(type as JobType)) {
        filter.type = type;
      }
    }

    const jobs = await Job.find(filter)
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ jobs });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validateJob(req.body);
    if (errors.length > 0) {
      res.status(400).json({ message: 'Validation failed', errors });
      return;
    }

    if (!req.user) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const { title, company, location, type, description } = req.body as {
      title: string;
      company: string;
      location: string;
      type: JobType;
      description: string;
    };

    const job = await Job.create({
      title: title.trim(),
      company: company.trim(),
      location: location.trim(),
      type,
      description: description.trim(),
      postedBy: req.user.id,
    });

    const populatedJob = await Job.findById(job._id).populate('postedBy', 'name email');

    res.status(201).json({ message: 'Job created successfully', job: populatedJob });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
