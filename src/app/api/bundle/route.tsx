import { getBundleProduct } from "@/utils/shopifyFunctions";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing id" }), {
      status: 400,
    });
  }

  try {
    const data = await getBundleProduct(id);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: e?.message || "Failed to fetch bundle" }),
      { status: 500 }
    );
  }
}
