'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function ProtectedRoute({
  children,
  redirectTo = '/admin/login'
}: {
  children: React.ReactNode;
  redirectTo?: string;
}) {
  const router = useRouter();
  const { isAuthenticated, token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    if (!token || !isAuthenticated) {
      router.push(redirectTo);
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, token, router, redirectTo]);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'var(--black)',
        color: 'var(--text)'
      }}>
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
