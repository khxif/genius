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
  console.log(prompt);

  if (!userId) return new NextResponse("UnAuthorized");
  if (!prompt) return new NextResponse("Missing video prompt");
  if (!process.env.REPLICATE_API_TOKEN)
    return new NextResponse("REPLICATE_API_TOKEN Missing!");

  const output = await replicate.run(
    "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
    {
      input: {
        prompt,
      },
    },
  );
  console.log(output);

  return NextResponse.json(output);
}
