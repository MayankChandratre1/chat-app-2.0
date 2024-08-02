import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  return NextResponse.redirect("/chat");
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  return NextResponse.redirect("http://localhost:3001/");
};
