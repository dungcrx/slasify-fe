import { useMutation } from '@tanstack/react-query';
import useAuth from '../hooks/useAuth';
interface LoginPayload {
  identifier: string;
  password: string;
}

export default function useLogin() {
  const [, setAuth] = useAuth();
  return useMutation<unknown, unknown, LoginPayload>({
    async mutationFn(data) {
      const r = await fetch(import.meta.env.VITE_APP_API_URL + '/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        },
      });

      if (r.ok) {
        const d = await r.json();
        const auth = {
          name: '',
          token: d.token as string,
        };
        setAuth(auth);
        localStorage.setItem('auth', JSON.stringify(d));
      }
    },
  });
}
