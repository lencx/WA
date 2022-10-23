use crate::utils;
use tauri::App;

pub fn init(_app: &mut App) -> std::result::Result<(), Box<dyn std::error::Error>> {
    let setting_file = &utils::wa_path("setting.json").to_owned();

    if !utils::exists(setting_file) {
        let _ = utils::create_file(setting_file);
    }

    Ok(())
}
