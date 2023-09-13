"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios'
import Heading from "@/components/dashboard/Heading";
import { VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";
import Empty from "@/components/ui/Empty";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useUser } from "@clerk/nextjs";

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: 'Input cannot be empty!'
  })
})

export default function VideoPage() {

  const [video, setVideo] = useState<string | null>(null)
  const router = useRouter()
  const { user } = useUser()
  // console.log(user);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  })

  const isLoading = form.formState.isSubmitting

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {

      setVideo(null)
      const res = await axios.post('/api/video', values)
      console.log(res);
      setVideo(res.data[0])
      form.reset()

    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    } finally {
      router.refresh()
    }
  }

  return (
    <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
      <Heading
        bgColor="bg-pink-700/10"
        color="text-pink-700"
        icon={VideoIcon}
        title="Video Generation"
        description="Turn your prompt into a video."
      />
      <div className="flex items-center px-6 my-8 w-full">
        <Form {...form}>
          <form
            className="grid grid-cols-12 items-center px-6 py-4 rounded-md space-x-4 border space-y-4 border-black/10 w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 md:col-span-10">
                  <FormControl>
                    <Input
                      className="outline-none border-0 px-2 py-4 focus-visible:ring-0 focus-visible:ring-transparent"
                      {...field}
                      disabled={isLoading}
                      placeholder="Clown fish swimming in a coral reef"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              size='lg'
              className="col-span-12 my-auto md:col-span-2 py-4 bg-[#6f5af6] text-white hover:brightness-125"
              type="submit"
            >
              Generate
            </Button>
          </form>
        </Form>
      </div>
      <div className="px-6">
        {!video && !isLoading && <Empty label='No videos generated.' />}
        {isLoading && <Loader />}
        {video && (
          <video controls className="w-full aspect-video mt-8 rounded-lg border bg-black">
            <source src={video} />
          </video>
        )}
      </div>
    </div>
  )
}
