
import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthForm from './AuthForm';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  // For now, we'll skip admin role checking since we need to set up the first admin
  // In production, you'd check if user has admin role here

  return <>{children}</>;
}
