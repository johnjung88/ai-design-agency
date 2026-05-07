import { NextResponse } from "next/server";
import { setAdminSessionCookie, verifyAdminPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");

  if (!verifyAdminPassword(password)) {
    return NextResponse.redirect(new URL("/admin/login?error=invalid", request.url), {
      status: 303,
    });
  }

  await setAdminSessionCookie();
  return NextResponse.redirect(new URL("/admin", request.url), { status: 303 });
}
