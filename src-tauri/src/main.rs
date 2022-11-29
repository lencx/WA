#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod utils;
mod wa;
mod plugins;

#[tokio::main]
async fn main() {

    let content = tauri::generate_context!();
    tauri::Builder::default()
        .manage(wa::conf::WAState::default())
        .setup(wa::setup::init)
        .invoke_handler(tauri::generate_handler![
            wa::cmd::wa_window,
            wa::tray::tray_blink,
        ])
        .menu(wa::menu::init(&content))
        .on_menu_event(wa::menu::handler)
        .system_tray(tauri::SystemTray::default())
        .plugin(plugins::WaExtra::default())
        .run(content)
        .expect("error while running WA+ application");
}
