use crate::wa::conf::WAState;

#[tauri::command]
pub fn tray_blink(
    app: tauri::AppHandle,
    state: tauri::State<WAState>,
    is_run: bool,
    ms: Option<u64>,
    icon_path_1: Option<String>,
    icon_path_2: Option<String>,
) {
    // https://docs.rs/tokio/latest/tokio/task/struct.JoinHandle.html#method.abort
    if let Ok(Some(v)) = state.tray_blink_id.lock()
        .as_deref_mut()
        .map(|x| x.as_mut()) { v.abort() }

    if !is_run {
        return;
    }

    *state.tray_blink_id.lock().unwrap() = Some(tokio::spawn(async move {
        let path1 = &icon_path_1.unwrap();
        let path2 = &icon_path_2.unwrap();
        let mut count = 0;

        loop {
            // ms: default is 500ms
            tokio::time::sleep(std::time::Duration::from_millis(ms.unwrap_or(500))).await;
            count += 1;

            let path = if count % 2 == 0 {
                path2
            } else {
                path1
            };

            app
                .tray_handle()
                .set_icon(tauri::Icon::File(std::path::PathBuf::from(path)))
                .unwrap();
        }
    }));
}
