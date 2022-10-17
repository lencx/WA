#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod wa;
mod utils;

fn main() {
    tauri::Builder::default()
        .setup(wa::setup::init)
        .run(tauri::generate_context!())
        .expect("error while running WA+ application");
}
