import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
interface LoginPayload {
  identifier: string;
  password: string;
  rememberMe: boolean;
}
export default function Login() {
  const { register, handleSubmit } = useForm<LoginPayload>();
  const navigate = useNavigate();
  const mutation = useLogin();

  const onSubmit = (data: LoginPayload) => {
    mutation.mutate(data, {
      onSuccess() {
        navigate('/');
      },
    });
  };

  return (
    <div className="relative flex min-h-svh flex-col bg-background">
      <div className="relative flex min-h-svh flex-col bg-background">
        <div className="themes-wrapper bg-background">
          <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
              <div className="flex flex-col gap-6">
                <div className="rounded-xl border bg-card text-card-foreground shadow">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="font-semibold tracking-tight text-2xl">Login</div>
                    <div className="text-sm text-muted-foreground">Enter your email below to login to your account</div>
                  </div>
                  <div className="p-6 pt-0">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                          <label
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              htmlFor="email">
                            Email
                          </label>
                          <input
                              {...register('identifier')}
                              type="text"
                              autoFocus
                              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              placeholder="m@example.com"
                          />
                        </div>
                        <div className="grid gap-2">
                          <div className="flex items-center">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="password">
                              Password
                            </label>
                          </div>
                          <input
                              {...register('password')}
                              type="password"
                              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              id="password"
                          />
                        </div>
                        <div className="grid gap-2">
                          <div className="flex items-center">
                            <input
                                {...register('rememberMe')}
                                type="checkbox"
                                id="rememberMe"
                                defaultChecked={false}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label
                                htmlFor="rememberMe"
                                className="ml-2 block text-sm font-medium text-gray-900"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>

                        <button
                            className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full"
                            type="submit"
                        >
                          Login
                        </button>
                      </div>
                      <div className="mt-4 text-center text-sm">
                        Don't have an account?{/* */}{' '}
                        <a href="/Register" className="underline underline-offset-4">
                          Register
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
