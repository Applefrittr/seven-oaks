import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./server/session";

const protectedRoutes = "/dashboard";
const publicRoutes = "/login";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = path.includes(protectedRoutes);
  const isPublicRoute = path.includes(publicRoutes);

  const session = await getSession();

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};
