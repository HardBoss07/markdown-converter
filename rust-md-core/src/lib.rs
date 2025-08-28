use wasm_bindgen::prelude::*;
use comrak::{markdown_to_html, ComrakOptions};

#[wasm_bindgen]
pub fn md_to_html(md: &str) -> String {
    let mut options = ComrakOptions::default();

    // Enable GitHub Flavored Markdown (tables, task lists, strikethrough, etc.)
    options.extension.table = true;
    options.extension.tasklist = true;
    options.extension.strikethrough = true;
    options.extension.autolink = true;
    options.extension.footnotes = true;

    // You can also tweak renderer options
    options.render.github_pre_lang = true;
    options.render.hardbreaks = true;

    markdown_to_html(md, &options)
}
