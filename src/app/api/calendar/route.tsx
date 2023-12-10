import { getEvents } from "@/utils/calendar";

export async function POST(request: Request) {
  const { date } = await request.json();
  const dateData = await getEvents(date);
  return new Response(JSON.stringify({ dateData }));
}
