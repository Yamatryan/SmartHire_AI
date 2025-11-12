import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { MessageSquare, Calendar, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import type { Screen } from '../../types';
import { ScrollArea } from '../ui/scroll-area';

interface CandidateManagerProps {
  jobId: string | null;
  onNavigate: (screen: Screen) => void;
}

const candidates = [
  {
    id: '1',
    name: 'Sarah Johnson',
    matchScore: 98,
    location: 'San Francisco, CA',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 234-5678',
    status: 'New',
    appliedDate: '2024-11-05',
    skills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    experience: '5 years',
    matchBreakdown: {
      skills: 98,
      availability: 100,
      experience: 96,
    },
    bio: 'Experienced full-stack developer with a strong focus on React and modern web technologies. Passionate about creating intuitive user experiences.',
    education: 'BS Computer Science, Stanford University',
    portfolio: 'https://sarahjohnson.dev',
  },
  {
    id: '2',
    name: 'Michael Chen',
    matchScore: 85,
    location: 'Remote',
    email: 'mchen@example.com',
    phone: '+1 (555) 345-6789',
    status: 'Interview',
    appliedDate: '2024-11-04',
    skills: ['React', 'JavaScript', 'CSS', 'Git'],
    experience: '3 years',
    matchBreakdown: {
      skills: 82,
      availability: 95,
      experience: 78,
    },
    bio: 'Frontend developer specializing in React and responsive design. Quick learner with strong problem-solving skills.',
    education: 'BS Software Engineering, UC Berkeley',
    portfolio: 'https://michaelchen.io',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    matchScore: 78,
    location: 'Austin, TX',
    email: 'emily.r@example.com',
    phone: '+1 (555) 456-7890',
    status: 'New',
    appliedDate: '2024-11-03',
    skills: ['React', 'HTML', 'CSS', 'JavaScript'],
    experience: '2 years',
    matchBreakdown: {
      skills: 75,
      availability: 90,
      experience: 70,
    },
    bio: 'Junior developer eager to grow skills in React development. Strong foundation in web fundamentals.',
    education: 'Bootcamp Graduate, General Assembly',
    portfolio: 'https://emilyrodriguez.com',
  },
];

export default function CandidateManager({ jobId, onNavigate }: CandidateManagerProps) {
  const [selectedCandidate, setSelectedCandidate] = useState(candidates[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('match');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-6">
        {/* Left: Candidate List */}
        <aside className="w-96">
          <Card className="h-[calc(100vh-12rem)]">
            <CardHeader>
              <CardTitle>Web Developer (Part-Time)</CardTitle>
              <CardDescription>25 Applicants</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {/* Search and Filters */}
              <div className="px-6 pb-4 space-y-3">
                <Input
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="interview">Interview</SelectItem>
                      <SelectItem value="hired">Hired</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="match">Match Score (Highest)</SelectItem>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="name">Name (A-Z)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Candidate List */}
              <ScrollArea className="h-[calc(100vh-28rem)]">
                <div className="space-y-2 px-6 pb-6">
                  {candidates.map((candidate) => (
                    <Card
                      key={candidate.id}
                      className={`cursor-pointer transition-all ${
                        selectedCandidate.id === candidate.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedCandidate(candidate)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src="" />
                              <AvatarFallback>
                                {candidate.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3>{candidate.name}</h3>
                              <p className="text-gray-600">{candidate.experience}</p>
                            </div>
                          </div>
                          <Badge className="bg-green-500">{candidate.matchScore}%</Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </aside>

        {/* Right: Candidate Details */}
        <main className="flex-1">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{selectedCandidate.name}</CardTitle>
                    <CardDescription>{selectedCandidate.experience} experience</CardDescription>
                  </div>
                </div>
                <Badge className="bg-green-500">{selectedCandidate.matchScore}% Match</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {selectedCandidate.location}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  {selectedCandidate.email}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  {selectedCandidate.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <ExternalLink className="w-4 h-4" />
                  <a href={selectedCandidate.portfolio} className="text-blue-600 hover:underline">
                    Portfolio
                  </a>
                </div>
              </div>

              {/* Application Status */}
              <div>
                <h3 className="mb-3">Application Status</h3>
                <Select defaultValue={selectedCandidate.status.toLowerCase()}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="offer">Offer Sent</SelectItem>
                    <SelectItem value="hired">Hired</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Match Analysis */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="mb-4">Match Analysis</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Skills Match</span>
                      <span>{selectedCandidate.matchBreakdown.skills}%</span>
                    </div>
                    <Progress value={selectedCandidate.matchBreakdown.skills} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Availability Match</span>
                      <span>{selectedCandidate.matchBreakdown.availability}%</span>
                    </div>
                    <Progress value={selectedCandidate.matchBreakdown.availability} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Experience Match</span>
                      <span>{selectedCandidate.matchBreakdown.experience}%</span>
                    </div>
                    <Progress value={selectedCandidate.matchBreakdown.experience} />
                  </div>
                </div>
                {selectedCandidate.matchBreakdown.skills < 85 && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-yellow-900">
                      ⚠️ Missing 1 core skill: TypeScript
                    </p>
                  </div>
                )}
              </div>

              {/* Skills */}
              <div>
                <h3 className="mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div>
                <h3 className="mb-3">About</h3>
                <p className="text-gray-700">{selectedCandidate.bio}</p>
              </div>

              {/* Education */}
              <div>
                <h3 className="mb-3">Education</h3>
                <p className="text-gray-700">{selectedCandidate.education}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button className="flex-1" onClick={() => onNavigate('messages')}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message Candidate
                </Button>
                <Button variant="outline" className="flex-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Interview
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
