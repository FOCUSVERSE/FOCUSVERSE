const CONFIG = {
    androidUrl: "https://github.com/panditji11029-hash/FOCUSVERSE/releases/latest/download/app-debug.apk",
    windowsUrl: "https://github.com/panditji11029-hash/FOCUSVERSE/releases/latest"
};

document.addEventListener("DOMContentLoaded", () => {
    const androidButton = document.getElementById("androidDownload");
    const windowsButton = document.getElementById("windowsDownload");

    if (androidButton) {
        androidButton.href = CONFIG.androidUrl;
        androidButton.removeAttribute("target");
    }

    if (windowsButton) {
        windowsButton.href = CONFIG.windowsUrl;
    }
});
