import { getAllVendors, getBrandCollections } from "@/utils/shopifyFunctions";

export async function GET() {
  try {
    const [collections, activeVendors] = await Promise.all([
      getBrandCollections(),
      getAllVendors(), // vendors con productos status:active en Storefront
    ]);

    const activeSet = new Set(
      (activeVendors || []).map((v: string) => v?.trim?.()?.toLowerCase?.())
    );

    const filtered = (collections || []).filter(
      (c: any) =>
        c?.vendor && activeSet.has(String(c.vendor).trim().toLowerCase())
    );

    // devolvemos solo title/handle al cliente
    const response = filtered
      .map((c: any) => ({ title: c.title, handle: c.handle }))
      .sort((a: any, b: any) => a.title.localeCompare(b.title));

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (e) {
    console.error("/api/brands error", e);
    return new Response(JSON.stringify({ error: "Failed to fetch brands" }), {
      status: 500,
    });
  }
}
