import {JSX} from 'react';
import { useForm } from 'react-hook-form';
import { CommentPayload, usePost } from '../hooks/usePostComment';

export const PostNewMessage: () => JSX.Element = () => {
  const mutation = usePost();
  const form = useForm<CommentPayload>({
    defaultValues: {
      content: '',
    },
  });
  const { register, handleSubmit, formState } = form;

  const onSubmit = (d: CommentPayload) => {
    mutation.mutate(d, {
      onSuccess: () => {
        console.log('Mutation successful');
        form.reset()
      },
      onError: (error: any) => {
        console.error('Mutation failed:', error);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-xl border bg-card text-card-foreground shadow col-span-3 p-6 space-y-2">
        <div className="text-base">Post a new message:</div>
        <textarea
          {...register('content', { required: true })}
          className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-medium   disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          placeholder="Type your message here."
        ></textarea>
        <div className="text-right">
          <button
            disabled={!formState.isValid}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
};
