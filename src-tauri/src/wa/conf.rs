pub const WA_ROOT: &str = ".wa";

// window.open not working: https://github.com/tauri-apps/wry/issues/649
pub const INIT_SCRIPT: &str = r#"
(function wa_init() {
  function setAttr(el) {
    if (el.getAttribute('target') === '_blank') {
      el.setAttribute('target', '_self');
    }
  }
  window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a').forEach(setAttr);
    new MutationObserver(function (mutationsList) {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          if (mutation.addedNodes.length) {
            mutation.addedNodes.forEach(function(item) {
              if (item.childNodes.length) {
                item.childNodes.forEach(function(i) {
                  if (i.nodeType !== 1) return;
                  if (i.nodeName === 'A') {
                    setAttr(i);
                  } else {
                    i.querySelectorAll('a').forEach(setAttr);
                  }
                })
              }
            })
          }
        }
      }
    }).observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
})();
"#;
