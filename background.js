browser.contextMenus.create({
    id: "mi-opcion-youtube",
    title: "Mi opción en YouTube",
    contexts: ["page", "selection", "video"],
    documentUrlPatterns: ["*://www.youtube.com/*", "*://m.youtube.com/*"]
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "mi-opcion-youtube") {
        console.log("Has hecho clic en la opción de YouTube");
    }
});
