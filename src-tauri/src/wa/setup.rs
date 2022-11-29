use tauri::{App, GlobalShortcutManager, Manager};

use crate::{utils, wa::conf, wa::cmd};

pub fn init(app: &mut App) -> std::result::Result<(), Box<dyn std::error::Error>> {
    // check `~/.wa/setting.json`
    let wa = app.handle();
    let setting_file = &utils::wa_path("setting.json");

    if !utils::exists(setting_file) {
        // create setting.json
        utils::create_file(setting_file).unwrap();
        std::fs::write(setting_file, conf::WA_INIT_SETTING).unwrap();

        // init setting
        let setting_json = utils::read_json(conf::WA_INIT_SETTING).unwrap();
        // TODO: theme: https://github.com/tauri-apps/tauri/issues/5279
        // let theme = &setting_json["theme"].as_str().unwrap();
        let title = &setting_json["title"].as_str().unwrap();
        let search_shortcut = &setting_json["shortcut.search"].as_str().unwrap();
        let mut shortcut = app.global_shortcut_manager();
        let is_search_key = shortcut.is_registered(search_shortcut);
        let main_window = wa.get_window("main").unwrap();
        main_window.set_title(title).unwrap();
        let app = main_window.app_handle();

        std::thread::spawn(move|| {
            cmd::new_window(app, "help".to_string(), "WA+ Help".to_string(), "/help".to_string())
        });

        if !is_search_key.unwrap() {
            shortcut
                .register(search_shortcut, move|| {
                    cmd::search_window(main_window.app_handle());
                })
                .unwrap();
        }
    } else {
        utils::setting_init(wa);
    }

    Ok(())
}
