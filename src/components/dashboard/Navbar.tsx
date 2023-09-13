import MobileSidebar from './MobileSidebar'
import { UserButton } from '@clerk/nextjs'

export default function Navbar() {
    return (
        <div className='flex items-center justify-between w-screen md:w-full p-4 relative'>
            <MobileSidebar />
            <UserButton afterSignOutUrl='/' />
        </div>
    )
}
