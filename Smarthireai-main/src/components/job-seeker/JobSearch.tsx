import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Slider } from '../ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { MapPin, DollarSign, Clock, Zap } from 'lucide-react';
import type { Screen } from '../../types';

interface JobSearchProps {
  onNavigate: (screen: Screen) => void;
}

const allJobs = [
  {
    id: '1',
    title: 'Part-Time Web Developer',
    company: 'TechStart Inc.',
    location: 'Remote',
    salary: '$30-45/hr',
    type: 'Part-Time',
    postedDays: 2,
    skills: ['React', 'TypeScript'],
  },
  {
    id: '2',
    title: 'Weekend Marketing Assistant',
    company: 'Creative Agency Co.',
    location: 'New York, NY',
    salary: '$25/hr',
    type: 'Part-Time',
    postedDays: 1,
    skills: ['Social Media', 'Content Writing'],
  },
  {
    id: '3',
    title: 'Contract Data Analyst',
    company: 'Analytics Corp',
    location: 'San Francisco, CA',
    salary: '$40-60/hr',
    type: 'Contract',
    postedDays: 3,
    skills: ['Python', 'SQL', 'Data Visualization'],
  },
  {
    id: '4',
    title: 'Freelance Content Writer',
    company: 'Media House',
    location: 'Remote',
    salary: '$20-35/hr',
    type: 'Freelance',
    postedDays: 4,
    skills: ['Writing', 'SEO', 'Research'],
  },
  {
    id: '5',
    title: 'Part-Time UX Designer',
    company: 'Design Studio',
    location: 'Austin, TX',
    salary: '$35-50/hr',
    type: 'Part-Time',
    postedDays: 2,
    skills: ['Figma', 'User Research', 'Prototyping'],
  },
];

export default function JobSearch({ onNavigate }: JobSearchProps) {
  const [jobType, setJobType] = useState<string>('all');
  const [locationRadius, setLocationRadius] = useState([25]);
  const [salaryRange, setSalaryRange] = useState([20, 60]);
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const skills = ['React', 'TypeScript', 'Python', 'SQL', 'Figma', 'Content Writing', 'SEO'];

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-6">
        {/* Left Filter Panel */}
        <aside className="w-80">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-6">Rule-Based Filters</h2>
              
              {/* Job Type */}
              <div className="mb-6">
                <Label className="mb-2 block">Job Type</Label>
                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="part-time">Part-Time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="mb-6">
                <Label className="mb-2 block">Location</Label>
                <Input placeholder="City or Remote" />
                <div className="mt-3">
                  <Label className="mb-2 block text-gray-600">
                    Radius: {locationRadius[0]} miles
                  </Label>
                  <Slider
                    value={locationRadius}
                    onValueChange={setLocationRadius}
                    max={100}
                    step={5}
                  />
                </div>
              </div>

              {/* Required Skills */}
              <div className="mb-6">
                <Label className="mb-3 block">Required Skills</Label>
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={skill}
                        checked={selectedSkills.includes(skill)}
                        onCheckedChange={() => toggleSkill(skill)}
                      />
                      <Label htmlFor={skill} className="text-gray-700">
                        {skill}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <Label className="mb-3 block">Availability</Label>
                <div className="space-y-2">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox id={day} />
                      <Label htmlFor={day} className="text-gray-700">
                        {day}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div className="mb-6">
                <Label className="mb-2 block">
                  Salary Range: ${salaryRange[0]} - ${salaryRange[1]}/hr
                </Label>
                <Slider
                  value={salaryRange}
                  onValueChange={setSalaryRange}
                  max={100}
                  step={5}
                  className="mb-2"
                />
              </div>

              <Button className="w-full">Apply Filters</Button>
            </CardContent>
          </Card>
        </aside>

        {/* Right Results List */}
        <main className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="mb-1">Search Results</h1>
              <p className="text-gray-600">500+ jobs found</p>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Sort By: Relevance (Match Score)</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="salary">Highest Salary</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {allJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h2 className="mb-2">{job.title}</h2>
                      <p className="text-gray-600 mb-3">{job.company}</p>
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
                      <div className="flex gap-2 mb-3">
                        <Badge variant="outline">{job.type}</Badge>
                        {job.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Quick Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <div className="flex gap-2">
              <Button variant="outline">Previous</Button>
              <Button variant="default">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
