import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { MapPin, DollarSign, Clock, Bookmark, ExternalLink, TrendingUp } from 'lucide-react';
import type { Screen } from '../../types';

interface DashboardProps {
  onNavigate: (screen: Screen) => void;
}

const topMatches = [
  {
    id: '1',
    title: 'Part-Time Web Developer',
    company: 'TechStart Inc.',
    location: 'Remote',
    salary: '$30-45/hr',
    matchScore: 95,
    postedDays: 2,
    description: 'Looking for a skilled web developer for part-time work on React projects.',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
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
    matchScore: 90,
    postedDays: 1,
    description: 'Help with social media management and content creation on weekends.',
    skills: ['Social Media', 'Content Writing', 'Canva'],
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
    matchScore: 87,
    postedDays: 5,
    description: 'Create visual designs for client projects on a flexible schedule.',
    skills: ['Adobe Photoshop', 'Illustrator', 'UI Design'],
    matchBreakdown: {
      skills: 90,
      availability: 85,
      experience: 86,
    }
  },
];

export default function JobSeekerDashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-6">
        {/* Left Sidebar */}
        <aside className="w-80 space-y-4">
          {/* Profile Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Progress</CardTitle>
              <CardDescription>Complete your profile to get better matches</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">60% Complete</span>
                </div>
                <Progress value={60} />
              </div>
              <Button className="w-full" onClick={() => onNavigate('job-seeker-profile')}>
                Finish Profile Now
              </Button>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2">📝</span>
                Application Tracker (2)
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Bookmark className="w-4 h-4 mr-2" />
                Saved Jobs (5)
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2">📅</span>
                Interviews Scheduled (1)
              </Button>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-gray-700">
                Adding "Node.js" to your skills could increase your match score by 15% for available positions.
              </p>
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="mb-6">
            <h1 className="mb-2">Top Matches For You</h1>
            <p className="text-gray-600">Based on your skills, availability, and preferences</p>
          </div>

          <div className="space-y-6">
            {topMatches.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2>{job.title}</h2>
                        <Badge variant="default" className="bg-green-500">
                          {job.matchScore}% Match
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{job.company}</p>
                      <div className="flex gap-4 text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.postedDays}d ago
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{job.description}</p>
                      <div className="flex gap-2 mb-4">
                        {job.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Bookmark className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Match Score Breakdown */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h3 className="mb-3">Match Score Breakdown</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">Skills Match</span>
                          <span>{job.matchBreakdown.skills}%</span>
                        </div>
                        <Progress value={job.matchBreakdown.skills} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">Availability Match</span>
                          <span>{job.matchBreakdown.availability}%</span>
                        </div>
                        <Progress value={job.matchBreakdown.availability} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">Experience Match</span>
                          <span>{job.matchBreakdown.experience}%</span>
                        </div>
                        <Progress value={job.matchBreakdown.experience} className="h-2" />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button className="flex-1">Apply Now</Button>
                    <Button variant="outline" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline">Save</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" size="lg" onClick={() => onNavigate('job-search')}>
              View All Jobs
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
