import { Link, redirect } from '@tanstack/react-router'

// Data
import { registerMutation } from '@/app/lib/data/mutation/user/register'

export function RegisterContainer() {
    const mutation = registerMutation()

    const handleRegister = () => {
        mutation.mutate(
            { email: 'email@website.com', password: 'password' },
            {
                onSuccess: () => {
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
                    <h1 className="text-2xl">Register Page</h1>
                    <p>
                        Clicking this button will automatically <strong>register you</strong> with the email{' '}
                        <em>email@website.com</em> with the password of <em>password</em>. On successful registration
                        you should automatically be logged in.
                    </p>
                    <p>
                        If you have an account please{' '}
                        <Link to="/login" className="underline text-blue-500">
                            login
                        </Link>{' '}
                        instead
                    </p>
                </div>

                <button onClick={handleRegister} className="bg-white text-black p-10 rounded-xl">
                    {mutation.isPending ? '...' : 'Register'}
                </button>
            </div>
        </div>
    )
}
