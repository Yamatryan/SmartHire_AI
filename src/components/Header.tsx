import { Bell, Search, User, Briefcase, MessageSquare, Home, FileText, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

type Screen = 
  | 'login' 
  | 'job-seeker-dashboard' 
  | 'job-search' 
  | 'job-seeker-profile' 
  | 'employer-dashboard' 
  | 'post-job' 
  | 'candidate-manager' 
  | 'messages';

interface HeaderProps {
  userRole: 'job-seeker' | 'employer';
  currentScreen: string;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  userName: string;
}

export default function Header({ userRole, currentScreen, onNavigate, onLogout, userName }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-8 h-8 text-blue-600" />
              <span className="text-blue-600">SmartHireLink AI</span>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-1">
              {userRole === 'job-seeker' && (
                <>
                  <Button
                    variant={currentScreen === 'job-seeker-dashboard' ? 'default' : 'ghost'}
                    onClick={() => onNavigate('job-seeker-dashboard')}
                    className="flex items-center space-x-2"
                  >
                    <Home className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Button>
                  <Button
                    variant={currentScreen === 'job-search' ? 'default' : 'ghost'}
                    onClick={() => onNavigate('job-search')}
                    className="flex items-center space-x-2"
                  >
                    <Search className="w-4 h-4" />
                    <span>Jobs</span>
                  </Button>
                  <Button
                    variant={currentScreen === 'messages' ? 'default' : 'ghost'}
                    onClick={() => onNavigate('messages')}
                    className="flex items-center space-x-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Messages</span>
                  </Button>
                  <Button
                    variant={currentScreen === 'job-seeker-profile' ? 'default' : 'ghost'}
                    onClick={() => onNavigate('job-seeker-profile')}
                    className="flex items-center space-x-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Profile</span>
                  </Button>
                </>
              )}
              {userRole === 'employer' && (
                <>
                  <Button
                    variant={currentScreen === 'employer-dashboard' ? 'default' : 'ghost'}
                    onClick={() => onNavigate('employer-dashboard')}
                    className="flex items-center space-x-2"
                  >
                    <Home className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Button>
                  <Button
                    variant={currentScreen === 'post-job' ? 'default' : 'ghost'}
                    onClick={() => onNavigate('post-job')}
                    className="flex items-center space-x-2"
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Post Job</span>
                  </Button>
                  <Button
                    variant={currentScreen === 'messages' ? 'default' : 'ghost'}
                    onClick={() => onNavigate('messages')}
                    className="flex items-center space-x-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Messages</span>
                  </Button>
                </>
              )}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search..."
                className="pl-10"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p>{userName}</p>
                    <p className="text-gray-500">{userRole === 'job-seeker' ? 'Job Seeker' : 'Employer'}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
