import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { X } from 'lucide-react';
import type { Screen } from '../../types';

interface PostJobProps {
  onNavigate: (screen: Screen) => void;
}

export default function PostJob({ onNavigate }: PostJobProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [requiredSkills, setRequiredSkills] = useState<string[]>(['React', 'TypeScript']);
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !requiredSkills.includes(newSkill.trim())) {
      setRequiredSkills([...requiredSkills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setRequiredSkills(requiredSkills.filter(skill => skill !== skillToRemove));
  };

  const steps = [
    { number: 1, title: 'Details' },
    { number: 2, title: 'Requirements' },
    { number: 3, title: 'Review/Post' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step.number
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step.number}
                </div>
                <span className="mt-2 text-gray-600">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-24 h-1 mx-4 ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>
            {currentStep === 1 && 'Job Details'}
            {currentStep === 2 && 'Requirements'}
            {currentStep === 3 && 'Review & Post'}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && 'Provide basic information about the job position'}
            {currentStep === 2 && 'Define skills and availability requirements'}
            {currentStep === 3 && 'Review your job posting before publishing'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Step 1: Job Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input id="jobTitle" placeholder="e.g., Part-Time Web Developer" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g., San Francisco, CA or Remote" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobType">Job Type</Label>
                <Select>
                  <SelectTrigger id="jobType">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="part-time">Part-Time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                    <SelectItem value="temporary">Temporary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  rows={6}
                  placeholder="Provide a detailed description of the role, responsibilities, and what you're looking for..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salaryMin">Minimum Salary ($/hr)</Label>
                  <Input id="salaryMin" type="number" placeholder="30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salaryMax">Maximum Salary ($/hr)</Label>
                  <Input id="salaryMax" type="number" placeholder="45" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Requirements */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Required Skills</Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Add a required skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  />
                  <Button type="button" onClick={addSkill}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {requiredSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1">
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-2 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Required Availability</Label>
                <div className="grid grid-cols-2 gap-3">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox id={`req-${day}`} />
                      <Label htmlFor={`req-${day}`}>{day}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hoursPerWeek">Required Hours per Week</Label>
                <Input id="hoursPerWeek" type="number" placeholder="20" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experienceLevel">Experience Level</Label>
                <Select>
                  <SelectTrigger id="experienceLevel">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <h3 className="text-gray-600 mb-1">Job Title</h3>
                  <p>Part-Time Web Developer</p>
                </div>
                <div>
                  <h3 className="text-gray-600 mb-1">Location</h3>
                  <p>Remote</p>
                </div>
                <div>
                  <h3 className="text-gray-600 mb-1">Job Type</h3>
                  <Badge>Part-Time</Badge>
                </div>
                <div>
                  <h3 className="text-gray-600 mb-1">Salary Range</h3>
                  <p>$30 - $45/hr</p>
                </div>
                <div>
                  <h3 className="text-gray-600 mb-1">Required Skills</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {requiredSkills.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-gray-600 mb-1">Description</h3>
                  <p>Looking for a skilled web developer to work on React-based projects...</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-900">
                  Your job posting will be published immediately and will be visible to all job seekers
                  on the platform. You'll receive notifications when candidates apply.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => {
                if (currentStep === 1) {
                  onNavigate('employer-dashboard');
                } else {
                  setCurrentStep(currentStep - 1);
                }
              }}
            >
              {currentStep === 1 ? 'Cancel' : 'Previous'}
            </Button>
            <Button
              onClick={() => {
                if (currentStep === 3) {
                  onNavigate('employer-dashboard');
                } else {
                  setCurrentStep(currentStep + 1);
                }
              }}
            >
              {currentStep === 3 ? 'Post Job' : 'Next: ' + steps[currentStep].title}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
