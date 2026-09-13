import { type NextRequest, NextResponse } from "next/server";
import { getEmailProvider } from "@/lib/server/email-provider";
import { getSubscriptionStore } from "@/lib/server/subscription-store";
import { confirmSubscription } from "@/lib/server/subscription-service";
import { SITE_URL } from "@/lib/site-config";

const deps = { store: getSubscriptionStore(), email: getEmailProvider(), siteOrigin: SITE_URL };

export async function GET(_request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const result = await confirmSubscription(deps, token);
  return NextResponse.redirect(new URL(`/subscribe/confirmed?status=${result}`, SITE_URL));
}
