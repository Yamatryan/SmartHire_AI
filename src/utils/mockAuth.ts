// Mock authentication system with hardcoded credentials
export interface User {
  id: string;
  email: string;
  password: string;
  role: 'job-seeker' | 'employer';
  name: string;
}

// Hardcoded user credentials
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'jobseeker@demo.com',
    password: 'password123',
    role: 'job-seeker',
    name: 'John Smith',
  },
  {
    id: '2',
    email: 'employer@demo.com',
    password: 'password123',
    role: 'employer',
    name: 'TechStart Inc.',
  },
  {
    id: '3',
    email: 'sarah@example.com',
    password: 'demo123',
    role: 'job-seeker',
    name: 'Sarah Johnson',
  },
  {
    id: '4',
    email: 'techcorp@example.com',
    password: 'demo123',
    role: 'employer',
    name: 'Tech Corp',
  },
];

export const authenticateUser = (email: string, password: string): User | null => {
  const user = mockUsers.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  return user || null;
};

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      return JSON.parse(userJson);
    }
  } catch (error) {
    console.error('Error getting current user:', error);
  }
  return null;
};

export const setCurrentUser = (user: User | null): void => {
  if (typeof window === 'undefined') return;
  
  try {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  } catch (error) {
    console.error('Error setting current user:', error);
  }
};

export const logout = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('currentUser');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
