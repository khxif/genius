"use client"

import TypewriterComponent from 'typewriter-effect';
import { Button } from '../ui/button';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function Hero() {

    const { isSignedIn } = useUser();

    return (
        <main className="flex flex-col items-center justify-center text-center my-36 space-y-5">
            <div>
                <h1 className="font-bold text-4xl md:text-7xl text-white">
                    The Best AI Tool for
                </h1>
            </div>
            <div
                className="text-transparent text-3xl md:text-6xl font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                <TypewriterComponent
                    options={{
                        strings: [
                            "Chatbot.",
                            "Photo Generation.",
                            "Blog Writing.",
                            "Mail Writing."
                        ],
                        autoStart: true,
                        loop: true,
                    }}
                />
            </div>
            <div className='space-y-3'>
                <p className='text-zinc-400 text-sm md:text-xl font-light mb-3'>
                    Create content using AI 10x faster.
                </p>
                <Link href={isSignedIn ? '/dashboard' : '/sign-in'}>
                    <Button 
                    variant='premium' 
                    className='md:text-lg p-4 md:p-6 rounded-full font-semibold hover:brightness-75'
                    >
                        Start Generating For Free
                    </Button>
                </Link>
                <p className='text-zinc-400 text-xs md:text-sm font-normal'>
                    No credit card required.
                </p>
            </div>
        </main>
    )
}
