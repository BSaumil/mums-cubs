import Image from "next/image";
import type { VisualAsset } from "@/lib/types";

interface ResponsiveArtProps {
  asset: VisualAsset;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}

/**
 * All curriculum/material imagery renders through here so optimisation,
 * required alt text and the placeholder pipeline stay in one place. Real
 * photography drops in by pointing VisualAsset.src at production files —
 * no component changes needed.
 */
export function ResponsiveArt({ asset, className, sizes, priority, fill }: ResponsiveArtProps) {
  if (fill) {
    return (
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        sizes={sizes ?? "100vw"}
        priority={priority}
        className={className}
        style={asset.focalPoint ? { objectPosition: `${asset.focalPoint.x}% ${asset.focalPoint.y}%` } : undefined}
      />
    );
  }

  return (
    <Image
      src={asset.src}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      sizes={sizes}
      priority={priority}
      className={className}
      style={asset.focalPoint ? { objectPosition: `${asset.focalPoint.x}% ${asset.focalPoint.y}%` } : undefined}
    />
  );
}
