import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from './useAuth';

export default function usePostComment() {
  const [user] = useAuth();
  const client = useQueryClient();
  return useMutation<unknown, unknown, CommentPayload>({
    async mutationFn(data) {
      const r = await fetch(import.meta.env.VITE_APP_API_URL + '/comments', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
          authorization: 'Bearer ' + user.token,
        },
      });
      await r.json();
    },
    onSuccess() {
      client.invalidateQueries({
        queryKey: ['posts'],
      });
    },
  });
}

export function usePost() {
  const [user] = useAuth();
  const client = useQueryClient();
  return useMutation<unknown, unknown, CommentPayload>({
    async mutationFn(data) {
      const r = await fetch(import.meta.env.VITE_APP_API_URL + '/messages/post', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
          authorization: 'Bearer ' + user.token,
        },
      });
      await r.json();
    },
    onSuccess() {
      client.invalidateQueries({
        queryKey: ['posts'],
      });
    },
  });
}

export interface CommentPayload {
  messageId: number;
  parentCommentId?: number;
  content: string;
}
