use anyhow::Result;
use std::fs::{self, File};
use std::path::Path;

pub fn exists(path: &Path) -> bool {
  Path::new(path).exists()
}

pub fn create_file(path: &Path) -> Result<File> {
  if let Some(p) = path.parent() {
      fs::create_dir_all(p)?
  }

  File::create(path).map_err(Into::into)
}