import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);

  // This is how the server works:
  // 1. A request comes in for a specific asset.
  // 2. We read the asset from the file system.
  // 3. We send the asset back to the client.

  // Check if the request is for style.css.
  if (pathname.startsWith("/index.js")) {
    // Read the style.css file from the file system.
    const file = await Deno.readFile("./index.js");
    // Respond to the request with the style.css file.
    return new Response(file, {
      headers: {
        "content-type": "application/javascript",
      },
    });
  }
  return new Response(await Deno.readTextFile("./index.html"), {
    headers: {
      "content-type": "text/html",
    },
  });
}

console.log("Listening on http://localhost:8000");
serve(handleRequest).catch((err) => console.error(err));
