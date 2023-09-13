"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios'
import Heading from "@/components/dashboard/Heading";
import { Music } from "lucide-react";
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

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: 'Input cannot be empty!'
  })
})

export default function Musicpage() {

  const [music, setMusic] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  })

  const isLoading = form.formState.isSubmitting

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {

      setMusic(null)
      const res = await axios.post('/api/music', values)
      console.log(res);
      setMusic(res.data.audio)

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
        bgColor="bg-emerald-500/10"
        color="text-emerald-500"
        icon={Music}
        title="Music Generation"
        description="Turn your prompt into music."
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
                      placeholder="Piano solo"
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
      <div>
        {!music && !isLoading && <Empty label='No music generated.' />}
        {isLoading && <Loader />}
        {music && (
          <div className="px-6 md:px-8">
            <audio controls className="w-full mt-8">
              <source src={music} />
            </audio>
          </div>
        )}
      </div>
    </div>
  )
}
