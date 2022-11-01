use crate::{utils, wa::conf};
use std::{fs, process::Command};
use tauri::{api::dialog, command, Manager, WindowEvent};

#[cfg(not(target_os = "linux"))]
use window_shadows::set_shadow;

#[cfg(not(target_os = "linux"))]
use window_vibrancy::{self, NSVisualEffectMaterial};

#[cfg(target_os = "macos")]
use crate::wa::mac::set_transparent_titlebar;

#[command]
pub async fn wa_window(
    app: tauri::AppHandle,
    label: String,
    title: String,
    url: String,
    script: Option<String>,
) {
    // window.open not working: https://github.com/tauri-apps/wry/issues/649
    let mut user_script = conf::WA_INIT_SCRIPT.to_string();
    if !script.is_none() && !script.as_ref().unwrap().is_empty() {
        let script = utils::wa_path(&script.unwrap());
        let script_path = script.clone().to_string_lossy().to_string();
        let content = fs::read_to_string(script).unwrap_or_else(|msg| {
            let main_window = app.get_window("main").unwrap();
            let err_msg = format!("[app.items.script] {}\n{}", script_path, msg.to_string());
            dialog::message(Some(&main_window), &title, err_msg);
            "".to_string()
        });
        user_script = format!("{}\n\n// ***** [{}] User Script Inject ***** \n\n{}\n", user_script, title, content);
    }

    user_script = format!("(function() {{window.addEventListener('DOMContentLoaded', function() {{{}}})}})();", user_script);

    std::thread::spawn(move || {
        let _window = tauri::WindowBuilder::new(
            &app,
            label,
            tauri::WindowUrl::App(url.parse().unwrap()),
        )
        .initialization_script(&user_script)
        .title(title)
        .build()
        .unwrap();

        // TODO: window - menu event
        // window.on_menu_event(move|event| {
        //     dbg!(event);
        // });
    });
}

#[command]
pub fn open_file(path: &str) {
    #[cfg(target_os = "windows")]
    Command::new("explorer")
        .args(["/select,", path])
        .spawn()
        .unwrap();

    #[cfg(target_os = "macos")]
    Command::new("open").args(["-R", path]).spawn().unwrap();

    // https://askubuntu.com/a/31071
    #[cfg(target_os = "linux")]
    Command::new("xdg-open").arg(path).spawn().unwrap();
}

#[command]
pub fn search_window(app: tauri::AppHandle) {
    let win = app.get_window("search");
    if win.is_none() {
        let search_win = tauri::WindowBuilder::new(
            &app,
            "search",
            tauri::WindowUrl::App("/search".parse().unwrap()),
        )
        .inner_size(560.0, 60.0)
        .always_on_top(true)
        .title("WA+ Search")
        .resizable(false)
        .transparent(true)
        .focus()
        .build()
        .unwrap();

        search_win.on_window_event(move |event| match event {
            WindowEvent::Focused(is_focused) => {
                if !is_focused {
                    app.get_window("search").unwrap().close().unwrap();
                }
            }
            _ => (),
        });

        #[cfg(target_os = "macos")]
        set_transparent_titlebar(&search_win, true, true);

        #[cfg(target_os = "macos")]
        window_vibrancy::apply_vibrancy(
            &search_win,
            NSVisualEffectMaterial::FullScreenUI,
            None,
            None,
        )
        .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

        #[cfg(not(target_os = "linux"))]
        set_shadow(&search_win, true).expect("Unsupported platform!");

        #[cfg(target_os = "windows")]
        window_vibrancy::apply_blur(&search_win, Some((18, 18, 18, 125)))
            .expect("Unsupported platform! 'apply_blur' is only supported on Windows");
    }
}

#[command]
pub fn setting_window(app: tauri::AppHandle) {
    let win = app.get_window("setting");
    if win.is_none() {
        std::thread::spawn(move || {
            tauri::WindowBuilder::new(
                &app,
                "setting",
                tauri::WindowUrl::App("/setting?mode=shortcut".parse().unwrap()),
            )
            .inner_size(800.0, 600.0)
            .center()
            .title("WA+ Setting")
            .focus()
            .build()
            .unwrap()
            .on_window_event(move |event| match event {
                WindowEvent::Destroyed { .. } => {
                    utils::setting_init(app.clone());
                    app.get_window("main")
                        .unwrap()
                        .emit("WA_EVENT", "SETTING_RELOAD")
                        .unwrap();
                }
                _ => (),
            });
        });
    }
}

#[command]
pub fn new_window(app: tauri::AppHandle, label: String, title: String, url: String) {
    let win = app.get_window(&label);
    if win.is_none() {
        std::thread::spawn(move || {
            tauri::WindowBuilder::new(
                &app,
                label,
                tauri::WindowUrl::App(url.parse().unwrap()),
            )
            .inner_size(800.0, 600.0)
            .center()
            .title(title)
            .build()
            .unwrap();
        });
    }
}
