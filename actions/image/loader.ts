import { ImageLoaderProps } from "next/image";

export default function myImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  return `${src}?w=${width}&q=${quality || 75}`;
}
