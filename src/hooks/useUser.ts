import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  initials: string;
}

export function useUser(): User {
  // Mock user data - replace with real auth later
  const [user] = useState<User>({
    id: '1',
    name: 'Alex Johnson',
    avatarUrl: undefined, // Set to a URL to test profile picture
    initials: 'AJ',
  });
  
  return user;
}
