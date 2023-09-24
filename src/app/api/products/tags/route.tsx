import { getAllTags } from "@/utils/shopifyFunctions";

export async function GET(request: Request) {
  const response = await getAllTags();

  return new Response(JSON.stringify(response));
}
