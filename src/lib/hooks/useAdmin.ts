import { useUser } from './useUser';

export function useAdmin() {
  const user = useUser();
  
  if (!user.is_admin) {
    throw new Error('This route requires admin privileges');
  }
  
  return user;
}