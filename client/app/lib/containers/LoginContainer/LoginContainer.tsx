import { Link, redirect } from '@tanstack/react-router'
import { BarLoader } from 'react-spinners'

// Data
import { loginMutation } from '@/app/lib/data/mutation/user/login/login.mutation'

export function LoginContainer() {
    const mutation = loginMutation()

    const handleLogin = () => {
        mutation.mutate(
            { email: 'email@website.com', password: 'password' },
            {
                onSuccess: (data) => {
                    throw redirect({
                        to: '/dashboard',
                    })
                },
            },
        )
    }

    return (
        <div className="w-screen h-screen overflow-hidden flex items-center justify-center">
            <div className="text-center text-white min-h-[300px] max-w-[500px] flex flex-col justify-between">
                <div className="flex flex-col gap-6">
                    <h1 className="text-2xl">Login Page</h1>
                    <p>
                        Clicking the button will automatically log you in with the email <em>email@website.com</em> with
                        the password of <em>password</em>
                    </p>
                    <p>
                        If you have not registered a user yet please register{' '}
                        <Link to="/register" className="underline text-blue-500">
                            here
                        </Link>
                    </p>
                </div>

                <button onClick={handleLogin} className="bg-white text-black p-10 rounded-lg">
                    {mutation.isPending ? '...' : 'Login'}
                </button>
            </div>
        </div>
    )
}
