"use client";

import { useEffect, useState } from "react";
import { isPostRead } from "@/components/blog/MarkAsReadToggle";
import { Icon } from "@/components/icons/Icon";

export function ReadBadge({ slug }: { slug: string }) {
  const [read, setRead] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading localStorage can't happen during SSR render without a hydration mismatch
    setRead(isPostRead(slug));
  }, [slug]);

  if (!read) return null;

  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-leaf-700">
      <Icon name="heart" className="h-3 w-3" />
      Read
    </span>
  );
}
