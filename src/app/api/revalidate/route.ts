import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://next.eruditus.app");
    const html = await res.text();

    // Asegurar que la respuesta contiene HTML válido
    if (!html.includes("<head>")) {
      return NextResponse.json({ error: "No se pudo obtener el HTML" }, { status: 500 });
    }

    // Extraer todos los archivos CSS dentro de <link rel="stylesheet">
    const matches = [...html.matchAll(/<link rel="stylesheet"[^>]+href="(.*?)"/g)];
    const stylesheets = matches.map((match) => match[1]);

    return NextResponse.json(stylesheets);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener los estilos", details: error.message }, { status: 500 });
  }
}