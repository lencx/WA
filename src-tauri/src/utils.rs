use anyhow::Result;
use serde_json::{self, json};
use std::fs::{self, File};
use std::path::{Path, PathBuf};
use tauri::{api::path as TauriPath, GlobalShortcutManager, Manager};

use crate::wa::{cmd::search_window, conf::{WA_ROOT, WA_SETTING}};

pub fn exists(path: &Path) -> bool {
    Path::new(path).exists()
}

pub fn create_file(path: &Path) -> Result<File> {
    if let Some(p) = path.parent() {
        fs::create_dir_all(p)?
    }

    File::create(path).map_err(Into::into)
}

pub fn wa_path(path: &str) -> PathBuf {
    TauriPath::home_dir().unwrap().join(WA_ROOT).join(path)
}

pub fn wa_script_path(path: &str) -> PathBuf {
    TauriPath::home_dir().unwrap().join(WA_ROOT).join("scripts").join(path)
}

pub fn read_json(content: &str) -> serde_json::Result<serde_json::Value> {
    let v: serde_json::Value = serde_json::from_str(content)?;
    Ok(v)
}

pub fn setting_init(app: tauri::AppHandle) {
    let setting = wa_path(WA_SETTING);
    let content = fs::read_to_string(setting).unwrap();
    let setting_json = read_json(&content).unwrap_or_else(|_| json!({ "title": "WA+" }));
    let title = &setting_json["title"].as_str().unwrap_or("WA+");
    let main_window = app.get_window("main").unwrap();

    // set title
    main_window.set_title(title).unwrap();

    // set shortcut
    let search_shortcut = &setting_json["shortcut.search"].as_str();
    if !search_shortcut.is_none() {
        let mut shortcut = app.global_shortcut_manager();
        let _search_shortcut = search_shortcut.unwrap();
        shortcut.unregister_all().unwrap();
        let is_search_key = shortcut.is_registered(_search_shortcut);

        if !is_search_key.unwrap() {
            shortcut
                .register(_search_shortcut, move || {
                    search_window(main_window.app_handle());
                })
                .unwrap();
        }
    }
}
