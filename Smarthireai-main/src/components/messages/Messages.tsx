import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Send, Search, Paperclip, ExternalLink } from 'lucide-react';
import type { UserRole } from '../../types';

interface MessagesProps {
  userRole: UserRole;
}

const conversations = [
  {
    id: '1',
    name: 'TechStart Inc.',
    role: 'employer',
    lastMessage: 'Thanks for your application! We'd love to schedule an interview.',
    timestamp: '2 hours ago',
    unread: true,
    jobTitle: 'Part-Time Web Developer',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'candidate',
    lastMessage: 'I'm available for an interview next week.',
    timestamp: '5 hours ago',
    unread: false,
    jobTitle: 'Part-Time Web Developer',
  },
  {
    id: '3',
    name: 'Creative Agency Co.',
    role: 'employer',
    lastMessage: 'Your portfolio looks great! Can you start immediately?',
    timestamp: '1 day ago',
    unread: false,
    jobTitle: 'Weekend Marketing Assistant',
  },
];

const messages = [
  {
    id: '1',
    sender: 'them',
    content: 'Hi! We received your application for the Part-Time Web Developer position.',
    timestamp: '10:30 AM',
  },
  {
    id: '2',
    sender: 'them',
    content: 'Your skills and experience look like a great match for what we're looking for!',
    timestamp: '10:31 AM',
  },
  {
    id: '3',
    sender: 'me',
    content: 'Thank you for reaching out! I'm very interested in this opportunity.',
    timestamp: '10:45 AM',
  },
  {
    id: '4',
    sender: 'me',
    content: 'I have 5 years of experience with React and TypeScript, and I'm available to start immediately.',
    timestamp: '10:46 AM',
  },
  {
    id: '5',
    sender: 'them',
    content: 'That's perfect! We'd love to schedule an interview with you. Are you available next Tuesday at 2 PM?',
    timestamp: '11:15 AM',
  },
  {
    id: '6',
    sender: 'system',
    content: 'Interview scheduled for Tuesday, November 12 at 2:00 PM',
    timestamp: '11:20 AM',
  },
];

export default function Messages({ userRole }: MessagesProps) {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, this would send the message
      setMessageInput('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-6 h-[calc(100vh-12rem)]">
        {/* Left: Conversation List */}
        <aside className="w-96">
          <Card className="h-full">
            <CardContent className="p-0 h-full flex flex-col">
              {/* Search */}
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search contacts..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">All</Button>
                  <Button variant="ghost" size="sm">Unread</Button>
                  <Button variant="ghost" size="sm">Interview</Button>
                </div>
              </div>

              {/* Conversation List */}
              <ScrollArea className="flex-1">
                <div className="divide-y">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      className={`p-4 cursor-pointer transition-colors ${
                        selectedConversation.id === conv.id
                          ? 'bg-blue-50'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedConversation(conv)}
                    >
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarImage src="" />
                          <AvatarFallback>
                            {conv.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="truncate">{conv.name}</h3>
                            <span className="text-gray-500 ml-2">{conv.timestamp}</span>
                          </div>
                          <p className="text-gray-600 mb-1">{conv.jobTitle}</p>
                          <p className="text-gray-600 truncate">{conv.lastMessage}</p>
                        </div>
                        {conv.unread && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </aside>

        {/* Right: Chat Window */}
        <main className="flex-1">
          <Card className="h-full flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {selectedConversation.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2>{selectedConversation.name}</h2>
                    <p className="text-gray-600">{selectedConversation.jobTitle}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Job Post
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => {
                  if (message.sender === 'system') {
                    return (
                      <div key={message.id} className="flex justify-center">
                        <Badge variant="secondary" className="px-4 py-2">
                          {message.content}
                        </Badge>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-md rounded-lg px-4 py-2 ${
                          message.sender === 'me'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p
                          className={`mt-1 ${
                            message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="w-5 h-5" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
