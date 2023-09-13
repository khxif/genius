import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { auth } from "@clerk/nextjs";

const poppins = Montserrat({ weight: '600', subsets: ['latin'] });

export default function HomeNavbar() {

    const { userId } = auth();

    return (
        <header className="p-4 w-full flex items-center justify-between">
            <Link href='/'
                className='flex space-x-4 ml-4 my-2'>
                <Image
                    src='/logo.png'
                    alt='Genius-logo'
                    width={30}
                    height={30}
                />
                <h2
                    className={cn('font-bold text-white text-2xl', poppins.className)}
                >
                    Genius
                </h2>
            </Link>
            <Link href={userId ? '/dashboard' : '/sign-in'}>
                <Button type="button" variant='secondary' className="rounded-full p-5">
                    Get Started
                </Button>
            </Link>
        </header>
    )
}
