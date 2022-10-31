#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod utils;
mod wa;

fn main() {
    let content = tauri::generate_context!();
    tauri::Builder::default()
        .setup(wa::setup::init)
        .invoke_handler(tauri::generate_handler![
            wa::cmd::wa_window,
            wa::cmd::open_file,
        ])
        .menu(wa::menu::init(&content))
        .on_menu_event(wa::menu::handler)
        .run(content)
        .expect("error while running WA+ application");
}
