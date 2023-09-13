import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Image from 'next/image'

interface HeadingProps {
    title: string,
    icon: LucideIcon,
    color: string,
    bgColor: string,
    description: string;
}

export default function Heading({ bgColor, color, icon: Icon, title, description }: HeadingProps) {
    return (
        <div className="flex items-center px-8 space-x-4">
           <div className={cn('p-2 rounded-md', bgColor)}>
            <Icon className={cn('h-10 w-10', color)} />
           </div>
           <div>
            <h1 className="font-bold text-3xl">
                {title}
            </h1>
            <p className="text-muted-foreground">
                {description}
            </p>
           </div>
        </div>
    )
}
