import { Outlet, redirect } from '@tanstack/react-router'
import { logoutMutation } from '../../data/mutation/user/logout'

export function DashboardLayout() {
    const mutation = logoutMutation()

    const handleLogout = () => {
        mutation.mutate(null, {
            onSuccess: () => {
                throw redirect({
                    to: '/',
                })
            },
        })
    }

    return (
        <>
            <div className="fixed flex items-center justify-start border-b-1 border-b-white border-solid h-[100px] p-4">
                <button onClick={handleLogout} className="bg-white text-black px-10">
                    {mutation.isPending ? '...' : 'Logout'}
                </button>
            </div>

            <div className="w-full h-screen pt-[100px] flex items-center justify-center">
                <Outlet />
            </div>
        </>
    )
}
