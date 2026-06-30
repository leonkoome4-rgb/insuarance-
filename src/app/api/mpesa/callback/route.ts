// Safaricom posts the final STK push result here. Requires a publicly reachable
// MPESA_CALLBACK_URL in production — the UI itself doesn't depend on this route,
// since payment status is determined by polling /api/mpesa/stk-status instead.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  console.log("[mpesa callback]", JSON.stringify(body));
  return Response.json({ ResultCode: 0, ResultDesc: "Accepted" });
}
