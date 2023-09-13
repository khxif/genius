export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className='w-full h-screen flex items-center justify-center bg-[#111827]'>
            {children}
        </main>
    )
}
