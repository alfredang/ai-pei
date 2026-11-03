import Image from "next/image";
import { postHeroImage } from "@/lib/post-hero-images";
import { buildPostCoverSvg } from "@/lib/post-cover-svg";

export function PostCover({ slug, title, image, kicker = "Journal", wide = false, priority = false, className = "" }: {
  slug: string;
  title: string;
  image?: string | null;
  kicker?: string;
  wide?: boolean;
  priority?: boolean;
  className?: string;
}) {
  const src = postHeroImage(slug, image);
  return (
    <div className={`relative overflow-hidden bg-(--color-bg-deeper) ${className}`} style={{ aspectRatio: wide ? "2.4" : "1.6" }}>
      {src ? src.startsWith("/images/") ? (
        <Image src={src} alt={title} fill sizes={wide ? "100vw" : "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"} priority={priority} className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={title} loading={priority ? "eager" : "lazy"} className="w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 [&>svg]:w-full [&>svg]:h-full" dangerouslySetInnerHTML={{ __html: buildPostCoverSvg(title, kicker) }} />
      )}
    </div>
  );
}
