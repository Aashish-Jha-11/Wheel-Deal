export async function POST(request) {
  try {
    const body = await request.json()
    const { name, phone, when, carSlug, carName } = body || {}
    if (!name || !phone) {
      return new Response(JSON.stringify({ ok: false, message: "Name and phone are required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }
    await new Promise((r) => setTimeout(r, 600))
    console.log("[wheeldeal] form submission:", { name, phone, when, carSlug, carName })
    return new Response(JSON.stringify({ ok: true, id: Date.now() }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, message: "Invalid request body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }
}
