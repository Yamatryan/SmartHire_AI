import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Briefcase, Users, UserPlus, Plus, Edit, Eye, Archive } from 'lucide-react';
import type { Screen } from '../../types';

interface EmployerDashboardProps {
  onNavigate: (screen: Screen, jobId?: string) => void;
}

const jobPostings = [
  {
    id: '1',
    title: 'Web Developer (Part-Time)',
    applicants: 25,
    status: 'Active',
    postedDate: '2024-11-01',
  },
  {
    id: '2',
    title: 'Admin Assistant (Weekend)',
    applicants: 12,
    status: 'Active',
    postedDate: '2024-11-03',
  },
  {
    id: '3',
    title: 'Marketing Intern',
    applicants: 5,
    status: 'Closed',
    postedDate: '2024-10-20',
  },
];

export default function EmployerDashboard({ onNavigate }: EmployerDashboardProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Quick Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Active Posts</p>
                <h2>5</h2>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Total Applicants</p>
                <h2>120</h2>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">New Applicants</p>
                <h2>8</h2>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-600 text-white">
          <CardContent className="p-6">
            <Button 
              className="w-full h-full bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => onNavigate('post-job')}
            >
              <Plus className="w-5 h-5 mr-2" />
              Post a New Job
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Job Postings Management */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Job Postings Management</CardTitle>
          <CardDescription>Manage your active and closed job postings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Applicants</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Posted Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobPostings.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{job.applicants}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={job.status === 'Active' ? 'default' : 'outline'}>
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(job.postedDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {job.status === 'Active' ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onNavigate('candidate-manager', job.id)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Candidates
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </>
                      ) : (
                        <Button variant="outline" size="sm">
                          <Archive className="w-4 h-4 mr-1" />
                          Archive
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Company Profile Preview */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Company Profile</CardTitle>
              <CardDescription>Preview how candidates see your company</CardDescription>
            </div>
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Company Info
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6">
            <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
              <Briefcase className="w-12 h-12 text-gray-400" />
            </div>
            <div className="flex-1">
              <h2 className="mb-2">TechStart Inc.</h2>
              <p className="text-gray-600 mb-3">
                A leading technology company focused on innovative solutions for modern businesses.
                We're committed to creating a flexible and supportive work environment.
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary">Technology</Badge>
                <Badge variant="secondary">50-100 employees</Badge>
                <Badge variant="secondary">San Francisco, CA</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
