function fixAdZ() {
    const z = document.querySelector('.banner--leaderboard');
    if (!z) return;
    z.style['z-index'] = 0;
}

function removeHeaderBlur() {
    document.styleSheets[4].insertRule(
        `
        #header-hud {
            border-style: none;
            box-shadow: none;
        }
        `,
        0
    );

    document.styleSheets[4].insertRule(
        `
        #header-hud::before {
            background: none;
            backdrop-filter: none;
        }
        `,
        0
    );
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

    // fix the position of the notification element 
    const notifEl = document.querySelector('.submenu-style-1 .menu-notification');
    if (notifEl) {
        const prevTopN = window.getComputedStyle(notifEl).getPropertyValue('top');
        const prevPxN = parseFloat(prevTopN) || 0;
        notifEl.style.top = `${prevPxN - 5}px`;
    }

    // fix the position of the forum submenus to match the others
    const subEls = document.querySelectorAll('.submenu-style-1 a.level-3');
    if (!subEls || subEls.length === 0) return;
    subEls.forEach((el) => {
      el.style.height = '34px';
      el.style.lineHeight = '34px'; // vertical centering
      el.style.padding = '0 30px 0 10px';
    });

    // fix the position of the subforum icons // top right bottom left
    let cssRule;
    let count = 0;
    for (let styleSheet of document.styleSheets) {
        count++
        try {
            for (let rule of styleSheet.cssRules) {
                if (rule.selectorText === '.level-3 .header-icon') {
                    cssRule = rule;
                    console.log(rule);
                    console.log(count);
                    break;
                }
            }
        } catch (e) {
            // skips stylesheets you don't have access to (i.e. CORS)
        }
        if (cssRule) break;
    }
    document.styleSheets[count].insertRule(
        `
        .level-3 .header-icon {
            padding: 0px 20px 10px 10px; 
            fill: #AF9C8C;
        }`,
        0
    )
}

function adjustSubmenuEventTop(offsetPx) {
    const el = document.querySelector('.submenu--event');
    if (!el) return;
    const prevTop = window.getComputedStyle(el).getPropertyValue('top');
    const prevPx = parseFloat(prevTop) || 0;
    el.style.top = `${prevPx - offsetPx}px`;
}

function hideHeaderBackButton() {
    const el = document.querySelector('.js-header__button');
    el.style.display = 'none';

}

function fetchInformationFromOptionsPage() {
    chrome.storage.local.get("extensionOptions").then(result=> {
        if (!result.extensionOptions) { // if no options were changed so far
            removeHeaderBlur();
            removeEventBlur();
            return;
        };
        if (result.extensionOptions.removeHeaderBlur) {
            removeHeaderBlur();
        };
        if (result.extensionOptions.removeEventsBlur) {
            removeEventBlur();
        };
        if (result.extensionOptions.reduceSubmenuHeight) {
            reduceSubmenuHeight();
        };
        if (result.extensionOptions.hideHeaderBackButton) {
            hideHeaderBackButton();
        };
        if (result.extensionOptions.blockAds) {
            removeBannerAside();
        }
    });
}

fetchInformationFromOptionsPage();

