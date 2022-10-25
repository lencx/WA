use tauri::utils::assets::EmbeddedAssets;
use tauri::{AboutMetadata, Context, CustomMenuItem, Menu, MenuItem, Submenu, WindowMenuEvent};

pub fn init(context: &Context<EmbeddedAssets>) -> Menu {
    let name = &context.package_info().name;
    let app_menu = Submenu::new(
        name,
        Menu::new()
            .add_native_item(MenuItem::About(name.into(), AboutMetadata::default()))
            .add_native_item(MenuItem::Separator)
            .add_item(
                CustomMenuItem::new("preferences".to_string(), "Preferences...")
                .accelerator("CmdOrCtrl+,".to_string()),
            )
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Hide)
            .add_native_item(MenuItem::HideOthers)
            .add_native_item(MenuItem::ShowAll)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Quit));

    let help_menu = Submenu::new(
        "Help",
        Menu::new().add_item(
            CustomMenuItem::new("dev_tools".to_string(), "Toggle Developer Tools")
                .accelerator("CmdOrCtrl+I"),
        ),
    );

    Menu::new().add_submenu(app_menu).add_submenu(help_menu)
}

pub fn handler(event: WindowMenuEvent) {
    let win = Some(event.window()).unwrap();
    dbg!(&event);
    match event.menu_item_id() {
        "preferences" => {
            dbg!("Preferences");
        }
        "dev_tools" => {
            win.open_devtools();
            win.close_devtools();
        }
        _ => (),
    }
}
