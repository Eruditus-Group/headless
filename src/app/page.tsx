export async function getPosts() {
  try {
    const res = await fetch("https://server.eruditus.group/wp-json/wp/v2/posts", {
      cache: "no-store", // Evita que Next.js almacene en caché la respuesta
    });
    return res.ok ? await res.json() : [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Blog de WordPress</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id}>
            <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </div>
        ))
      ) : (
        <p>No hay publicaciones disponibles.</p>
      )}
    </div>
  );
}