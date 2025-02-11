import { useMutation } from '@tanstack/react-query';

interface Register {
  userName: string;
  passwordHash: string;
}

export default function useRegister() {
  return useMutation<unknown, unknown, Register>({
    async mutationFn(data) {
      return fetch(import.meta.env.VITE_APP_API_URL + '/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        },
      });
    },
  });
}
