import { initiateStkPush, normalizeMsisdn } from "@/lib/mpesa";

export async function POST(request: Request) {
  let body: { phone?: string; amount?: number; reference?: string; description?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const phone = typeof body.phone === "string" ? normalizeMsisdn(body.phone) : null;
  const amount = typeof body.amount === "number" ? body.amount : NaN;

  if (!phone) {
    return Response.json(
      { error: "Enter a valid Safaricom number, e.g. 0712 345 678." },
      { status: 400 }
    );
  }
  if (!Number.isFinite(amount) || amount < 1) {
    return Response.json({ error: "Enter a valid amount." }, { status: 400 });
  }

  try {
    const result = await initiateStkPush({
      phone,
      amount,
      accountReference: body.reference ?? "SuperMetro",
      transactionDesc: body.description ?? "Insurance Premium",
    });
    return Response.json(result);
  } catch (err) {
    console.error("[mpesa stk-push]", err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Failed to initiate STK push." },
      { status: 502 }
    );
  }
}
