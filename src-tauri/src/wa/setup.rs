use tauri::{App, Manager};
use window_shadows::set_shadow;

use crate::utils;

pub fn init(app: &mut App) -> std::result::Result<(), Box<dyn std::error::Error>> {
    let search_window = app.get_window("search").unwrap();
    set_shadow(&search_window, true).expect("Unsupported platform!");

    let setting_file = &utils::wa_path("setting.json").to_owned();

    if !utils::exists(setting_file) {
        let _ = utils::create_file(setting_file);
    }

    Ok(())
}
