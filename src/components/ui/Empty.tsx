import Image from 'next/image'

type EmptyProps = {
    label: string
}

export default function Empty({ label }: EmptyProps) {
    return (
        <div className='h-full w-full flex flex-col items-center justify-center'>
            <div className='w-72 h-72 relative'>
                <Image
                    src='/empty.png'
                    alt='Empty...'
                    fill
                    priority
                />
            </div>
            <p className='text-base text-center text-muted-foreground'>
                {label}
            </p>
        </div>
    )
}
