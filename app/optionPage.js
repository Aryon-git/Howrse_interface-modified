// key in local storage
const STORAGE_KEY = 'extensionOptions';

// References on the elements
const optRemoveHeaderBlur = document.getElementById('optRemoveHeaderBlur');
const optRemoveHeaderScroll = document.getElementById('optRemoveHeaderScroll');
const optRemoveEventsBlur = document.getElementById('optRemoveEventsBlur');
const optReduceSubmenuHeight = document.getElementById('optReduceSubmenuHeight');
const optBlockAds = document.getElementById('optBlockAds');

const saveBtn = document.getElementById('saveBtn');

// Loads settings from localStorage and sets the checkboxes
function loadOptions() {
    chrome.storage.local.get("extensionOptions").then(result=> {
        console.log(result)
        optRemoveHeaderBlur.checked = result.extensionOptions.removeHeaderBlur;
        optRemoveHeaderScroll.checked = result.extensionOptions.removeHeaderScroll;
        optRemoveEventsBlur.checked = result.extensionOptions.removeEventsBlur;
        optReduceSubmenuHeight.checked = result.extensionOptions.reduceSubmenuHeight;
        optBlockAds.checked = result.extensionOptions.blockAds;
    });
}

// Saves current checkbox settings in localStorage
function saveOptions() {
  const cfg = {
    removeHeaderBlur: optRemoveHeaderBlur.checked,
    removeHeaderScroll: optRemoveHeaderScroll.checked,
    removeEventsBlur: optRemoveEventsBlur.checked,
    reduceSubmenuHeight: optReduceSubmenuHeight.checked,
    blockAds: optBlockAds.checked
  };
  //try {
    chrome.storage.local.set({ "extensionOptions": cfg });
    console.log(cfg);
    // chrome.storage.local.get("extensionOptions").then(result=> {
    //     console.log(result)
    // });
    // kurzes visuelles Feedback (optional)
    saveBtn.textContent = 'Saved';
    setTimeout(() => { saveBtn.textContent = 'Save'; }, 1000);
    if (cfg.log) console.log('Options saved:', cfg);
  //} catch (e) {
  //  console.error('Error on saving options:', e);
  //}
}

// Event-Listener
document.addEventListener('DOMContentLoaded', loadOptions);
saveBtn.addEventListener('click', saveOptions);