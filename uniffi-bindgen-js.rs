use clap::Parser;
use uniffi::deps::anyhow;

fn main() -> anyhow::Result<()> {
    uniffi_bindgen_js::run(uniffi_bindgen_js::cli::Cli::parse())
}
