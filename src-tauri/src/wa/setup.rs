use tauri::{App, api::path as TauriPath};
use crate::wa::conf::WA_ROOT;
use crate::utils;

pub fn init(_app: &mut App) -> std::result::Result<(), Box<dyn std::error::Error>> {
    let root = TauriPath::home_dir().unwrap().join(WA_ROOT);
    let setting_file = &root.join("setting.json");

    if !utils::exists(setting_file) {
        let _ = utils::create_file(setting_file);
    }
    Ok(())
}
