import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function safeRedirect(origin: string, next: string | null, fallback = "/login?auth=confirmed") {
  if (!next || !next.startsWith("/")) {
    return new URL(fallback, origin);
  }

  return new URL(next, origin);
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const tokenHash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type") as EmailOtpType | null;
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next");
  const supabase = await createSupabaseServerClient();

  if (supabase && tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash
    });

    if (!error) {
      return NextResponse.redirect(safeRedirect(requestUrl.origin, next));
    }
  }

  if (supabase && code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(safeRedirect(requestUrl.origin, next));
    }
  }

  return NextResponse.redirect(new URL("/login?auth=auth-code-error", requestUrl.origin));
}
