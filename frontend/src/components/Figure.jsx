import React from "react";
import imageManifest from "@/data/imageManifest";

/**
 * A photograph from the asset pack, sized responsively.
 *
 * Everything it needs beyond the id comes from the generated manifest, so a
 * caller cannot request a width that was never built or hardcode dimensions
 * that drift when the pack is regenerated.
 *
 * Three things it does that a bare <img> does not:
 *
 *  - Reserves the box via aspect-ratio from the real intrinsic size, so the
 *    page does not reflow when the image lands. The pack is 1:1 and 16:9
 *    mixed, so a single hardcoded ratio would letterbox half the set.
 *  - Paints the image's own averaged colour underneath while it loads. On a
 *    dark theme an unstyled empty <img> flashes the page background through a
 *    transparent box; a matching swatch reads as the photo arriving.
 *  - Emits a srcset limited to widths that exist on disk, so a 1254px master
 *    never advertises a 1600px file.
 *
 * `sizes` should describe the layout slot, not the image. The default matches
 * the max-w-5xl content column these pages use.
 */
export default function Figure({
  group,
  id,
  alt,
  sizes = "(min-width: 1024px) 1024px, 100vw",
  priority = false,
  className = "",
  rounded = "rounded-2xl",
}) {
  const entry = imageManifest[group]?.find((e) => e.id === id);

  // A missing image is a content bug, not a reason to break the page: render
  // nothing in production, but make it loud in development so a typo in an id
  // is caught while writing the page rather than after deploying it.
  if (!entry) {
    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        `<Figure> — no image "${id}" in group "${group}". ` +
          `Available: ${(imageManifest[group] ?? []).map((e) => e.id).join(", ") || "none"}`
      );
    }
    return null;
  }

  const base = entry.src.replace(/-\d+\.webp$/, "");
  const srcSet = entry.widths.map((w) => `${base}-${w}.webp ${w}w`).join(", ");

  return (
    <img
      src={entry.src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={entry.width}
      height={entry.height}
      loading={priority ? "eager" : "lazy"}
      // fetchPriority is React 19; on an older renderer it degrades to an
      // ignored attribute rather than an error.
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      style={{
        backgroundColor: entry.colour,
        aspectRatio: `${entry.width} / ${entry.height}`,
      }}
      className={`w-full h-auto object-cover ${rounded} ${className}`}
    />
  );
}
