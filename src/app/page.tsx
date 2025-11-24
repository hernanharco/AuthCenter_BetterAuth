'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/signup');
  }, [router]);

  return (
     <main className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-4 sm:p-6 md:p-8">
      <p>Loading...</p>
    </main>
  );
}
