'use client'

import { Card } from '@/components/ui/card';
import { tools } from '../../../../lib/constants';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {

  const router = useRouter()

  return (
    <main className="w-full flex flex-col items-center justify-center mb-4 space-y-8">
      <div className="space-y-4 px-2">
        <h1 className="text-center font-bold text-3xl md:text-4xl">
          Explore the power of AI
        </h1>
        <p className="text-lg md:text-xl text-zinc-500 font-light text-center">
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>
      <div className="w-full space-y-5 px-4 md:px-20 lg:px-32">
        {
          tools.map(route => (
            <Card key={route.label}
              className='w-full p-4 cursor-pointer hover:shadow-md transition-all duration-200 border-black/5'
              onClick={() => router.push(route.href)}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3 flex-1'>
                  <div className={cn('p-2 rounded-md', route.bgColor)}>
                    <route.icon className={cn('h-8 w-8', route.color)} />
                  </div>
                  <h1 className='font-semibold text-md'>
                    {route?.label}
                  </h1>
                </div>
                <ArrowRight className="w-5 h-5" />
              </div>
            </Card>
          ))
        }
      </div>
    </main>
  )
}
