import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main 
      className="flex min-h-screen w-full items-center justify-center p-4"
      style={{
        background: 'linear-gradient(to bottom, #E0E7FF, #F3F4F6)',
      }}
    >
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.05) 1px, transparent 0),
            radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.05) 1px, transparent 0)
          `,
          backgroundSize: '20px 20px',
        }}
      ></div>
      <div className="relative z-10">
        {children}
      </div>
    </main>
  );
}
