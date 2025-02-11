import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ListPost from '../components/ListPosts';
import usePosts from '../hooks/usePosts';
import { LoadingSpinner } from '../components/Loading';
import { PostNewMessage } from '../components/PostNewMessage';

export default function Home() {
  const [user] = useAuth();
  const postQuery = usePosts();
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (postQuery.isPending) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Nav />
      <div className="flex mt-3 justify-center items-center text-2xl font-bold">
        <div className="w-full max-w-sm md:max-w-3xl space-y-4">
          <PostNewMessage />
          <ListPost data={postQuery.data} />
        </div>
      </div>
    </>
  );
}

function Nav() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <a className="text-sm font-medium transition-colors hover:text-primary" href="/">
            Posts
          </a>
          <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="/">
            Settings
          </a>
          <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="/">
            Logout
          </a>
          <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="/register">
            Register Account
          </a>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <div>
            <input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm md:w-[100px] lg:w-[300px]"
              placeholder="Search..."
              type="search"
            />
          </div>
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-8 rounded-full"
            type="button"
            id="radix-:r1tf:"
            aria-haspopup="menu"
            aria-expanded="false"
            data-state="closed"
          >
            <span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8">
              <img className="aspect-square h-full w-full" src="/avatars/01.png" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
