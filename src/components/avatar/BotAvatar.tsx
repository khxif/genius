import { useUser } from '@clerk/nextjs'
import { Avatar, AvatarImage } from '../ui/avatar'

export default function BotAvatar() {
    const { user } = useUser()
    return (
        <Avatar>
            <AvatarImage className='h-8 w-8' src='/logo.png' />
        </Avatar>
    )
}
