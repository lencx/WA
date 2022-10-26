use anyhow::Result;
use serde_json;
use std::fs::{self, File};
use std::path::{Path, PathBuf};
use tauri::api::path as TauriPath;

use crate::wa::conf::WA_ROOT;

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

pub fn read_json(content: &str) -> serde_json::Result<serde_json::Value> {
    let v: serde_json::Value = serde_json::from_str(content)?;
    Ok(v)
}
