import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { User as UserIcon, Briefcase, Calendar, Upload, X } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { User } from '../../utils/mockAuth';

interface JobSeekerProfileProps {
  currentUser: User;
}

export default function JobSeekerProfile({ currentUser }: JobSeekerProfileProps) {
  const [activeSection, setActiveSection] = useState('personal');
  const [skills, setSkills] = useState(['React', 'TypeScript', 'Node.js', 'Tailwind CSS']);
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const sections = [
    { id: 'personal', label: 'Personal Information', icon: UserIcon },
    { id: 'skills', label: 'Skills & Experience', icon: Briefcase },
    { id: 'availability', label: 'Availability & Prefs', icon: Calendar },
    { id: 'resume', label: 'Resume Upload', icon: Upload },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-6">
        {/* Left Navigation */}
        <aside className="w-80">
          <Card>
            <CardContent className="p-6">
              {/* Profile Photo */}
              <div className="text-center mb-6">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="" />
                  <AvatarFallback>
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  Change Photo
                </Button>
              </div>

              {/* Section Navigation */}
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <Button
                      key={section.id}
                      variant={activeSection === section.id ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setActiveSection(section.id)}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {section.label}
                    </Button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </aside>

        {/* Right Profile Content */}
        <main className="flex-1">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>
                    {sections.find(s => s.id === activeSection)?.label}
                  </CardTitle>
                  <CardDescription>
                    Update your profile information to get better job matches
                  </CardDescription>
                </div>
                <Button>Edit</Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Personal Information Section */}
              {activeSection === 'personal' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue={currentUser.name.split(' ')[0]} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue={currentUser.name.split(' ')[1] || ''} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue={currentUser.email} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue="San Francisco, CA" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      placeholder="Tell us about yourself..."
                      defaultValue="Experienced web developer with a passion for creating user-friendly applications."
                    />
                  </div>

                  <Button>Save Changes</Button>
                </div>
              )}

              {/* Skills & Experience Section */}
              {activeSection === 'skills' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Skills</Label>
                    <div className="flex gap-2 mb-3">
                      <Input
                        placeholder="Add a skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      />
                      <Button onClick={addSkill}>Add</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
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
                    <Label htmlFor="experience">Work Experience</Label>
                    <Textarea
                      id="experience"
                      rows={6}
                      placeholder="Describe your work experience..."
                      defaultValue="Senior Frontend Developer at Tech Corp (2020-Present)&#10;- Led development of customer-facing web applications&#10;- Mentored junior developers&#10;&#10;Frontend Developer at StartupXYZ (2018-2020)&#10;- Built responsive web applications using React"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education">Education</Label>
                    <Textarea
                      id="education"
                      rows={3}
                      placeholder="Your educational background..."
                      defaultValue="Bachelor of Science in Computer Science&#10;University of California, Berkeley (2014-2018)"
                    />
                  </div>

                  <Button>Save Changes</Button>
                </div>
              )}

              {/* Availability Section */}
              {activeSection === 'availability' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label>Available Days</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                        <div key={day} className="flex items-center space-x-2">
                          <Checkbox id={day} defaultChecked={day !== 'Sunday'} />
                          <Label htmlFor={day}>{day}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hours">Preferred Hours per Week</Label>
                    <Input id="hours" type="number" defaultValue="20" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shift">Preferred Shift</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="morning" defaultChecked />
                        <Label htmlFor="morning">Morning (8am - 12pm)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="afternoon" defaultChecked />
                        <Label htmlFor="afternoon">Afternoon (12pm - 5pm)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="evening" />
                        <Label htmlFor="evening">Evening (5pm - 9pm)</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startDate">Available Start Date</Label>
                    <Input id="startDate" type="date" />
                  </div>

                  <Button>Save Changes</Button>
                </div>
              )}

              {/* Resume Upload Section */}
              {activeSection === 'resume' && (
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="mb-2">Drag and drop your resume here, or click to browse</p>
                    <p className="text-gray-500 mb-4">PDF, DOC, DOCX (Max 5MB)</p>
                    <Button>Choose File</Button>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="mb-2">Current Resume</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                          <Upload className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p>John_Smith_Resume.pdf</p>
                          <p className="text-gray-500">Uploaded on Oct 15, 2024</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Delete</Button>
                      </div>
                    </div>
                  </div>

                  <Button>Save Changes</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
