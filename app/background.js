class Storage {
    static saveJson(key, obj){
        try { localStorage.setItem(key, JSON.stringify(obj)); }
        catch(e) { /* ignore storage errors */ }
    }
    static loadJson(key, defaultValue){
        try {
            const s = localStorage.getItem(key);
            return s ? JSON.parse(s) : defaultValue;
        } catch(e) { return defaultValue; }
    }
}


browser.runtime.onMessage.addListener(async (msg, sender) => {
    if (msg.action === "getOptions") {
        const data = browser.storage.local.get(msg.key);
        return { value: data };
    }
});
