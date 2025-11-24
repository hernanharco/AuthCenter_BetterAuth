'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

// Mock user data, since Firebase is removed
const mockUser = {
  email: 'test@example.com',
  displayName: 'Test User',
  photoURL: '',
  uid: '12345'
};

export default function Dashboard() {
  const [user, setUser] = useState(mockUser);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    // Mock sign out
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    // This will likely not be hit with mock data, but good practice
    router.push('/login');
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <Button variant="ghost" size="icon" onClick={handleSignOut}>
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Sign Out</span>
        </Button>
      </header>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                {user.photoURL && <AvatarImage src={user.photoURL} />}
                <AvatarFallback>
                  {user.email?.[0].toUpperCase() ?? 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">Welcome, {user.displayName ?? user.email}</CardTitle>
                <CardDescription>
                  This is your personal dashboard.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><span className="font-semibold">Email:</span> {user.email}</p>
                <p><span className="font-semibold">UID:</span> {user.uid}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
