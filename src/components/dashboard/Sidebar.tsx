'use client'

import { routes } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Montserrat } from 'next/font/google';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

const poppins = Montserrat({ weight: '600', subsets: ['latin'] });

export default function Sidebar() {

    const pathname = usePathname()

    return (
        <div className='h-full w-full text-white flex flex-col space-y-14 bg-[#111827]'>
            <div>
                <Link href='/dashboard'
                    className='flex space-x-4 ml-4 my-2'>
                    <Image
                        src='/logo.png'
                        alt='Genius-logo'
                        width={30}
                        height={30}
                    />
                    <h2
                        className={cn('font-bold text-2xl', poppins.className)}
                    >
                        Genius
                    </h2>
                </Link>
            </div>
            <div className='space-y-6  w-full'>
                {
                    routes.map(route => (
                        <Link
                            key={route.label}
                            href={route.href}
                            className={cn(`flex group cursor-pointer py-3 px-4 rounded-lg transition-all duration-200
                             hover:bg-white/10 w-full flex-1 text-sm font-medium ease-in-out`,
                                pathname === route.href ? 'bg-white/10 text-white' : 'text-zinc-400')}
                        >
                            <div className='flex items-center space-x-2'>
                                <route.icon className={route.color} />
                                <h4>{route.label}</h4>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}