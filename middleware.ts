import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

// For Next.js release 15.2.0 and above
// https://www.better-auth.com/docs/integrations/next#for-nextjs-release-1520-and-above

export async function middleware(request: NextRequest) {
	// const session = await auth.api.getSession({
	// 	headers: await headers()
	// })

	// if (!session) {
	// 	return NextResponse.redirect(new URL("/login", request.url));
	// }

	// return NextResponse.next();

	const sessionCookie =
		request.cookies.get("better-auth.session_token") ||
		request.cookies.get("better-auth.session_token.localhost");

	const { pathname } = request.nextUrl;

	// Only protect /dashboard route
	if (pathname.startsWith("/dashboard")) {
		if (!sessionCookie) {
			const loginUrl = new URL("/login", request.url);
			loginUrl.searchParams.set("callbackUrl", pathname);
			return NextResponse.redirect(loginUrl);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard"], // Protect all /dashboard routes
};