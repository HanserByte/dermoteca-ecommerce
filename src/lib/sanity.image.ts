import { client } from "@/lib/sanity.client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

export const sanityImage = (source: SanityImageSource) => {
  return builder.image(source);
};
