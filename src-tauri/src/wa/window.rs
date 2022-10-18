const INIT_SCRIPT: &str = r#"
console.log("WA+");
"#;

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
