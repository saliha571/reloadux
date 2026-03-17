import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

const MODEL_PATH_MAP: Record<string, string[]> = {
  homepage: ["/"],
  service: ["/", "/service"],
  "case-study": ["/", "/case-studies"],
  "blog-post": ["/", "/blog"],
  testimonial: ["/"],
  "client-logo": ["/"],
  industry: ["/"],
  "team-member": ["/about-us", "/contact-us"],
  "site-setting": ["/"],
};

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");

  if (REVALIDATE_SECRET && secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const model: string = body.model ?? body.event ?? "";
    const slug: string = body.entry?.slug ?? "";

    const paths = MODEL_PATH_MAP[model] ?? ["/"];

    for (const path of paths) {
      revalidatePath(path, "page");
    }

    if (slug && model === "service") {
      revalidatePath(`/service/${slug}`, "page");
    }
    if (slug && model === "case-study") {
      revalidatePath(`/case-study/${slug}`, "page");
    }
    if (slug && model === "blog-post") {
      revalidatePath(`/blog/${slug}`, "page");
    }

    return NextResponse.json({
      revalidated: true,
      paths,
      model,
      slug: slug || undefined,
    });
  } catch {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
