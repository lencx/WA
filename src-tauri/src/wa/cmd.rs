const INIT_SCRIPT: &str = r#"
console.log("WA+");
"#;

use std::process::Command;

#[tauri::command]
pub async fn new_wa(app: tauri::AppHandle, label: String, title: String, url: String) {
    let _window = tauri::WindowBuilder::new(
        &app,
        label,
        tauri::WindowUrl::App(url.into()),
    )
    .initialization_script(INIT_SCRIPT)
    .title(title)
    .build().unwrap();
}

#[tauri::command]
pub fn open(path: &str) {
    #[cfg(target_os = "windows")]
    Command::new("explorer")
        .args(["/select", path])
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