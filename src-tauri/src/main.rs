#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod utils;
mod wa;

fn main() {
    tauri::Builder::default()
        .setup(wa::setup::init)
        .invoke_handler(tauri::generate_handler![wa::cmd::new_wa, wa::cmd::open])
        .run(tauri::generate_context!())
        .expect("error while running WA+ application");
}
