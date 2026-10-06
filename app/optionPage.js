//import ColorPicker from 'colorpicker.min.js'

// key in local storage
const STORAGE_KEY = 'extensionOptions';

// References on the elements
const optRemoveHeaderBlur = document.getElementById('optRemoveHeaderBlur');
const optRemoveEventsBlur = document.getElementById('optRemoveEventsBlur');
const optReduceSubmenuHeight = document.getElementById('optReduceSubmenuHeight');
const optHideHeaderBackButton = document.getElementById('optHideHeaderBackButton');
const optSwapHorseBackgroundIfNoHelios = document.getElementById('optSwapHorseBackground');
const optBlockAds = document.getElementById('optBlockAds');
const optHideAlternativeLoginMethods = document.getElementById('optHideAlternativeLoginMethods');

const optHideOlympNotification = document.getElementById('optHideOlympNotif');

const optHideEventNotification = document.getElementById('optHideEventNotif');
const optHidePassesNotification = document.getElementById('optHidePassesNotif');
const optHideNotificationNotification = document.getElementById('optHideNotifNotif');
const optModifyNotificationNotification = document.getElementById('optModifyNotifNotif');
const optHidePMnotification = document.getElementById('optHideMessagesNotif');
const optModifyPMnotification = document.getElementById('optModifyMessagesNotif');

const saveBtn = document.getElementById('saveBtn');

// Loads settings from localStorage and sets the checkboxes
function loadOptions() {
    chrome.storage.local.get("extensionOptions").then(result=> {
        if (!result.extensionOptions) { // if no options were changed so far
            optRemoveHeaderBlur.checked = true;
            optRemoveEventsBlur.checked = true;
            optReduceSubmenuHeight.checked = false;
            optHideHeaderBackButton.checked = false;
            optBlockAds.checked = false;
            optHideAlternativeLoginMethods.checked = false;

            optHideOlympNotification.checked = false;

            optHideEventNotification.checked = false;
            optHidePassesNotification.checked = false;
            optHideNotificationNotification.checked = false;
            optModifyNotificationNotification.checked = false;
            optHidePMnotification.checked = false;
            optModifyPMnotification.checked = false;
            return;
        };
        optRemoveHeaderBlur.checked = result.extensionOptions.removeHeaderBlur;
        optRemoveEventsBlur.checked = result.extensionOptions.removeEventsBlur;
        optReduceSubmenuHeight.checked = result.extensionOptions.reduceSubmenuHeight;
        optHideHeaderBackButton.checked = result.extensionOptions.hideHeaderBackButton;
        optSwapHorseBackgroundIfNoHelios.checked = result.extensionOptions.swapHorseBackgroundIfNoHelios;
        optBlockAds.checked = result.extensionOptions.blockAds;
        optHideAlternativeLoginMethods.checked = result.extensionOptions.hideAlternativeLoginMethods;

        optHideOlympNotification.checked = result.extensionOptions.hideOlympNotification;

        optHideEventNotification.checked = result.extensionOptions.hideEventNotification;
        optHidePassesNotification.checked = result.extensionOptions.hidePassesNotification;
        optHideNotificationNotification.checked = result.extensionOptions.hideNotificationNotification;
        optModifyNotificationNotification.checked = result.extensionOptions.modifyNotificationNotification;
        optHidePMnotification.checked = result.extensionOptions.hidePMnotification;
        optModifyPMnotification.checked = result.extensionOptions.modifyPMnotification;
    });
}

// Saves current checkbox settings in localStorage
function saveOptions() {
    const cfg = {
        removeHeaderBlur: optRemoveHeaderBlur.checked,
        removeEventsBlur: optRemoveEventsBlur.checked,
        reduceSubmenuHeight: optReduceSubmenuHeight.checked,
        hideHeaderBackButton: optHideHeaderBackButton.checked,
        swapHorseBackgroundIfNoHelios: optSwapHorseBackgroundIfNoHelios.checked,
        blockAds: optBlockAds.checked,
        hideAlternativeLoginMethods: optHideAlternativeLoginMethods.checked,

        hideOlympNotification: optHideOlympNotification.checked,

        hideEventNotification: optHideEventNotification.checked,
        hidePassesNotification: optHidePassesNotification.checked,
        hideNotificationNotification: optHideNotificationNotification.checked,
        modifyNotificationNotification: optModifyNotificationNotification.checked,
        hidePMnotification: optHidePMnotification.checked,
        modifyPMnotification: optModifyPMnotification.checked,
    };
    console.log("click received");
    chrome.storage.local.set({ "extensionOptions": cfg });
    console.log("saved");
    saveBtn.textContent = 'Saved';
    setTimeout(() => { saveBtn.textContent = 'Save'; }, 1000);
    if (cfg.log) console.log('Options saved:', cfg);
}


// Event-Listener
document.addEventListener('DOMContentLoaded', loadOptions);
saveBtn.addEventListener('click', saveOptions);
