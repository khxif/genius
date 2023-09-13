import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req: Request) {
  const { userId } = auth();
  console.log(userId);
  

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!,
  });

  const { prompt } = await req.json();

  if (!userId) return new NextResponse("UnAuthorized");
  if (!prompt) return new NextResponse("Missing Music prompt");
  if (!process.env.REPLICATE_API_TOKEN)
    return new NextResponse("REPLICATE_API_TOKEN Missing!");

  const output = await replicate.run(
    "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
    {
      input: {
        prompt_a: prompt,
      },
    },
  );
  console.log(output);
  

  return NextResponse.json(output);
}
