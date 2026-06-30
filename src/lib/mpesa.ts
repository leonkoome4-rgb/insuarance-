// Safaricom Daraja "Lipa na M-Pesa Online" (STK Push) integration — sandbox by default.
// Sandbox moves no real money. Requires MPESA_CONSUMER_KEY / MPESA_CONSUMER_SECRET
// from a free developer account at https://developer.safaricom.co.ke.

const BASE_URL = process.env.MPESA_BASE_URL ?? "https://sandbox.safaricom.co.ke";
const SHORTCODE = process.env.MPESA_SHORTCODE ?? "174379";
const PASSKEY =
  process.env.MPESA_PASSKEY ??
  "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";

function getTimestamp(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    now.getFullYear().toString() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds())
  );
}

function getPassword(timestamp: string): string {
  return Buffer.from(`${SHORTCODE}${PASSKEY}${timestamp}`).toString("base64");
}

/** Normalizes 07XXXXXXXX / 01XXXXXXXX / 254XXXXXXXXX / +254XXXXXXXXX to 254XXXXXXXXX. */
export function normalizeMsisdn(raw: string): string | null {
  const digits = raw.replace(/[^0-9]/g, "");
  if (digits.length === 9 && (digits.startsWith("7") || digits.startsWith("1"))) {
    return `254${digits}`;
  }
  if (digits.length === 10 && digits.startsWith("0")) {
    return `254${digits.slice(1)}`;
  }
  if (digits.length === 12 && digits.startsWith("254")) {
    return digits;
  }
  return null;
}

async function getAccessToken(): Promise<string> {
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
  if (!consumerKey || !consumerSecret) {
    throw new Error(
      "M-Pesa is not configured. Set MPESA_CONSUMER_KEY and MPESA_CONSUMER_SECRET (free sandbox app at developer.safaricom.co.ke)."
    );
  }

  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
  const res = await fetch(`${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${credentials}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[mpesa] OAuth token request failed", res.status, text);
    throw new Error(`M-Pesa auth failed (${res.status}). Check your Consumer Key/Secret.`);
  }

  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export type StkPushResult = {
  merchantRequestId: string;
  checkoutRequestId: string;
  customerMessage: string;
};

// Safaricom's gateway converts these fields through an internal XML/XSL pipeline —
// raw "&", "<", ">", quotes etc. break that conversion with an opaque SOAP fault.
function sanitizeForMpesa(text: string): string {
  return text
    .replace(/&/g, "and")
    .replace(/[<>"'`]/g, "")
    .trim();
}

export async function initiateStkPush(params: {
  phone: string;
  amount: number;
  accountReference: string;
  transactionDesc: string;
}): Promise<StkPushResult> {
  const token = await getAccessToken();
  const timestamp = getTimestamp();
  const password = getPassword(timestamp);

  const callbackUrl =
    process.env.MPESA_CALLBACK_URL ?? "https://example.com/api/mpesa/callback";

  const res = await fetch(`${BASE_URL}/mpesa/stkpush/v1/processrequest`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      BusinessShortCode: SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Math.max(1, Math.round(params.amount)),
      PartyA: params.phone,
      PartyB: SHORTCODE,
      PhoneNumber: params.phone,
      CallBackURL: callbackUrl,
      AccountReference: sanitizeForMpesa(params.accountReference).slice(0, 12),
      TransactionDesc: sanitizeForMpesa(params.transactionDesc).slice(0, 13),
    }),
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok || data.ResponseCode !== "0") {
    console.error("[mpesa] STK push rejected", res.status, JSON.stringify(data));
    throw new Error(data.errorMessage ?? data.ResponseDescription ?? "Failed to initiate STK push.");
  }

  return {
    merchantRequestId: data.MerchantRequestID,
    checkoutRequestId: data.CheckoutRequestID,
    customerMessage: data.CustomerMessage,
  };
}

export type StkStatus =
  | { status: "pending" }
  | { status: "success"; resultDesc: string }
  | { status: "failed"; resultDesc: string };

export async function queryStkStatus(checkoutRequestId: string): Promise<StkStatus> {
  const token = await getAccessToken();
  const timestamp = getTimestamp();
  const password = getPassword(timestamp);

  const res = await fetch(`${BASE_URL}/mpesa/stkpushquery/v1/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      BusinessShortCode: SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId,
    }),
    cache: "no-store",
  });

  const data = await res.json();

  // Daraja returns this specific error shape while the transaction is still being processed.
  if (data.errorCode === "500.001.1001" || /processed/i.test(data.errorMessage ?? "")) {
    return { status: "pending" };
  }

  if (!res.ok && !("ResultCode" in data)) {
    return { status: "pending" };
  }

  const resultCode = String(data.ResultCode);
  if (resultCode === "0") {
    return { status: "success", resultDesc: data.ResultDesc ?? "Payment received." };
  }

  return { status: "failed", resultDesc: describeResultCode(resultCode, data.ResultDesc) };
}

function describeResultCode(code: string, fallback?: string): string {
  switch (code) {
    case "1":
      return "Insufficient M-Pesa balance.";
    case "1032":
      return "Payment cancelled on your phone.";
    case "1037":
      return "No response received — phone may be off or unreachable.";
    case "2001":
      return "Wrong M-Pesa PIN entered.";
    default:
      return fallback ?? "Payment could not be completed.";
  }
}
