import { NextRequest, NextResponse } from "next/server";

const isSignedIn = true;

export function middleware(request: NextRequest) {
  if (!isSignedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/contacts/create",
};
