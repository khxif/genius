import Image from 'next/image';

export default function Loader() {
    return (
        <div className='flex space-x-4 items-center justify-center w-full h-full p-6'>
            <div className='h-10 w-10 animate-spin'>
            <Image
                src='/logo.png'
                alt='logo'
                fill
            />
            </div>
            <p className='text-sm text-muted-foreground'>
                Genius is thinking...
            </p>
        </div>
    )
}
