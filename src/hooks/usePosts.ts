import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

export default function usePosts() {
  const [user] = useAuth();
  const nav = useNavigate();
  return useQuery<Post[]>({
    enabled: !!user,
    queryKey: ['posts'],
    async queryFn() {
      const r = await fetch(import.meta.env.VITE_APP_API_URL + '/messages/all', {
        headers: {
        },
      });

      if (r.status === 403) {
        nav('/login');
      }

      const data: Post[] = await r.json();

      data.forEach((d) => {
        d.messageId = d.id;
        if (d.comments) {
          d.comments.forEach((c) => {
            c.messageId = d.id;
            const fill = (r: Post[]) => {
              r.forEach((c) => {
                c.messageId = d.id;
                if (c.replies) {
                  fill(c.replies);
                }
              });
            };

            if (c.replies) {
              fill(c.replies);
            }
          });
        }
      });

      return data;
    },
    retry: 1,
  });
}

export interface Post {
  id: number;
  messageId: number;
  content: string;
  username: string;
  postingTime: Date;
  comments?: Post[];
  replies?: Post[];
}
