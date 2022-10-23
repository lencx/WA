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

    function waKey(e, key, callback) {
      if ((e.key === key && e.metaKey) || (e.key === key && e.ctrlKey)) {
        callback();
      }
    }
    document.addEventListener('keyup', function (e) {
      waKey(e, 'r', function() {window.location.reload()});
      waKey(e, 'ArrowUp', function() {window.scroll({ top: 0, left: 0, behavior: 'smooth' })});
      waKey(e, 'ArrowDown', function() {window.scroll({ top: document.body.scrollHeight, left: 0, behavior: 'smooth' })});
      waKey(e, '[', function() {window.history.go(-1)});
      waKey(e, ']', function() {window.history.go(1)});
    });
  });
})();