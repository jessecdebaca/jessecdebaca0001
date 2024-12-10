import { useAuthContext } from '../auth/AuthProvider';

export function useUser() {
  const { user } = useAuthContext();
  
  if (!user) {
    throw new Error('useUser must be used within an authenticated context');
  }
  
  return user;
}