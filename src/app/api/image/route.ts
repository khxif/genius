import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

export async function POST(req: Request) {
  const openai = new OpenAI();

  const { userId } = auth();
  // console.log(userId);

  const { prompt, amount, resolution } = await req.json();

  if (!userId) return new NextResponse("UnAuthorized");
  if (!prompt || !amount || !resolution)
    return new NextResponse("Missing Entries");
  if (!process.env.OPENAI_API_KEY)
    return new NextResponse("OPENAI_API_KEY Missing!");

  const response = await openai.images.generate({
    prompt,
    n: Number(amount),
    size: resolution,
  });
  // console.log(response.data);
  const imageUrl = response.data;

  return NextResponse.json(imageUrl);
}
