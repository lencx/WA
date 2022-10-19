use crate::utils;
use crate::wa::conf::WA_ROOT;
use tauri::{api::path as TauriPath, App, Manager};
use window_shadows::set_shadow;

pub fn init(app: &mut App) -> std::result::Result<(), Box<dyn std::error::Error>> {
    let search_window = app
        .get_window("search").unwrap();
    set_shadow(&search_window, true).expect("Unsupported platform!");

    let root = TauriPath::home_dir().unwrap().join(WA_ROOT);
    let setting_file = &root.join("setting.json");

    if !utils::exists(setting_file) {
        let _ = utils::create_file(setting_file);
    }

    Ok(())
}
