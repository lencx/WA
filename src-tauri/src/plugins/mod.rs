use tauri::{plugin::Plugin, Invoke, Runtime};
pub mod fs_extra;

/// Tauri plugin.
pub struct WaExtra<R: Runtime> {
  invoke_handler: Box<dyn Fn(Invoke<R>) + Send + Sync>,
}

impl<R: Runtime> Default for WaExtra<R> {
  fn default() -> Self {
      Self {
          invoke_handler: Box::new(tauri::generate_handler![
            // fs
            fs_extra::exists,
            fs_extra::metadata,
            fs_extra::open_file,
          ]),
      }
  }
}

impl<R: Runtime> Plugin<R> for WaExtra<R> {
  fn name(&self) -> &'static str {
      "wa"
  }

  fn extend_api(&mut self, message: Invoke<R>) {
      (self.invoke_handler)(message)
  }
}
