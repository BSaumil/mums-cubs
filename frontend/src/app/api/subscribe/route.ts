import { NextRequest, NextResponse } from "next/server";
import { getEmailProvider, isEmailConfigured } from "@/lib/server/email-provider";
import { getSubscriptionStore, isPersistenceConfigured } from "@/lib/server/subscription-store";
import { createSubscription, reconsentSubscription, type SubscriptionServiceDeps } from "@/lib/server/subscription-service";
import type { SubscriptionPurpose } from "@/lib/server/subscription-types";
import { SITE_URL } from "@/lib/site-config";

function isConfigured() {
  return isPersistenceConfigured() && isEmailConfigured();
}

// Deliberately SITE_URL, not request.nextUrl.origin: an email confirmation/unsubscribe
// link built from a request-derived origin is a host-header-injection vector.
const deps: SubscriptionServiceDeps = { store: getSubscriptionStore(), email: getEmailProvider(), siteOrigin: SITE_URL };

const VALID_PURPOSES: SubscriptionPurpose[] = ["guide_delivery", "marketing_digest"];

export async function POST(request: NextRequest) {
  if (!isConfigured()) {
    return NextResponse.json({ code: "not_configured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ code: "invalid_input" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ code: "invalid_input" }, { status: 400 });
  }
  const { email, purpose, reconsent, optionalAgeBand, optionalPath } = body as Record<string, unknown>;

  if (typeof email !== "string" || typeof purpose !== "string" || !VALID_PURPOSES.includes(purpose as SubscriptionPurpose)) {
    return NextResponse.json({ code: "invalid_input" }, { status: 400 });
  }

  const input = {
    email,
    purpose: purpose as SubscriptionPurpose,
    source: "website",
    optionalAgeBand: typeof optionalAgeBand === "string" ? optionalAgeBand : undefined,
    optionalPath: typeof optionalPath === "string" ? optionalPath : undefined,
  };

  const result = reconsent === true
    ? await reconsentSubscription(deps, input)
    : await createSubscription(deps, input);

  switch (result.kind) {
    case "pending_sent":
      return NextResponse.json({ code: "pending_sent" }, { status: 202 });
    case "already_confirmed":
      return NextResponse.json({ code: "already_confirmed" }, { status: 200 });
    case "previously_unsubscribed":
      return NextResponse.json({ code: "previously_unsubscribed" }, { status: 200 });
    case "rate_limited":
      return NextResponse.json({ code: "rate_limited" }, { status: 429 });
    case "invalid_email":
    case "invalid_input":
      return NextResponse.json({ code: result.kind }, { status: 400 });
    case "delivery_failed":
      return NextResponse.json({ code: "delivery_failed" }, { status: 502 });
  }
}
