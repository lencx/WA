use std::sync::Mutex;

pub const WA_ROOT: &str = ".wa";
pub const WA_SETTING: &str = "setting.json";
pub const WA_INIT_SCRIPT: &str = include_str!("wa.js");
pub const WA_INIT_SETTING: &str = include_str!("wa.json");

pub struct WAState {
    pub tray_blink_id: Mutex<Option<tokio::task::JoinHandle<()>>>,
}

impl WAState {
    pub fn default() -> Self {
        WAState {
            tray_blink_id: Mutex::new(None),
        }
    }
}
