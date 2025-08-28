"use client";

import { useState, useEffect } from "react";
import init, { md_to_html } from "rust_md_core";

export default function Page() {
  const [markdown, setMarkdown] = useState("# Hello WASM\n**Markdown → HTML**");
  const [html, setHtml] = useState("");

  useEffect(() => {
    (async () => {
      await init(); // load WASM
      setHtml(md_to_html(markdown));
    })();
  }, [markdown]);

  return (
    <main className="p-6 grid grid-cols-2 gap-4 min-h-screen">
      <textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        className="w-full h-screen p-3 border rounded font-mono"
      />
      <div
        className="border p-3 rounded bg-white overflow-auto prose"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
