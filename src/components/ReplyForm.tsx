import { FC, useRef, KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';
import usePostComment, { CommentPayload } from '../hooks/usePostComment';
import { Post } from './ListPosts';

interface ReplyFormProps {
  cancel(): void;
  post: Post;
}
export const ReplyForm: FC<ReplyFormProps> = ({ cancel, post }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const mutation = usePostComment();
  const { register, handleSubmit } = useForm<CommentPayload>();
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      cancel();
    }
  };

  const onSubmit = (d: CommentPayload) => {
    d.messageId = post.messageId;
    if (!post.comments) {
      d.parentCommentId = post.id;
    }
    mutation.mutate(d, {
      onSuccess: cancel,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        ref={inputRef}
        onKeyDown={onKeyDown}
        autoFocus
        disabled={mutation.isPending}
        {...register('content', { required: true })}
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors font-medium  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
      />
      <a href="#" className="text-xs underline-offset-2 hover:underline" onClick={cancel}>
        Cancel
      </a>
    </form>
  );
};
