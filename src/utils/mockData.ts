// Mock data for the application

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  postedDays: number;
  description: string;
  skills: string[];
  matchScore?: number;
  matchBreakdown?: {
    skills: number;
    availability: number;
    experience: number;
  };
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  status: 'New' | 'Reviewed' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';
  appliedDate: string;
}

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Part-Time Web Developer',
    company: 'TechStart Inc.',
    location: 'Remote',
    salary: '$30-45/hr',
    type: 'Part-Time',
    postedDays: 2,
    description: 'Looking for a skilled web developer for part-time work on React projects.',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    matchScore: 95,
    matchBreakdown: {
      skills: 98,
      availability: 95,
      experience: 92,
    }
  },
  {
    id: '2',
    title: 'Weekend Marketing Assistant',
    company: 'Creative Agency Co.',
    location: 'New York, NY',
    salary: '$25/hr',
    type: 'Part-Time',
    postedDays: 1,
    description: 'Help with social media management and content creation on weekends.',
    skills: ['Social Media', 'Content Writing', 'Canva'],
    matchScore: 90,
    matchBreakdown: {
      skills: 88,
      availability: 100,
      experience: 85,
    }
  },
  {
    id: '3',
    title: 'Freelance Graphic Designer',
    company: 'Design Studio',
    location: 'Los Angeles, CA',
    salary: '$35-50/hr',
    type: 'Freelance',
    postedDays: 5,
    description: 'Create visual designs for client projects on a flexible schedule.',
    skills: ['Adobe Photoshop', 'Illustrator', 'UI Design'],
    matchScore: 87,
    matchBreakdown: {
      skills: 90,
      availability: 85,
      experience: 86,
    }
  },
  {
    id: '4',
    title: 'Contract Data Analyst',
    company: 'Analytics Corp',
    location: 'San Francisco, CA',
    salary: '$40-60/hr',
    type: 'Contract',
    postedDays: 3,
    description: 'Analyze data and create reports for business insights.',
    skills: ['Python', 'SQL', 'Data Visualization'],
  },
  {
    id: '5',
    title: 'Freelance Content Writer',
    company: 'Media House',
    location: 'Remote',
    salary: '$20-35/hr',
    type: 'Freelance',
    postedDays: 4,
    description: 'Write engaging content for blogs and social media.',
    skills: ['Writing', 'SEO', 'Research'],
  },
];

export const savedJobs: string[] = ['1', '3']; // Job IDs that are saved

export const applications: Application[] = [
  {
    id: 'app1',
    jobId: '1',
    candidateId: '1',
    status: 'Interview',
    appliedDate: '2024-11-01',
  },
  {
    id: 'app2',
    jobId: '2',
    candidateId: '1',
    status: 'New',
    appliedDate: '2024-11-03',
  },
];
