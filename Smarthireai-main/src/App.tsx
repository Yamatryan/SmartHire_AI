import { useState, useMemo } from 'react';

interface User {
  id: string;
  email: string;
  password: string;
  role: 'job-seeker' | 'employer';
  name: string;
  company?: string; // For employers
  profileComplete?: boolean;
}

interface JobSeekerProfile {
  userId: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  availability: 'full-time' | 'part-time' | 'contract' | 'flexible';
  expectedSalary: { min: number; max: number };
  skills: string[];
  experience: number; // years
  education: string;
  bio: string;
  resumeUrl?: string;
  portfolio?: string;
  linkedin?: string;
}

interface Job {
  id: string;
  employerId: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salaryRange: { min: number; max: number; currency?: 'USD' | 'PHP';  };
  description: string;
  requirements: string[];
  skills: string[];
  benefits: string[];
  postedDate: string;
  deadline: string;
  status: 'active' | 'closed' | 'draft';
}

interface Application {
  id: string;
  jobId: string;
  jobSeekerId: string;
  employerId: string;
  status: 'pending' | 'reviewed' | 'interview' | 'rejected' | 'accepted';
  appliedDate: string;
  coverLetter?: string;
  matchScore: number;
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}


const mockUsers: User[] = [
  {
    id: 'js1',
    email: 'qracyamat@tip.edu.ph',
    password: 'demo123',
    role: 'job-seeker',
    name: 'Ryan Angelo Yamat',
    profileComplete: true
  },
  {
    id: 'js2',
    email: 'qefcerafica@tip.edu.ph',
    password: 'demo123',
    role: 'job-seeker',
    name: 'Emmanuel Cerafica',
    profileComplete: true
  },
  {
    id: 'emp1',
    email: 'qvycbabasa@tip.edu.ph',
    password: 'demo123',
    role: 'employer',
    name: 'Vienn Ysabel Babasa',
    company: 'TechnoCore Solutions Inc.',
    profileComplete: true
  }
];

const mockJobSeekerProfiles: { [key: string]: JobSeekerProfile } = {
  'js1': {
    userId: 'js1',
    name: 'Ryan Angelo Yamat',
    email: 'qracyamat@tip.edu.ph',
    phone: '+639958104965',
    location: 'Quezon City, Metro Manila',
    availability: 'part-time',
    expectedSalary: { min: 10000, max: 15000 },
    skills: ['Video Editing', 'Adobe Premiere Pro', 'After Effects', 'Graphic Design', 'Photoshop', 'Social Media'],
    experience: 3,
    education: 'B.S. Multimedia Arts, Technological Institute of the Philippines',
    bio: 'Creative video editor and graphic designer with experience in creating engaging content for social media and digital platforms.',
    portfolio: 'https://ryanangelo.dev',
    linkedin: 'https://linkedin.com/in/ryanangelo'
  },
  'js2': {
    userId: 'js2',
    name: 'Emmanuel Cerafica',
    email: 'qefcerafica@tip.edu.ph',
    phone: '+639171234567',
    location: 'Makati City, Metro Manila',
    availability: 'part-time',
    expectedSalary: { min: 10000, max: 15000 },
    skills: ['Virtual Assistant', 'English Communication', 'Data Entry', 'Microsoft Office', 'Customer Service', 'Email Management'],
    experience: 2,
    education: 'B.S. Business Administration, De La Salle University',
    bio: 'Reliable virtual assistant with strong English communication skills and experience in administrative support and customer service.',
    portfolio: 'https://emmanuelcerafica.com',
    linkedin: 'https://linkedin.com/in/emmanuelcerafica'
  }
};

const initialJobs: Job[] = [
  {
    id: 'job1',
    employerId: 'emp1',
    title: 'Part-Time Online English Tutor',
    company: 'TechnoCore Solutions Inc.',
    location: 'Remote (Work from Home)',
    type: 'part-time',
    salaryRange: { min: 10000, max: 15000, currency: 'PHP' },
    description: 'Teach English to students online via video calls. Flexible schedule, work from the comfort of your home. Perfect for students or those looking for supplementary income.',
    requirements: [
      'Fluent in English (written and spoken)',
      'At least 1 year teaching or tutoring experience',
      'Reliable internet connection',
      'Patience and good communication skills',
      'Available for at least 15-20 hours per week'
    ],
    skills: ['English Teaching', 'Communication', 'Online Teaching', 'Patience', 'Time Management'],
    benefits: ['Flexible Schedule', 'Work from Home', 'Performance Bonus', 'Training Provided'],
    postedDate: '2025-11-01',
    deadline: '2025-12-01',
    status: 'active'
  },
  {
    id: 'job2',
    employerId: 'emp1',
    title: 'Part-Time Virtual Assistant',
    company: 'TechnoCore Solutions Inc.',
    location: 'Remote (Work from Home)',
    type: 'part-time',
    salaryRange: { min: 10000, max: 15000, currency: 'PHP' },
    description: 'Provide administrative support remotely including email management, scheduling, data entry, and customer service. Great opportunity for those with strong organizational skills.',
    requirements: [
      'Strong English communication skills',
      'Proficient in Microsoft Office and Google Workspace',
      'Experience with email management and scheduling',
      'Detail-oriented and organized',
      'Available 20-25 hours per week'
    ],
    skills: ['Virtual Assistant', 'Email Management', 'Data Entry', 'Customer Service', 'Microsoft Office', 'Time Management'],
    benefits: ['Work from Home', 'Flexible Hours', 'Training Support', 'Performance Incentives'],
    postedDate: '2025-11-02',
    deadline: '2025-12-02',
    status: 'active'
  },
  {
    id: 'job3',
    employerId: 'emp1',
    title: 'Part-Time Graphic Designer',
    company: 'TechnoCore Solutions Inc.',
    location: 'Makati City, Metro Manila',
    type: 'part-time',
    salaryRange: { min: 10000, max: 15000, currency: 'PHP' },
    description: 'Create visual content for social media, marketing materials, and digital platforms. Work on exciting creative projects with flexible schedule.',
    requirements: [
      'Portfolio demonstrating graphic design skills',
      'Proficiency in Adobe Photoshop and Illustrator',
      'Experience with social media graphics',
      'Creative and detail-oriented',
      '15-20 hours per week availability'
    ],
    skills: ['Graphic Design', 'Photoshop', 'Illustrator', 'Social Media Design', 'Canva', 'Creativity'],
    benefits: ['Flexible Schedule', 'Creative Projects', 'Skill Development', 'Portfolio Building'],
    postedDate: '2025-11-03',
    deadline: '2025-12-03',
    status: 'active'
  },
  {
    id: 'job4',
    employerId: 'emp1',
    title: 'Part-Time Food Delivery Rider',
    company: 'TechnoCore Solutions Inc.',
    location: 'Metro Manila (Various Areas)',
    type: 'part-time',
    salaryRange: { min: 10000, max: 15000, currency: 'PHP' },
    description: 'Deliver food orders to customers across Metro Manila. Earn extra income with flexible hours. Own motorcycle or bicycle required.',
    requirements: [
      'Own motorcycle or bicycle',
      'Valid driver\'s license (for motorcycle)',
      'Smartphone with GPS',
      'Good knowledge of Metro Manila roads',
      'Available for flexible shifts',
      'Customer service oriented'
    ],
    skills: ['Driving', 'Navigation', 'Time Management', 'Customer Service', 'Physical Fitness'],
    benefits: ['Flexible Hours', 'Tips and Incentives', 'Fuel Allowance', 'No Fixed Schedule'],
    postedDate: '2025-11-04',
    deadline: '2025-12-04',
    status: 'active'
  },
  {
    id: 'job5',
    employerId: 'emp1',
    title: 'Part-Time Data Encoder',
    company: 'TechnoCore Solutions Inc.',
    location: 'Quezon City, Metro Manila',
    type: 'part-time',
    salaryRange: { min: 10000, max: 15000, currency: 'PHP' },
    description: 'Input and manage data in our systems with accuracy and speed. Perfect for detail-oriented individuals looking for part-time work.',
    requirements: [
      'Fast and accurate typing skills (at least 40 WPM)',
      'Proficient in Microsoft Excel and data entry',
      'Attention to detail',
      'Basic computer literacy',
      'Available 15-20 hours per week'
    ],
    skills: ['Data Entry', 'Microsoft Excel', 'Typing', 'Attention to Detail', 'Computer Skills'],
    benefits: ['Flexible Hours', 'Air-conditioned Office', 'Skill Training', 'Performance Bonus'],
    postedDate: '2025-11-05',
    deadline: '2025-12-05',
    status: 'active'
  },
  {
    id: 'job6',
    employerId: 'emp1',
    title: 'Part-Time Video Editor',
    company: 'TechnoCore Solutions Inc.',
    location: 'BGC, Taguig City, Metro Manila',
    type: 'part-time',
    salaryRange: { min: 10000, max: 15000, currency: 'PHP' },
    description: 'Edit video content for social media, YouTube, and marketing campaigns. Work with creative team on engaging video projects.',
    requirements: [
      'Portfolio of video editing work',
      'Proficiency in Adobe Premiere Pro or Final Cut Pro',
      'Experience with After Effects is a plus',
      'Creative storytelling skills',
      'Available 20-25 hours per week'
    ],
    skills: ['Video Editing', 'Adobe Premiere Pro', 'After Effects', 'Storytelling', 'Color Grading', 'Audio Editing'],
    benefits: ['Creative Projects', 'Flexible Schedule', 'Portfolio Building', 'Industry Exposure'],
    postedDate: '2025-11-06',
    deadline: '2025-12-06',
    status: 'active'
  }
];

const initialApplications: Application[] = [
  {
    id: 'app1',
    jobId: 'job6',
    jobSeekerId: 'js1',
    employerId: 'emp1',
    status: 'reviewed',
    appliedDate: '2025-11-07',
    coverLetter: 'I am excited to apply for the Video Editor position. My experience with Adobe Premiere Pro and passion for storytelling make me a great fit for this role.',
    matchScore: 92
  },
  {
    id: 'app2',
    jobId: 'job2',
    jobSeekerId: 'js2',
    employerId: 'emp1',
    status: 'interview',
    appliedDate: '2025-11-08',
    coverLetter: 'As a virtual assistant with strong communication skills and organizational abilities, I would love to contribute to your team.',
    matchScore: 88
  },
  {
    id: 'app3',
    jobId: 'job3',
    jobSeekerId: 'js1',
    employerId: 'emp1',
    status: 'pending',
    appliedDate: '2025-11-09',
    coverLetter: 'My graphic design skills and experience with Adobe Creative Suite align perfectly with this role.',
    matchScore: 85
  }
];

const initialMessages: Message[] = [
  {
    id: 'msg1',
    conversationId: 'conv1',
    senderId: 'emp1',
    receiverId: 'js2',
    content: 'Hi Emmanuel! We reviewed your application for the Virtual Assistant position and would love to schedule an interview. Are you available next week?',
    timestamp: '2025-11-09T10:30:00',
    read: true
  },
  {
    id: 'msg2',
    conversationId: 'conv1',
    senderId: 'js2',
    receiverId: 'emp1',
    content: 'Thank you for reaching out! Yes, I am available next week. Tuesday or Wednesday afternoon works best for me.',
    timestamp: '2025-11-09T14:20:00',
    read: true
  },
  {
    id: 'msg3',
    conversationId: 'conv1',
    senderId: 'emp1',
    receiverId: 'js2',
    content: 'Perfect! Let\'s schedule it for Tuesday at 2 PM. I\'ll send you the meeting details.',
    timestamp: '2025-11-09T15:45:00',
    read: false
  },
  {
    id: 'msg4',
    conversationId: 'conv2',
    senderId: 'emp1',
    receiverId: 'js1',
    content: 'Hi Ryan, thank you for applying to the Video Editor position. We were impressed with your portfolio and would like to move forward with your application.',
    timestamp: '2025-11-08T09:15:00',
    read: true
  },
  {
    id: 'msg5',
    conversationId: 'conv2',
    senderId: 'js1',
    receiverId: 'emp1',
    content: 'Thank you! I\'m very excited about this opportunity. What are the next steps?',
    timestamp: '2025-11-08T11:30:00',
    read: true
  }
];

const initialConversations: Conversation[] = [
  {
    id: 'conv1',
    participants: ['js2', 'emp1'],
    lastMessage: 'Perfect! Let\'s schedule it for Tuesday at 2 PM...',
    lastMessageTime: '2025-11-09T15:45:00',
    unreadCount: 1
  },
  {
    id: 'conv2',
    participants: ['js1', 'emp1'],
    lastMessage: 'Thank you! I\'m very excited about this opportunity...',
    lastMessageTime: '2025-11-08T11:30:00',
    unreadCount: 0
  }
];

// ==================== MATCHING ALGORITHM ====================
function calculateMatchScore(job: Job, profile: JobSeekerProfile): number {
  let score = 0;
  let maxScore = 0;

  // Skills match (40 points)
  maxScore += 40;
  const matchingSkills = job.skills.filter(skill => 
    profile.skills.some(ps => ps.toLowerCase() === skill.toLowerCase())
  );
  score += (matchingSkills.length / job.skills.length) * 40;

  // Salary expectation (20 points)
  maxScore += 20;
  const jobAvg = (job.salaryRange.min + job.salaryRange.max) / 2;
  const seekerAvg = (profile.expectedSalary.min + profile.expectedSalary.max) / 2;
  const salaryDiff = Math.abs(jobAvg - seekerAvg) / jobAvg;
  score += Math.max(0, 20 - (salaryDiff * 20));

  // Experience level (20 points)
  maxScore += 20;
  if (profile.experience >= 5 && job.requirements.some(r => r.includes('5+'))) {
    score += 20;
  } else if (profile.experience >= 3 && job.requirements.some(r => r.includes('3+'))) {
    score += 15;
  } else if (profile.experience >= 2 && job.requirements.some(r => r.includes('2+'))) {
    score += 10;
  } else if (profile.experience < 2 && job.requirements.some(r => r.includes('0-2'))) {
    score += 20;
  } else {
    score += 5;
  }

  // Availability match (20 points)
  maxScore += 20;
  if (profile.availability === job.type || profile.availability === 'flexible') {
    score += 20;
  } else if (profile.availability === 'part-time' && job.type === 'contract') {
    score += 10;
  } else {
    score += 5;
  }

  return Math.round((score / maxScore) * 100);
}

// ==================== MAIN APP COMPONENT ====================
export default function App() {
  // Auth state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Navigation state
  const [screen, setScreen] = useState('login');

  // Data state
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [jobSeekerProfiles, setJobSeekerProfiles] = useState(mockJobSeekerProfiles);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);

  // Job Seeker state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterSalary, setFilterSalary] = useState('all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');

  // Employer state
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [newJob, setNewJob] = useState<Partial<Job>>({
    title: '',
    location: '',
    type: 'part-time',
    salaryRange: { min: 0, max: 0 },
    description: '',
    requirements: [],
    skills: [],
    benefits: []
  });
  const [requirementInput, setRequirementInput] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [benefitInput, setBenefitInput] = useState('');

  // Messages state
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');

  // Profile editing state
  const [editedProfile, setEditedProfile] = useState<JobSeekerProfile | null>(null);

  // ==================== AUTH FUNCTIONS ====================
  const handleLogin = () => {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setLoginError('');
      if (user.role === 'job-seeker') {
        setEditedProfile(jobSeekerProfiles[user.id]);
        setScreen('job-seeker-dashboard');
      } else {
        setScreen('employer-dashboard');
      }
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setScreen('login');
    setEmail('');
    setPassword('');
  };

  // ==================== JOB SEEKER FUNCTIONS ====================
  const currentProfile = currentUser ? jobSeekerProfiles[currentUser.id] : null;

  const matchedJobs = useMemo(() => {
    if (!currentProfile) return [];
    return jobs
      .filter(job => job.status === 'active')
      .map(job => ({
        ...job,
        matchScore: calculateMatchScore(job, currentProfile)
      }))
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [jobs, currentProfile]);

  const filteredJobs = useMemo(() => {
    let filtered = [...matchedJobs];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }

    if (filterLocation !== 'all') {
      filtered = filtered.filter(job =>
        filterLocation === 'remote'
          ? job.location.toLowerCase().includes('remote')
          : job.location.toLowerCase().includes(filterLocation.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(job => job.type === filterType);
    }

    if (filterSalary !== 'all') {
      const [min, max] = filterSalary.split('-').map(Number);
      filtered = filtered.filter(job =>
        job.salaryRange.min >= min && (max ? job.salaryRange.max <= max : true)
      );
    }

    return filtered;
  }, [matchedJobs, searchQuery, filterLocation, filterType, filterSalary]);

  const handleApplyJob = (job: Job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
    setCoverLetter('');
  };

  const submitApplication = () => {
    if (!currentUser || !selectedJob || !currentProfile) return;

    const newApplication: Application = {
      id: `app${applications.length + 1}`,
      jobId: selectedJob.id,
      jobSeekerId: currentUser.id,
      employerId: selectedJob.employerId,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0],
      coverLetter: coverLetter || undefined,
      matchScore: calculateMatchScore(selectedJob, currentProfile)
    };

    setApplications([...applications, newApplication]);
    setShowApplicationModal(false);
    setSelectedJob(null);
    alert('Application submitted successfully!');
  };

  const myApplications = applications.filter(app => app.jobSeekerId === currentUser?.id);

  const updateProfile = () => {
    if (!currentUser || !editedProfile) return;
    setJobSeekerProfiles({
      ...jobSeekerProfiles,
      [currentUser.id]: editedProfile
    });
    alert('Profile updated successfully!');
  };

  const withdrawApplication = (applicationId: string) => {
    if (window.confirm('Are you sure you want to withdraw this application?')) {
      setApplications(applications.filter(app => app.id !== applicationId));
      alert('Application withdrawn successfully!');
    }
  };

  // ==================== EMPLOYER FUNCTIONS ====================
  const myJobs = jobs.filter(job => job.employerId === currentUser?.id);
  const jobApplications = applications.filter(app => app.employerId === currentUser?.id);

  const handlePostJob = () => {
    if (!currentUser || !newJob.title || !newJob.description) {
      alert('Please fill in all required fields');
      return;
    }

    const job: Job = {
      id: `job${jobs.length + 1}`,
      employerId: currentUser.id,
      title: newJob.title!,
      company: currentUser.company || currentUser.name,
      location: newJob.location || 'Remote',
      type: newJob.type || 'full-time',
      salaryRange: newJob.salaryRange || { min: 0, max: 0 },
      description: newJob.description!,
      requirements: newJob.requirements || [],
      skills: newJob.skills || [],
      benefits: newJob.benefits || [],
      postedDate: new Date().toISOString().split('T')[0],
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active'
    };

    setJobs([...jobs, job]);
    setNewJob({
      title: '',
      location: '',
      type: 'part-time',
      salaryRange: { min: 0, max: 0 },
      description: '',
      requirements: [],
      skills: [],
      benefits: []
    });
    alert('Job posted successfully!');
    setScreen('employer-dashboard');
  };

  const updateApplicationStatus = (appId: string, status: Application['status']) => {
    setApplications(applications.map(app =>
      app.id === appId ? { ...app, status } : app
    ));
  };

  // ==================== MESSAGING FUNCTIONS ====================
  const userConversations = conversations.filter(conv =>
    conv.participants.includes(currentUser?.id || '')
  );

  const selectedMessages = selectedConversation
    ? messages.filter(msg => msg.conversationId === selectedConversation.id)
    : [];

  const sendMessage = () => {
    if (!currentUser || !selectedConversation || !newMessage.trim()) return;

    const otherParticipant = selectedConversation.participants.find(p => p !== currentUser.id)!;

    const message: Message = {
      id: `msg${messages.length + 1}`,
      conversationId: selectedConversation.id,
      senderId: currentUser.id,
      receiverId: otherParticipant,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false
    };

    setMessages([...messages, message]);
    setConversations(conversations.map(conv =>
      conv.id === selectedConversation.id
        ? {
            ...conv,
            lastMessage: newMessage,
            lastMessageTime: message.timestamp
          }
        : conv
    ));
    setNewMessage('');
  };

  const getParticipantName = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    return user?.name || 'Unknown';
  };

  // ==================== RENDER LOGIN SCREEN ====================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-blue-600 rounded-xl mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-blue-600 mb-2">SmartHireLink AI</h1>
              <p className="text-gray-600">AI-Powered Job Matching Platform</p>
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                {loginError}
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors mb-6"
            >
              Sign In
            </button>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
              <p className="text-gray-700 mb-4">
               
              </p>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-sm">                   
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-sm">              
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-600 mt-6 text-sm">
          </p>
        </div>
      </div>
    );
  }

  // ==================== RENDER MAIN APP ====================
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-blue-600">SmartHireLink AI</span>
              </div>
              <nav className="flex items-center space-x-1">
                {currentUser.role === 'job-seeker' && (
                  <>
                    <button
                      onClick={() => setScreen('job-seeker-dashboard')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        screen === 'job-seeker-dashboard'
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => setScreen('job-search')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        screen === 'job-search'
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Find Jobs
                    </button>
                    <button
                      onClick={() => setScreen('applications')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        screen === 'applications'
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      My Applications
                      {myApplications.length > 0 && (
                        <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
                          {myApplications.length}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => setScreen('messages')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        screen === 'messages'
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Messages
                      {userConversations.some(c => c.unreadCount > 0) && (
                        <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
                          {userConversations.reduce((sum, c) => sum + c.unreadCount, 0)}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => setScreen('profile')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        screen === 'profile'
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Profile
                    </button>
                  </>
                )}
                {currentUser.role === 'employer' && (
                  <>
                    <button
                      onClick={() => setScreen('employer-dashboard')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        screen === 'employer-dashboard'
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => setScreen('post-job')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        screen === 'post-job'
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Post Job
                    </button>
                    <button
                      onClick={() => setScreen('candidates')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        screen === 'candidates'
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Candidates
                      {jobApplications.filter(a => a.status === 'pending').length > 0 && (
                        <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
                          {jobApplications.filter(a => a.status === 'pending').length}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => setScreen('messages')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        screen === 'messages'
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Messages
                    </button>
                  </>
                )}
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-gray-700">{currentUser.name}</div>
                {currentUser.company && (
                  <div className="text-gray-500 text-sm">{currentUser.company}</div>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* JOB SEEKER DASHBOARD */}
        {screen === 'job-seeker-dashboard' && (
          <div>
            <div className="mb-8">
              <h1 className="mb-2">Welcome back, {currentUser.name}!</h1>
              <p className="text-gray-600">Here are your top job matches based on your profile</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 mb-1">Profile Strength</p>
                    <p className="text-3xl text-blue-600">95%</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 mb-1">Applications</p>
                    <p className="text-3xl text-green-600">{myApplications.length}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 mb-1">Job Matches</p>
                    <p className="text-3xl text-purple-600">{matchedJobs.filter(j => j.matchScore >= 70).length}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 mb-1">Messages</p>
                    <p className="text-3xl text-orange-600">{userConversations.length}</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Matches */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2>Top Matches For You</h2>
                <button
                  onClick={() => setScreen('job-search')}
                  className="text-blue-600 hover:text-blue-700"
                >
                  View All →
                </button>
              </div>

              <div className="space-y-4">
                {matchedJobs.slice(0, 5).map((job) => {
                  const hasApplied = myApplications.some(app => app.jobId === job.id);
                  return (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3>{job.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              job.matchScore >= 90 ? 'bg-green-100 text-green-800' :
                              job.matchScore >= 75 ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {job.matchScore}% Match
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">
                            {job.company} • {job.location} • ₱{job.salaryRange.min.toLocaleString()} - ₱{job.salaryRange.max.toLocaleString()}
                            /month
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">{job.type}</span>
                            {job.skills.slice(0, 4).map((skill, idx) => (
                              <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
                                {skill}
                              </span>
                            ))}
                          </div>
                          <p className="text-gray-700 line-clamp-2">{job.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApplyJob(job)}
                          disabled={hasApplied}
                          className={`px-5 py-2 rounded-lg transition-colors ${
                            hasApplied
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {hasApplied ? 'Applied' : 'Apply Now'}
                        </button>
                        <button className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* JOB SEARCH */}
        {screen === 'job-search' && (
          <div>
            <h1 className="mb-6">Find Your Perfect Job</h1>

            <div className="grid grid-cols-4 gap-6">
              {/* Filters Sidebar */}
              <div className="col-span-1 bg-white rounded-xl shadow-sm p-6 border border-gray-200 h-fit">
                <h2 className="mb-4">Filters</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Location</label>
                    <select
                      value={filterLocation}
                      onChange={(e) => setFilterLocation(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                      <option value="all">All Locations</option>
                      <option value="makati">Makati City</option>
                      <option value="bgc">BGC, Taguig</option>
                      <option value="quezon city">Quezon City</option>
                      <option value="pasig">Pasig City</option>
                      <option value="ortigas">Ortigas</option>
                      <option value="manila">Manila</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Job Type</label>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                      <option value="all">All Types</option>
                      <option value="part-time">Part-Time</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Salary Range</label>
                    <select
                      value={filterSalary}
                      onChange={(e) => setFilterSalary(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                      <option value="all">All Ranges</option>
                      <option value="0-15000">₱0 - ₱15k</option>
                      <option value="15000-20000">₱15k - ₱20k</option>
                      <option value="20000-25000">₱20k - ₱25k</option>
                      <option value="25000-999999">₱25k+</option>
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      setFilterLocation('all');
                      setFilterType('all');
                      setFilterSalary('all');
                      setSearchQuery('');
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>

              {/* Job Listings */}
              <div className="col-span-3">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, company, or skills..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4 flex items-center justify-between">
                  <p className="text-gray-600">
                    {filteredJobs.length} jobs found
                  </p>
                  <select className="border border-gray-300 rounded-lg px-3 py-2">
                    <option>Best Match</option>
                    <option>Newest First</option>
                    <option>Salary: High to Low</option>
                    <option>Salary: Low to High</option>
                  </select>
                </div>

                <div className="space-y-4">
                  {filteredJobs.map((job) => {
                    const hasApplied = myApplications.some(app => app.jobId === job.id);
                    return (
                      <div key={job.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3>{job.title}</h3>
                              <span className={`px-3 py-1 rounded-full text-sm ${
                                job.matchScore >= 90 ? 'bg-green-100 text-green-800' :
                                job.matchScore >= 75 ? 'bg-blue-100 text-blue-800' :
                                job.matchScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {job.matchScore}% Match
                              </span>
                              <span className="text-gray-500 text-sm">Posted {job.postedDate}</span>
                            </div>
                            <p className="text-gray-600 mb-3">
                              {job.company} • {job.location}
                            </p>
                            <p className="text-gray-700 mb-3">{job.description}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm">
                                ₱{job.salaryRange.min.toLocaleString()} - ₱{job.salaryRange.max.toLocaleString()}/month
                              </span>
                              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm capitalize">
                                {job.type}
                              </span>
                              {job.skills.slice(0, 5).map((skill, idx) => (
                                <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApplyJob(job)}
                            disabled={hasApplied}
                            className={`px-6 py-2 rounded-lg transition-colors ${
                              hasApplied
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            {hasApplied ? 'Applied ✓' : 'Apply Now'}
                          </button>
                          <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            Save Job
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MY APPLICATIONS */}
        {screen === 'applications' && (
          <div>
            <h1 className="mb-6">My Applications</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex gap-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                    All ({myApplications.length})
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    Pending ({myApplications.filter(a => a.status === 'pending').length})
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    Reviewed ({myApplications.filter(a => a.status === 'reviewed').length})
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    Interview ({myApplications.filter(a => a.status === 'interview').length})
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {myApplications.map((app) => {
                  const job = jobs.find(j => j.id === app.jobId);
                  if (!job) return null;

                  const statusColors = {
                    pending: 'bg-yellow-100 text-yellow-800',
                    reviewed: 'bg-blue-100 text-blue-800',
                    interview: 'bg-green-100 text-green-800',
                    rejected: 'bg-red-100 text-red-800',
                    accepted: 'bg-emerald-100 text-emerald-800'
                  };

                  return (
                    <div key={app.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3>{job.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm ${statusColors[app.status]}`}>
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                              {app.matchScore}% Match
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">{job.company} • {job.location}</p>
                          <p className="text-gray-500 text-sm mb-3">Applied on {app.appliedDate}</p>
                          {app.coverLetter && (
                            <div className="bg-gray-50 p-4 rounded-lg mt-3">
                              <p className="text-sm text-gray-700">{app.coverLetter}</p>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              setSelectedJob(job);
                              setScreen('job-search');
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            View Job
                          </button>
                          <button 
                            onClick={() => withdrawApplication(app.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Withdraw
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {myApplications.length === 0 && (
                  <div className="p-12 text-center">
                    <p className="text-gray-500 mb-4">You haven't applied to any jobs yet</p>
                    <button
                      onClick={() => setScreen('job-search')}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Browse Jobs
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PROFILE */}
        {screen === 'profile' && editedProfile && (
          <div>
            <h1 className="mb-6">My Profile</h1>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="mb-6">Personal Information</h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={editedProfile.location}
                        onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Availability</label>
                      <select
                        value={editedProfile.availability}
                        onChange={(e) => setEditedProfile({ ...editedProfile, availability: e.target.value as any })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      >
                        <option value="full-time">Full-Time</option>
                        <option value="part-time">Part-Time</option>
                        <option value="contract">Contract</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Years of Experience</label>
                      <input
                        type="number"
                        value={editedProfile.experience}
                        onChange={(e) => setEditedProfile({ ...editedProfile, experience: parseInt(e.target.value) })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Education</label>
                    <input
                      type="text"
                      value={editedProfile.education}
                      onChange={(e) => setEditedProfile({ ...editedProfile, education: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Bio</label>
                    <textarea
                      value={editedProfile.bio}
                      onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Expected Salary (Min)</label>
                      <input
                        type="number"
                        value={editedProfile.expectedSalary.min}
                        onChange={(e) => setEditedProfile({
                          ...editedProfile,
                          expectedSalary: { ...editedProfile.expectedSalary, min: parseInt(e.target.value) }
                        })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Expected Salary (Max)</label>
                      <input
                        type="number"
                        value={editedProfile.expectedSalary.max}
                        onChange={(e) => setEditedProfile({
                          ...editedProfile,
                          expectedSalary: { ...editedProfile.expectedSalary, max: parseInt(e.target.value) }
                        })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Skills (comma separated)</label>
                    <input
                      type="text"
                      value={editedProfile.skills.join(', ')}
                      onChange={(e) => setEditedProfile({
                        ...editedProfile,
                        skills: e.target.value.split(',').map(s => s.trim())
                      })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {editedProfile.skills.map((skill, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Portfolio URL</label>
                      <input
                        type="url"
                        value={editedProfile.portfolio || ''}
                        onChange={(e) => setEditedProfile({ ...editedProfile, portfolio: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">LinkedIn</label>
                      <input
                        type="text"
                        value={editedProfile.linkedin || ''}
                        onChange={(e) => setEditedProfile({ ...editedProfile, linkedin: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                  </div>

                  <button
                    onClick={updateProfile}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="col-span-1 space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <h2 className="mb-4">Profile Completion</h2>
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-600 h-3 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                    <p className="text-center mt-2 text-gray-600">95% Complete</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-green-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Basic Information</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Skills Added</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Work Experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>Upload Resume</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <h2 className="mb-4">Quick Stats</h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Profile Views</span>
                      <span className="text-gray-900">234</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Applications</span>
                      <span className="text-gray-900">{myApplications.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Job Matches</span>
                      <span className="text-gray-900">{matchedJobs.filter(j => j.matchScore >= 70).length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EMPLOYER DASHBOARD */}
        {screen === 'employer-dashboard' && (
          <div>
            <div className="mb-8">
              <h1 className="mb-2">Employer Dashboard</h1>
              <p className="text-gray-600">Manage your job postings and candidates</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 mb-1">Active Jobs</p>
                    <p className="text-3xl text-blue-600">{myJobs.filter(j => j.status === 'active').length}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 mb-1">Total Applicants</p>
                    <p className="text-3xl text-green-600">{jobApplications.length}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 mb-1">New Applicants</p>
                    <p className="text-3xl text-purple-600">
                      {jobApplications.filter(a => a.status === 'pending').length}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 mb-1">Interviews</p>
                    <p className="text-3xl text-orange-600">
                      {jobApplications.filter(a => a.status === 'interview').length}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Listings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2>Your Job Postings</h2>
                <button
                  onClick={() => setScreen('post-job')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  + Post New Job
                </button>
              </div>

              <div className="divide-y divide-gray-200">
                {myJobs.map((job) => {
                  const jobApps = jobApplications.filter(a => a.jobId === job.id);
                  return (
                    <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3>{job.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              job.status === 'active' ? 'bg-green-100 text-green-800' :
                              job.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">{job.location} • {job.type}</p>
                          <p className="text-gray-700 mb-3">{job.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{jobApps.length} applicants</span>
                            <span>Posted {job.postedDate}</span>
                            <span>Closes {job.deadline}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setScreen('candidates');
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            View Candidates ({jobApps.length})
                          </button>
                          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {myJobs.length === 0 && (
                  <div className="p-12 text-center">
                    <p className="text-gray-500 mb-4">You haven't posted any jobs yet</p>
                    <button
                      onClick={() => setScreen('post-job')}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Post Your First Job
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2>Recent Applications</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {jobApplications.slice(0, 5).map((app) => {
                  const job = jobs.find(j => j.id === app.jobId);
                  const applicant = jobSeekerProfiles[app.jobSeekerId];
                  if (!job || !applicant) return null;

                  return (
                    <div key={app.id} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedApplication(app);
                        setScreen('candidates');
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="mb-1">{applicant.name}</h3>
                          <p className="text-gray-600 mb-2">Applied for: {job.title}</p>
                          <div className="flex items-center gap-2">
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                              {app.matchScore}% Match
                            </span>
                            <span className="text-gray-500 text-sm">Applied {app.appliedDate}</span>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Review →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* POST JOB */}
        {screen === 'post-job' && (
          <div>
            <h1 className="mb-6">Post a New Job</h1>

            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Job Title *</label>
                  <input
                    type="text"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    placeholder="e.g., Senior Full Stack Developer"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Location *</label>
                    <input
                      type="text"
                      value={newJob.location}
                      onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                      placeholder="e.g., Remote, San Francisco, CA"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Job Type *</label>
                    <select
                      value={newJob.type}
                      onChange={(e) => setNewJob({ ...newJob, type: e.target.value as any })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    >
                      <option value="part-time">Part-Time</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Minimum Salary (₱/month)</label>
                    <input
                      type="number"
                      value={newJob.salaryRange?.min || 0}
                      onChange={(e) => setNewJob({
                        ...newJob,
                        salaryRange: { ...newJob.salaryRange!, min: parseInt(e.target.value) }
                      })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Maximum Salary (₱/month)</label>
                    <input
                      type="number"
                      value={newJob.salaryRange?.max || 0}
                      onChange={(e) => setNewJob({
                        ...newJob,
                        salaryRange: { ...newJob.salaryRange!, max: parseInt(e.target.value) }
                      })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Job Description *</label>
                  <textarea
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    placeholder="Describe the role, responsibilities, and what makes this opportunity great..."
                    rows={6}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Requirements</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={requirementInput}
                      onChange={(e) => setRequirementInput(e.target.value)}
                      placeholder="Add a requirement"
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && requirementInput.trim()) {
                          setNewJob({
                            ...newJob,
                            requirements: [...(newJob.requirements || []), requirementInput.trim()]
                          });
                          setRequirementInput('');
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        if (requirementInput.trim()) {
                          setNewJob({
                            ...newJob,
                            requirements: [...(newJob.requirements || []), requirementInput.trim()]
                          });
                          setRequirementInput('');
                        }
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {newJob.requirements?.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                        <span className="flex-1">{req}</span>
                        <button
                          onClick={() => setNewJob({
                            ...newJob,
                            requirements: newJob.requirements?.filter((_, i) => i !== idx)
                          })}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Required Skills</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      placeholder="Add a skill"
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && skillInput.trim()) {
                          setNewJob({
                            ...newJob,
                            skills: [...(newJob.skills || []), skillInput.trim()]
                          });
                          setSkillInput('');
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        if (skillInput.trim()) {
                          setNewJob({
                            ...newJob,
                            skills: [...(newJob.skills || []), skillInput.trim()]
                          });
                          setSkillInput('');
                        }
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {newJob.skills?.map((skill, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm flex items-center gap-2">
                        {skill}
                        <button
                          onClick={() => setNewJob({
                            ...newJob,
                            skills: newJob.skills?.filter((_, i) => i !== idx)
                          })}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Benefits</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={benefitInput}
                      onChange={(e) => setBenefitInput(e.target.value)}
                      placeholder="Add a benefit"
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && benefitInput.trim()) {
                          setNewJob({
                            ...newJob,
                            benefits: [...(newJob.benefits || []), benefitInput.trim()]
                          });
                          setBenefitInput('');
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        if (benefitInput.trim()) {
                          setNewJob({
                            ...newJob,
                            benefits: [...(newJob.benefits || []), benefitInput.trim()]
                          });
                          setBenefitInput('');
                        }
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {newJob.benefits?.map((benefit, idx) => (
                      <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm flex items-center gap-2">
                        {benefit}
                        <button
                          onClick={() => setNewJob({
                            ...newJob,
                            benefits: newJob.benefits?.filter((_, i) => i !== idx)
                          })}
                          className="text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t">
                  <button
                    onClick={handlePostJob}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Post Job
                  </button>
                  <button
                    onClick={() => setScreen('employer-dashboard')}
                    className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CANDIDATES */}
        {screen === 'candidates' && (
          <div>
            <h1 className="mb-6">Candidate Manager</h1>

            <div className="grid grid-cols-4 gap-6">
              {/* Applications List */}
              <div className="col-span-1 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-sm">Applications ({jobApplications.length})</h2>
                </div>
                <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                  {jobApplications.map((app) => {
                    const applicant = jobSeekerProfiles[app.jobSeekerId];
                    const job = jobs.find(j => j.id === app.jobId);
                    if (!applicant || !job) return null;

                    return (
                      <div
                        key={app.id}
                        onClick={() => setSelectedApplication(app)}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedApplication?.id === app.id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <h3 className="text-sm mb-1">{applicant.name}</h3>
                        <p className="text-xs text-gray-600 mb-2">{job.title}</p>
                        <div className="flex items-center gap-1">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                            {app.matchScore}%
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            app.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                            app.status === 'interview' ? 'bg-green-100 text-green-800' :
                            app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-emerald-100 text-emerald-800'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Candidate Details */}
              <div className="col-span-3">
                {selectedApplication ? (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    {(() => {
                      const applicant = jobSeekerProfiles[selectedApplication.jobSeekerId];
                      const job = jobs.find(j => j.id === selectedApplication.jobId);
                      if (!applicant || !job) return null;

                      return (
                        <>
                          <div className="p-6 border-b border-gray-200">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h2 className="mb-2">{applicant.name}</h2>
                                <p className="text-gray-600 mb-2">{applicant.location}</p>
                                <div className="flex items-center gap-2">
                                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                                    {selectedApplication.matchScore}% Match
                                  </span>
                                  <span className="text-gray-600">Applied {selectedApplication.appliedDate}</span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => updateApplicationStatus(selectedApplication.id, 'interview')}
                                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                  Schedule Interview
                                </button>
                                <button
                                  onClick={() => updateApplicationStatus(selectedApplication.id, 'rejected')}
                                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                                >
                                  Reject
                                </button>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => updateApplicationStatus(selectedApplication.id, 'pending')}
                                className={`px-4 py-2 rounded-lg ${
                                  selectedApplication.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                Pending
                              </button>
                              <button
                                onClick={() => updateApplicationStatus(selectedApplication.id, 'reviewed')}
                                className={`px-4 py-2 rounded-lg ${
                                  selectedApplication.status === 'reviewed'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                Reviewed
                              </button>
                              <button
                                onClick={() => updateApplicationStatus(selectedApplication.id, 'interview')}
                                className={`px-4 py-2 rounded-lg ${
                                  selectedApplication.status === 'interview'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                Interview
                              </button>
                              <button
                                onClick={() => updateApplicationStatus(selectedApplication.id, 'accepted')}
                                className={`px-4 py-2 rounded-lg ${
                                  selectedApplication.status === 'accepted'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                Accepted
                              </button>
                              <button
                                onClick={() => updateApplicationStatus(selectedApplication.id, 'rejected')}
                                className={`px-4 py-2 rounded-lg ${
                                  selectedApplication.status === 'rejected'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                Rejected
                              </button>
                            </div>
                          </div>

                          <div className="p-6">
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <h3 className="mb-3">Contact Information</h3>
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <span className="text-gray-600">Email:</span>
                                    <span className="ml-2">{applicant.email}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">Phone:</span>
                                    <span className="ml-2">{applicant.phone}</span>
                                  </div>
                                  {applicant.linkedin && (
                                    <div>
                                      <span className="text-gray-600">LinkedIn:</span>
                                      <span className="ml-2 text-blue-600">{applicant.linkedin}</span>
                                    </div>
                                  )}
                                  {applicant.portfolio && (
                                    <div>
                                      <span className="text-gray-600">Portfolio:</span>
                                      <span className="ml-2 text-blue-600">{applicant.portfolio}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div>
                                <h3 className="mb-3">Job Preferences</h3>
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <span className="text-gray-600">Availability:</span>
                                    <span className="ml-2 capitalize">{applicant.availability}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">Expected Salary:</span>
                                    <span className="ml-2">
                                      ₱{applicant.expectedSalary.min.toLocaleString()} - ₱{applicant.expectedSalary.max.toLocaleString()}/month
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">Experience:</span>
                                    <span className="ml-2">{applicant.experience} years</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-6">
                              <h3 className="mb-3">Education</h3>
                              <p className="text-gray-700">{applicant.education}</p>
                            </div>

                            <div className="mt-6">
                              <h3 className="mb-3">Bio</h3>
                              <p className="text-gray-700">{applicant.bio}</p>
                            </div>

                            <div className="mt-6">
                              <h3 className="mb-3">Skills</h3>
                              <div className="flex flex-wrap gap-2">
                                {applicant.skills.map((skill, idx) => (
                                  <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {selectedApplication.coverLetter && (
                              <div className="mt-6">
                                <h3 className="mb-3">Cover Letter</h3>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <p className="text-gray-700">{selectedApplication.coverLetter}</p>
                                </div>
                              </div>
                            )}

                            <div className="mt-6">
                              <h3 className="mb-3">Match Analysis</h3>
                              <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="mb-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-700">Overall Match</span>
                                    <span className="text-sm">{selectedApplication.matchScore}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-blue-600 h-2 rounded-full"
                                      style={{ width: `${selectedApplication.matchScore}%` }}
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2 text-sm">
                                  <div className="flex items-center justify-between">
                                    <span className="text-gray-700">Skills Match:</span>
                                    <span>
                                      {job.skills.filter(s => applicant.skills.includes(s)).length} / {job.skills.length} skills
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-gray-700">Availability:</span>
                                    <span className={applicant.availability === job.type || applicant.availability === 'flexible' ? 'text-green-600' : 'text-yellow-600'}>
                                      {applicant.availability === job.type || applicant.availability === 'flexible' ? 'Match' : 'Partial Match'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-gray-500">Select an application to view candidate details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MESSAGES */}
        {screen === 'messages' && (
          <div>
            <h1 className="mb-6">Messages</h1>

            <div className="grid grid-cols-4 gap-6">
              {/* Conversations List */}
              <div className="col-span-1 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-sm">Conversations</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {userConversations.map((conv) => {
                    const otherUser = conv.participants.find(p => p !== currentUser.id);
                    const otherUserName = getParticipantName(otherUser!);

                    return (
                      <div
                        key={conv.id}
                        onClick={() => setSelectedConversation(conv)}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedConversation?.id === conv.id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm">{otherUserName}</h3>
                          {conv.unreadCount > 0 && (
                            <span className="bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2">{conv.lastMessage}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(conv.lastMessageTime).toLocaleDateString()}
                        </p>
                      </div>
                    );
                  })}

                  {userConversations.length === 0 && (
                    <div className="p-8 text-center text-gray-500 text-sm">
                      No conversations yet
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Area */}
              <div className="col-span-3 bg-white rounded-xl shadow-sm border border-gray-200">
                {selectedConversation ? (
                  <>
                    <div className="p-4 border-b border-gray-200">
                      <h2>
                        {getParticipantName(
                          selectedConversation.participants.find(p => p !== currentUser.id)!
                        )}
                      </h2>
                    </div>

                    <div className="p-6 h-[500px] overflow-y-auto">
                      <div className="space-y-4">
                        {selectedMessages.map((msg) => {
                          const isMe = msg.senderId === currentUser.id;
                          return (
                            <div
                              key={msg.id}
                              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                            >
                              <div
                                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                                  isMe
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-900'
                                }`}
                              >
                                <p>{msg.content}</p>
                                <p className={`text-xs mt-1 ${isMe ? 'text-blue-100' : 'text-gray-500'}`}>
                                  {new Date(msg.timestamp).toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="p-4 border-t border-gray-200">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <button
                          onClick={sendMessage}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center p-12">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <p className="text-gray-500">Select a conversation to start messaging</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Application Modal */}
      {showApplicationModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="mb-2">Apply for {selectedJob.title}</h2>
              <p className="text-gray-600">{selectedJob.company}</p>
            </div>

            <div className="p-6">
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Match Score:</strong> {calculateMatchScore(selectedJob, currentProfile!)}%
                </p>
                <p className="text-sm text-gray-700">
                  Based on your skills, experience, and preferences
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">
                  Cover Letter (Optional)
                </label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Why are you interested in this position? What makes you a great fit?"
                  rows={6}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={submitApplication}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Application
                </button>
                <button
                  onClick={() => {
                    setShowApplicationModal(false);
                    setSelectedJob(null);
                    setCoverLetter('');
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-gray-700">SmartHireLink AI</span>
            </div>
            <div className="flex space-x-6 text-gray-600">
              <a href="#" className="hover:text-blue-600 transition-colors">About</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Help Center</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            </div>
            <p className="text-gray-600 text-sm">© 2025 SmartHireLink AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
