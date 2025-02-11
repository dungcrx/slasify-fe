import {JSX, MouseEvent} from 'react';
import { useBoolean } from '../hooks/useBoolean';
import { ReplyForm } from './ReplyForm';

export interface Post {
  id: number;
  messageId: number;
  username: string;
  content: string;
  postingTime: Date;
  replies?: Post[];
  comments?: Post[];
}

export default function ListPost({ data }: { data?: Post[] }) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow col-span-3">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="font-semibold leading-none tracking-tight">Recent posts</div>
        <div className="text-sm text-muted-foreground">You made {data?.length} posts </div>
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-8">
          {data?.map((d, idx) => (
            <Post post={d} idx={idx} key={d.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const Post: ({post: d, idx}: { post: any; idx: any }) => JSX.Element = ({ post: d, idx }) => {
  const rep = useBoolean();
  const showAllReplies = useBoolean();

  const onReplyClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    rep.setTrue();
  };

  const children = d.comments || d.replies;

  return (
    <div className="flex items-start border-b last:border-b-0 py-2">
      <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9">
        <img className="aspect-square h-full w-full" alt="Avatar" src={'/avatars/0' + (idx + 1) + '.png'} />
      </span>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none flex items-center gap-2">
          {d.username} <span className="text-[8px] italic text-muted-foreground font-medium leading-none">{new Date(d.postingTime).toISOString()}</span>
        </p>

        <p className="text-sm text-muted-foreground font-medium">{d.content}</p>
        <div className="font-medium flex flex-col">
          {rep.value ? (
            <>
              <ReplyForm cancel={rep.setFalse} post={d} />
            </>
          ) : (
            <a href="#" className="text-sm underline-offset-2 hover:underline" onClick={onReplyClick}>
              Reply
            </a>
          )}
          {children?.length ? (
            <>
              {showAllReplies.value ? (
                <div>
                  {children.map((d, idx) => (
                    <Post post={d} idx={idx} key={d.id} />
                  ))}
                </div>
              ) : (
                <a
                  href="#"
                  className="text-sm underline-offset-2 hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    showAllReplies.setTrue();
                  }}
                >
                  View all {children?.length} replies
                </a>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
