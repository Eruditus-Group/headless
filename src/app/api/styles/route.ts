import { NextResponse } from "next/server";

async function getHtml() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // ⚠️ SOLO PARA DESARROLLO

  const res = await fetch("https://next.eruditus.app", {
    headers: { "User-Agent": "Mozilla/5.0" },
  });

  return res.text();
}

export async function GET() {
  try {
    const html = await getHtml();
    console.log("HTML recibido:", html); // 🔍 Verifica que WordPress responde correctamente

    if (!html.includes("<head>")) {
      return NextResponse.json({ error: "No se pudo obtener el HTML" }, { status: 500 });
    }

    // Extraer estilos del HTML
    const matches = [...html.matchAll(/<link\s+rel=["']stylesheet["'].*?href=["'](.*?)["']/gi)];
    const stylesheets = matches.map((match) => match[1]);

    return NextResponse.json(stylesheets);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener los estilos", details: error.message }, { status: 500 });
  }
}