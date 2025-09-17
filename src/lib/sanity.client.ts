import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const SANITY_TOKEN = process.env.NEXT_PUBLIC_TOKEN_SANITY;
const SANITY_MODE = process.env.NEXT_PUBLIC_SANITY_MODE || "production";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: SANITY_TOKEN,
  perspective: SANITY_MODE === "production" ? "published" : "previewDrafts",
});
