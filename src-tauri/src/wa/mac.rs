use cocoa::appkit::{NSWindow, NSWindowStyleMask, NSWindowTitleVisibility};
use tauri::Window;

#[cfg(target_os = "macos")]
pub fn set_transparent_titlebar(window: &Window, title_transparent: bool, remove_tool_bar: bool) {
    unsafe {
        let id = window.ns_window().unwrap() as cocoa::base::id;
        NSWindow::setTitlebarAppearsTransparent_(id, cocoa::base::YES);
        let mut style_mask = id.styleMask();
        style_mask.set(
            NSWindowStyleMask::NSFullSizeContentViewWindowMask,
            title_transparent,
        );

        if remove_tool_bar {
            style_mask.remove(
                NSWindowStyleMask::NSClosableWindowMask
                    | NSWindowStyleMask::NSMiniaturizableWindowMask
                    | NSWindowStyleMask::NSResizableWindowMask,
            );
        }

        id.setStyleMask_(style_mask);

        id.setTitleVisibility_(if title_transparent {
            NSWindowTitleVisibility::NSWindowTitleHidden
        } else {
            NSWindowTitleVisibility::NSWindowTitleVisible
        });

        id.setTitlebarAppearsTransparent_(if title_transparent {
            cocoa::base::YES
        } else {
            cocoa::base::NO
        });
    }
}
