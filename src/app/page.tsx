async function getHtml() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // ⚠️ SOLO PARA DESARROLLO

  const res = await fetch("https://next.eruditus.app", {
    headers: { "User-Agent": "Mozilla/5.0" },
  });

  if (!res.ok) throw new Error("Error al obtener HTML");

  return res.text();
}

export default async function Home() {
  const html = await getHtml();

  return (
    <main className="w-screen max-w-full overflow-x-hidden">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}