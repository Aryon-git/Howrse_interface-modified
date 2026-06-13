function fixAdZ() {
    const z = document.querySelector('.banner--leaderboard');
    if (!z) return;
    z.style['z-index'] = 0;
}

function removeHeaderBlur() {
    const el = document.querySelector('#header-hud');
    if (!el) return;
    el.style.background = 'none';
    el.style.backdropFilter = 'none';
    el.style.webkitBackdropFilter = 'none';
    el.style.borderStyle = 'none';
    el.style.boxShadow = 'none';
  }

function stopHeaderFollowing() { 
    const el = document.querySelector('#header-hud');
    if (!el) return;
    el.style.position = 'initial';

    const header = document.querySelector('#header');
    if (header) header.style.paddingTop = '0px';

    const headerMenu = document.querySelector('#header-menu');
    if (headerMenu) {
      const prev = window.getComputedStyle(headerMenu).getPropertyValue('padding-top');
      const prevPx = parseFloat(prev) || 0;
      const newPx = Math.max(0, prevPx - 64);
      headerMenu.style.paddingTop = `${newPx}px`;
      adjustSubmenuEventTop(64);
    }

    fixAdZ(); // so notifications don't hide behind the ad banner
}

function removeEventBlur() {
    const el = document.querySelector('.submenu--event');
    if (!el) return;
    el.style.backdropFilter = 'none';
}

function removeBannerAside() {
    const el = document.querySelector('aside.banner');
    if (!el) return;
    const header = document.querySelector('#header');
    if (header) header.style.paddingTop = '0px';
    el.remove();
    const headerHud = document.querySelector('#header-hud');
    if (!headerHud) return;
    headerHud.style.marginBottom = '0';
}

function reduceSubmenuHeight() {
    const els = document.querySelectorAll('.submenu-style-1 a.level-2');
    if (!els || els.length === 0) return;
    els.forEach((el) => {
      el.style.height = '34px';
      el.style.lineHeight = '34px'; // vertical centering
      el.style.padding = '0 30px 0 10px';
    });
    const notifEl = document.querySelector('.submenu-style-1 .menu-notification');
    if (notifEl) {
        const prevTopN = window.getComputedStyle(notifEl).getPropertyValue('top');
        const prevPxN = parseFloat(prevTopN) || 0;
        notifEl.style.top = `${prevPxN - 5}px`;
    }
}

function adjustSubmenuEventTop(offsetPx) {
    const el = document.querySelector('.submenu--event');
    if (!el) return;
    const prevTop = window.getComputedStyle(el).getPropertyValue('top');
    const prevPx = parseFloat(prevTop) || 0;
    el.style.top = `${prevPx - offsetPx}px`;
}

function fetchInformationFromOptionsPage() {
    chrome.storage.local.get("extensionOptions").then(result=> {
        if (!result.extensionOptions) { // if no options were changed so far
            removeHeaderBlur();
            stopHeaderFollowing();
            removeEventBlur();
            return;
        };
        if (result.extensionOptions.removeHeaderBlur) {
            removeHeaderBlur();
        };
        if (result.extensionOptions.removeHeaderScroll) {
            stopHeaderFollowing();
        };
        if (result.extensionOptions.removeEventsBlur) {
            removeEventBlur();
        };
        if (result.extensionOptions.reduceSubmenuHeight) {
            reduceSubmenuHeight();
        };
        if (result.extensionOptions.blockAds) {
            removeBannerAside();
        }
    });
}

fetchInformationFromOptionsPage();