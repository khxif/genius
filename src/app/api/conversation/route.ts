import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

export async function POST(req: Request) {
  const openai = new OpenAI();
  const { userId } = auth();
  const { messages } = await req.json();

  if (!userId) return new NextResponse("UnAuthorized");
  if (!process.env.OPENAI_API_KEY) return new NextResponse("No API KEY!");
  if (!messages) return new NextResponse("Empty prompt!");

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
  });
  const data = response.choices[0].message;
  console.log(data);

  return NextResponse.json(data, { status: 202 });
}
