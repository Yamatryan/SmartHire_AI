import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Briefcase } from 'lucide-react';
import { User, mockUsers } from '../../utils/mockAuth';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (user) {
      onLogin(user);
    } else {
      alert('Invalid credentials. Try: jobseeker@demo.com / password123');
    }
  };

  const handleDemoLogin = (role: 'job-seeker' | 'employer') => {
    const demoUser = mockUsers.find(u => u.role === role);
    if (demoUser) {
      onLogin(demoUser);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <Briefcase className="w-12 h-12 text-blue-600" />
            <span className="text-blue-600 text-3xl">SmartHireLink AI</span>
          </div>
          <p className="text-gray-600">AI-Powered Job Matching Platform</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-blue-900">
                  <strong>Demo Credentials:</strong><br/>
                  Job Seeker: jobseeker@demo.com / password123<br/>
                  Employer: employer@demo.com / password123
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Log In
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-2">Quick Demo Access:</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleDemoLogin('job-seeker')}
            >
              Demo as Job Seeker
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleDemoLogin('employer')}
            >
              Demo as Employer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
