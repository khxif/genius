import Testimonials from "@/components/dashboard/Testimonials";
import Hero from "@/components/home/Hero";
import HomeNavbar from "@/components/home/HomeNavbar";

export default async function Home() {
  return (
    <div className=" max-w-screen-xl mx-auto h-full pb-8 md:pb-12">
      <HomeNavbar />
      <Hero />
      <Testimonials />
    </div>
  )
}
