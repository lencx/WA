use tauri::{App, GlobalShortcutManager, Manager};

use crate::{utils, wa::conf};

pub fn init(app: &mut App) -> std::result::Result<(), Box<dyn std::error::Error>> {
    // check `~/.wa/setting.json`
    let wa = app.handle();
    let setting_file = &utils::wa_path("setting.json").to_owned();

    if !utils::exists(setting_file) {
        // create setting.json
        utils::create_file(setting_file).unwrap();
        std::fs::write(setting_file, conf::WA_SETTING_JSON).unwrap();

        // init setting
        let setting_json = utils::read_json(conf::WA_SETTING_JSON).unwrap();
        // TODO: theme: https://github.com/tauri-apps/tauri/issues/5279
        // let theme = &setting_json["theme"].as_str().unwrap();
        let title = &setting_json["title"].as_str().unwrap();
        let search_shortcut = &setting_json["shortcut.search"].as_str().unwrap();
        let mut shortcut = app.global_shortcut_manager();
        let is_search_key = shortcut.is_registered(search_shortcut);
        let main_window = wa.get_window("main").unwrap();

        main_window.set_title(title).unwrap();

        if !is_search_key.unwrap() {
            shortcut
                .register(search_shortcut, move || {
                    main_window.emit("WA_EVENT", "SEARCH").unwrap();
                })
                .unwrap();
        }
    }

    Ok(())
}
