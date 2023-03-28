// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = process.env.SECRET || "";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const isAdminApi = request.url.includes("/api/admin");
  const isLogin = request.url.includes("/login");
  const auth = request.cookies.get("auth")?.value.replace("Bearer ", "");
  const tokenUser = await verifyServerToken(String(auth || ""));
  if (isAdminApi) {
    if (!tokenUser) return NextResponse.error();
    return NextResponse.next();
  }
  if (isLogin) {
    if (!tokenUser) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/admin/orders", request.url));
    }
  }
  if (!tokenUser) {
    request.cookies.delete("auth");
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const isMongoId = /^[0-9a-fA-F]{24}$/;
  const isValidUserId = tokenUser.userId.match(isMongoId);
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*", "/admin/:path*", "/login"],
};

async function verifyServerToken(
  token: string
): Promise<{ userId: string } | null> {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    return payload as { userId: string };
  } catch (error) {
    console.log({ error });
    return null;
  }
}
