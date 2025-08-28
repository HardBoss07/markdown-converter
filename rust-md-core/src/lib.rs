use wasm_bindgen::prelude::*;
use comrak::{markdown_to_html, ComrakOptions};

// Expose a function to JS
#[wasm_bindgen]
pub fn md_to_html(md: &str) -> String {
    // Use default options for Comrak
    markdown_to_html(md, &ComrakOptions::default())
}
