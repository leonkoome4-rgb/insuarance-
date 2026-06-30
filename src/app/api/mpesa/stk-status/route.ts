import { queryStkStatus } from "@/lib/mpesa";

export async function POST(request: Request) {
  let body: { checkoutRequestId?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.checkoutRequestId) {
    return Response.json({ error: "Missing checkoutRequestId." }, { status: 400 });
  }

  try {
    const status = await queryStkStatus(body.checkoutRequestId);
    return Response.json(status);
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Failed to check payment status." },
      { status: 502 }
    );
  }
}
