import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const PUBLIC_PATHS = [
  "/",
  "/about-primexia",
  "/business-structure-operating-approach",
  "/operating-focus",
  "/ventures-investments",
  "/contact",
  "/legal",
  "/privacy-policy",
  "/terms",
];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const returnTo = url.searchParams.get("returnTo") || "/";

  for (const path of PUBLIC_PATHS) {
    revalidatePath(path);
  }

  return NextResponse.redirect(new URL(returnTo, url.origin));
}

