// src/app/api/subscribe/route.js
export async function POST(req) {
  try {
    const { email, tag = "lead-magnet" } = await req.json();

    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return new Response("Invalid email", { status: 400 });
    }

    const API_KEY = process.env.MAILCHIMP_API_KEY;          // e.g. xxxx-us21
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;  // list id
    if (!API_KEY || !AUDIENCE_ID) {
      return new Response("Missing Mailchimp env", { status: 500 });
    }

    const DC = API_KEY.split("-")[1]; // data center, e.g. us21

    const res = await fetch(
      `https://${DC}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from("any:" + API_KEY).toString("base64")}`,
        },
        body: JSON.stringify({
          email_address: email,
          status_if_new: "subscribed",
          status: "subscribed",
          tags: [tag, "nem-offer"],
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      return new Response(err, { status: 400 });
    }

    return new Response("ok", { status: 200 });
  } catch (e) {
    return new Response("Server error", { status: 500 });
  }
}
