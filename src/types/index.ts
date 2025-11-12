// Shared types for the application

export type UserRole = 'job-seeker' | 'employer' | null;

export type Screen = 
  | 'login' 
  | 'job-seeker-dashboard' 
  | 'job-search' 
  | 'job-seeker-profile' 
  | 'employer-dashboard' 
  | 'post-job' 
  | 'candidate-manager' 
  | 'messages';
