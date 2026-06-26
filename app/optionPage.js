// key in local storage
const STORAGE_KEY = 'extensionOptions';

// References on the elements
const optRemoveHeaderBlur = document.getElementById('optRemoveHeaderBlur');
const optRemoveEventsBlur = document.getElementById('optRemoveEventsBlur');
const optReduceSubmenuHeight = document.getElementById('optReduceSubmenuHeight');
const optHideHeaderBackButton = document.getElementById('optHideHeaderBackButton');
const optBlockAds = document.getElementById('optBlockAds');

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
            return;
        };
        optRemoveHeaderBlur.checked = result.extensionOptions.removeHeaderBlur;
        optRemoveEventsBlur.checked = result.extensionOptions.removeEventsBlur;
        optReduceSubmenuHeight.checked = result.extensionOptions.reduceSubmenuHeight;
        optHideHeaderBackButton.checked = result.extensionOptions.hideHeaderBackButton;
        optBlockAds.checked = result.extensionOptions.blockAds;
    });
}

// Saves current checkbox settings in localStorage
function saveOptions() {
    const cfg = {
        removeHeaderBlur: optRemoveHeaderBlur.checked,
        removeEventsBlur: optRemoveEventsBlur.checked,
        reduceSubmenuHeight: optReduceSubmenuHeight.checked,
        hideHeaderBackButton: optHideHeaderBackButton.checked,
        blockAds: optBlockAds.checked
    };
    chrome.storage.local.set({ "extensionOptions": cfg });
    saveBtn.textContent = 'Saved';
    setTimeout(() => { saveBtn.textContent = 'Save'; }, 1000);
    if (cfg.log) console.log('Options saved:', cfg);
}

// Event-Listener
document.addEventListener('DOMContentLoaded', loadOptions);
saveBtn.addEventListener('click', saveOptions);