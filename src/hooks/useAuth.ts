import { useState } from 'react';

interface Auth {
  token: string;
  name: string;
}

export default function useAuth() {
  return useState<Auth>(() => {
    const la = localStorage.getItem('auth');
    if (la) {
      return JSON.parse(la);
    }
    return null;
  });
}
