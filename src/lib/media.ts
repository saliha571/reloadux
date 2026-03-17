const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  process.env.STRAPI_API_URL ||
  "http://localhost:1337";

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
}

interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}

export function getStrapiMediaUrl(media: StrapiMedia | null | undefined): string {
  if (!media?.url) return "";
  if (media.url.startsWith("http")) return media.url;
  return `${STRAPI_URL}${media.url}`;
}

export function getStrapiMediaFormat(
  media: StrapiMedia | null | undefined,
  format: "thumbnail" | "small" | "medium" | "large"
): string {
  const fmt = media?.formats?.[format];
  if (fmt?.url) {
    return fmt.url.startsWith("http") ? fmt.url : `${STRAPI_URL}${fmt.url}`;
  }
  return getStrapiMediaUrl(media);
}
