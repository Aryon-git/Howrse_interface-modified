// color of the interface blue stuff  #37639cb3
//*
const headerCarouselContainerElement = document.querySelector('.header-carousel-container');
const headerNotificationsElement = document.getElementById('headerNotifications'); // not [0]
const headerPassesElement = document.querySelector('.header-currency.grid-table.direction-ltr.align-top.pass'); // das mal testen
const headerPrivateMessageElement = document.getElementById('privateMessage'); // */

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

    // fix the position of the notification elements 
    const notifEls = document.querySelectorAll('.submenu-style-1 .menu-notification');
    for (let notifEl of notifEls) {
        if (notifEl) {
            const prevTopN = window.getComputedStyle(notifEl).getPropertyValue('top');
            const prevPxN = parseFloat(prevTopN) || 0;
            notifEl.style.top = `${prevPxN - 5}px`;
        }
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

function hideRedNotificationDotIfExisting(parentObject) {
    if (parentObject?.querySelectorAll(".menu-notification").length > 0) {
       parentObject.querySelectorAll(".menu-notification")[0].style.display = 'none';
    }
}

function modifyNotificationsIfExisting(parentObject) {
    // change the background color
    if (parentObject?.querySelectorAll(".menu-notification").length > 0) {
        parentObject.querySelectorAll(".menu-notification")[0].style.background = '#37639cb3';
    }
}

function hideOtherLoginOptionsOnLoginPage() {
    if (document.querySelectorAll('.btn--white.btn--applegoogle').length > 0) {
        document.querySelectorAll('.btn--white.btn--applegoogle.width-100.mb--1.btn')[0].style.display = 'none';
    }
    if (document.querySelectorAll('.btn--white.btn--facebook').length > 0) {
        document.querySelectorAll('.btn--white.btn--facebook')[0].style.display = 'none';
    }
    if (document.querySelectorAll('.landing-login-separator.spacer-large-bottom').length > 0) {
        document.querySelectorAll('.landing-login-separator.spacer-large-bottom')[0].style.display = 'none';
    }
}

function modifyBackgroundImageOnHorseCarePages() {
    // old background: https://www.howrse.com/media/equideo/image/background/body/default/body-background-landing-prairie.jpg
    // if url contains elevage/chevaux/cheval AND if current background is 
    // https://www.howrse.de/media/equideo/image/background/body/default/body-background-v5.jpg
    let currentURL = window.location.href;
    let element = document.querySelector('.body-background');
    let backgroundImage = window.getComputedStyle(element).getPropertyValue('background-image');
    console.log(backgroundImage);
    console.log(currentURL.includes("elevage/chevaux/cheval"));
    console.log(backgroundImage.includes("/media/equideo/image/background/body/default/body-background-v5.jpg"));

    if (currentURL.includes("/elevage/chevaux/cheval") && backgroundImage.includes("/media/equideo/image/background/body/default/body-background-v5.jpg")) {
        console.log("trying to replace background image");
        document.styleSheets[0].insertRule(`
        #body-background {
            background-image: url("https://www.howrse.com/media/equideo/image/background/body/default/body-background-landing-prairie.jpg");
        }`)
    }
}

function findInCssBySelector(selector) {
    let cssRule;
    let count = 0;
    for (let styleSheet of document.styleSheets) {
        count++
        try {
            for (let rule of styleSheet.cssRules) {
                if (rule.selectorText === selector) {
                    cssRule = rule;
                    console.log(rule);
                    console.log(count);
                    break;
                }
            }
        } catch (e) {
            // skips stylesheets you don't have access to (i.e. CORS)
        }
        if (cssRule) return count;
    }
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
        if (result.extensionOptions.swapHorseBackgroundIfNoHelios) {
            modifyBackgroundImageOnHorseCarePages();
        }
        if (result.extensionOptions.blockAds) {
            removeBannerAside();
        }; 
        let headerCarouselMarketingTitle = document.querySelector('.header-carousel-container')?.querySelector('.header-carousel-slide:not(.hide)')?.innerText;
        if (headerCarouselMarketingTitle?.toLowerCase().includes("olymp")) {
            if (result.extensionOptions.hideOlympNotification) {
                hideRedNotificationDotIfExisting(headerCarouselContainerElement);
            } 
        } else if (result.extensionOptions.hideEventNotification) {
            hideRedNotificationDotIfExisting(headerCarouselContainerElement); // only if it's neither the ephemerals nor the olymp
        };

        
        if (result.extensionOptions.hidePassesNotification) {
            hideRedNotificationDotIfExisting(headerPassesElement);
        };
        if (result.extensionOptions.hideNotificationNotification) {
            hideRedNotificationDotIfExisting(headerNotificationsElement);
        } else if (result.extensionOptions.modifyNotificationNotification) {
            modifyNotificationsIfExisting(headerNotificationsElement);
        };
        if (result.extensionOptions.hidePMnotification) {
            hideRedNotificationDotIfExisting(headerPrivateMessageElement);
        } else if (result.extensionOptions.modifyPMnotification) {
            modifyNotificationsIfExisting(headerPrivateMessageElement);
        };

        if (result.extensionOptions.hideAlternativeLoginMethods) {
            hideOtherLoginOptionsOnLoginPage();
        }    
    });
}

fetchInformationFromOptionsPage();

