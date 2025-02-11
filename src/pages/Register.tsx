import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useRegister from '../hooks/useRegister';
interface Register {
  userName: string;
  email: string;
  passwordHash: string;
  confirmPassword: string;
}
export default function Register() {
  const { register, handleSubmit } = useForm<Register>();
  const navigate = useNavigate();
  const mutation = useRegister();

  const onSubmit = (data: Register) => {
    mutation.mutate(data, {
      onSuccess() {
        navigate('/login');
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
                    <div className="font-semibold tracking-tight text-2xl">Register</div>
                    <div className="text-sm text-muted-foreground">Enter your email below to Register to your account</div>
                  </div>
                  <div className="p-6 pt-0">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                          <label
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="userName">
                            UserName
                          </label>
                          <input
                              {...register('userName')}
                              type="text"
                              autoFocus
                              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              placeholder="dungphan"
                          />
                        </div>
                        <div className="grid gap-2">
                          <label
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              htmlFor="email">
                            Email
                          </label>
                          <input
                              {...register('email')}
                              type="email"
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
                              {...register('passwordHash')}
                              type="password"
                              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              id="password"
                          />
                        </div>
                        <div className="grid gap-2">
                          <div className="flex items-center">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="confirmPassword"
                            >
                              Confirm Password
                            </label>
                          </div>
                          <input
                              {...register('confirmPassword')}
                              type="password"
                              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              id="confirmPassword"
                          />
                        </div>
                        <button
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full"
                            type="submit"
                        >
                          Register
                        </button>
                      </div>
                      <div className="mt-4 text-center text-sm">
                        Have an account?{/* */}{' '}
                        <a href="/login" className="underline underline-offset-4">
                          Login
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
