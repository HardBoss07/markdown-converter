"use client";

import {useState, useEffect} from "react";
import init, {md_to_html} from "rust_md_core";

export default function Page() {
    const [markdown, setMarkdown] = useState("# Hello WASM\n**Markdown → HTML**");
    const [html, setHtml] = useState("");

    async function fetchHtml(md: string): Promise<string> {
        try {
            await init(); // make sure WASM is initialized
            return md_to_html(md);
        } catch (err) {
            console.error("Markdown → HTML conversion failed:", err);
            return "<p><em>Error rendering markdown</em></p>";
        }
    }

    useEffect(() => {
        (async () => {
            const rendered = await fetchHtml(markdown);
            setHtml(rendered);
        })();
        console.log(html);
    }, [markdown]); // re-run whenever markdown changes

    return (
        <main className="p-6 grid grid-cols-2 gap-4 min-h-screen">
            <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="w-full h-screen p-3 border rounded font-mono"
            />
            <div className="border rounded bg-white p-4 overflow-auto max-w-full">
                <div
                    className="markdown"
                    dangerouslySetInnerHTML={{__html: html}}
                />
            </div>
        </main>
    );
}
