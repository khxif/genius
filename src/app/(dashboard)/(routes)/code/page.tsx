"use client"

import BotAvatar from "@/components/avatar/BotAvatar";
import UserAvatar from "@/components/avatar/UserAvatar";
import Heading from "@/components/dashboard/Heading";
import Empty from "@/components/ui/Empty";
import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Code } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod"

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: 'Input cannot be empty!'
  })
})

export default function CodePage() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  })

  const [messages, setMessages] = useState<any[]>([])
  const router = useRouter()
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {

      const userMessage = { role: 'user', content: values.prompt }
      const newMessage = [...messages, userMessage]
      const res = await axios.post('/api/code', { messages: newMessage })
      setMessages((prev) => [...prev, userMessage, res.data])
      console.log(messages);
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
        bgColor="bg-green-700/10"
        color="text-green-700"
        description="Generate code using descriptive text."
        icon={Code}
        title="Code Generation"
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
                      placeholder="How do I calculate the radius of a circle?"
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
        {messages.length === 0 && !isLoading && <Empty label='No conversation started.' />}
        <div className="px-6 space-y-4 lg:px-8">
          {
            messages.map((msg) => (
              <div key={msg.message}
                className={cn("flex p-6 items-center space-x-4 rounded-md",
                  msg.role === 'user' ? 'bg-white border border-black/10' : 'bg-muted'
                )}>
                {msg.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                <h1>{msg?.content}</h1>
              </div>
            ))
          }
        </div>
        {isLoading && <Loader />}
      </div>
    </div>
  )
}
