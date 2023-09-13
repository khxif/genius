"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios'
import Heading from "@/components/dashboard/Heading";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";
import Empty from "@/components/ui/Empty";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { amountOptions, resolutionOptions } from "@/lib/constants";
import { toast } from "@/components/ui/use-toast"
import Image from "next/image";
import { ToastAction } from "@/components/ui/toast";
import { Card, CardFooter } from "@/components/ui/card";

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: 'Input cannot be empty!'
  }),
  amount: z.string().min(1),
  resolution: z.string().min(1)
})

export default function ConversationPage() {

  const [images, setImages] = useState<string[]>([])
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: '1',
      resolution: '512x512'
    },
  })

  const isLoading = form.formState.isSubmitting

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {

      setImages([])
      const res = await axios.post('/api/image', values)
      const urls = (res.data).map((url: { url: string }) => url.url)
      setImages(urls)
      // console.log(images);
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
        icon={ImageIcon}
        title="Image Generation"
        description="Turn your prompt into an image."
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
                <FormItem className="col-span-12 md:col-span-6">
                  <FormControl>
                    <Input
                      className="outline-none border-0 px-2 py-4 focus-visible:ring-0 focus-visible:ring-transparent"
                      {...field}
                      disabled={isLoading}
                      placeholder="Picture of horse in Sweet alps"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-12 md:col-span-2">
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger >
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        amountOptions.map((amount) => (
                          <SelectItem key={amount.value} value={amount.value}>
                            {amount.label}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                    <FormMessage />
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem className="col-span-12 md:col-span-2">
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger >
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        resolutionOptions.map((resolution) => (
                          <SelectItem key={resolution.value} value={resolution.value}>
                            {resolution.label}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                    <FormMessage />
                  </Select>
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
        {images.length === 0 && !isLoading && <Empty label='No images generated.' />}
        {isLoading && <Loader />}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-6">
          {
            images.map((url, i) => (
              <Card key={i} className="flex flex-col space-y-3 rounded-t-md">
                <div className="col-span-1 relative aspect-square">
                  <Image
                    src={url}
                    alt="Generated"
                    fill
                  />
                </div>
                <CardFooter className="p-2">
                  <Button
                    onClick={() => window.open(url)}
                    className="w-full"
                    variant='secondary'
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))
          }
        </div>
      </div>
    </div>
  )
}
