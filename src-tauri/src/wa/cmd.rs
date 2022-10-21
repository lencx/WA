// window.open not working: https://github.com/tauri-apps/wry/issues/649
const INIT_SCRIPT: &str = r#"
(function wa_init() {
  window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a').forEach(function(i) {
      if (i.getAttribute('target') === '_blank') {
        i.setAttribute('target', '_self')
      }
    });
  });
})();
"#;

use std::{fs, process::Command};
use tauri::Manager;
use tauri::api::dialog;

use crate::utils;

#[tauri::command]
pub async fn new_wa(app: tauri::AppHandle, label: String, title: String, url: String, script: Option<String>) {
    let mut user_script = INIT_SCRIPT.to_string();
    if !script.is_none() && !script.as_ref().unwrap().is_empty() {
      let script = utils::wa_path(&script.unwrap());
      let script_path = script.clone().to_string_lossy().to_string();
      let content = fs::read_to_string(script).unwrap_or_else(|msg| {
        let main_window = app.get_window("main").unwrap();
        let err_msg = format!("[app.items.script] {}\n{}", script_path, msg.to_string());
        dialog::message(Some(&main_window), &title, err_msg);
        "".to_string()
      });
      user_script = format!("{}{}", INIT_SCRIPT.to_string(), content);
    }

    std::thread::spawn(move || {
        let _window = tauri::WindowBuilder::new(
            &app,
            label,
            tauri::WindowUrl::External(url.parse().unwrap()),
        )
        .initialization_script(&user_script)
        .title(title)
        .build()
        .unwrap();
    });
}

#[tauri::command]
pub fn open(path: &str) {
    #[cfg(target_os = "windows")]
    Command::new("explorer")
        .args(["/select,", path])
        .spawn()
        .unwrap();

    #[cfg(target_os = "macos")]
    Command::new("open")
        .args(["-R", path])
        .spawn()
        .unwrap();

    // https://askubuntu.com/a/31071
    #[cfg(target_os = "linux")]
    Command::new("xdg-open")
        .arg(path)
        .spawn()
        .unwrap();
}
