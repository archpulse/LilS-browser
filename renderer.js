const { ipcRenderer, clipboard } = require("electron");

// ============================================
// i18n (Internationalization) Module
// ============================================
const translations = {
  en: {
    // Navigation
    searchPlaceholder: "Search the web or enter URL...",
    addBookmark: "Add to bookmarks (Ctrl+D)",

    // Menu
    newTab: "New Tab",
    newIncognitoWindow: "New Incognito Window",
    history: "History",
    downloads: "Downloads",
    bookmarksPanel: "Bookmarks Bar",
    addToBookmarks: "Add to Bookmarks",
    find: "Find on Page",
    fullscreen: "Fullscreen",
    settings: "Settings",
    closeTab: "Close Tab",
    zoomIn: "Zoom In",
    zoomOut: "Zoom Out",
    savePage: "Save Page",

    // Bookmarks
    google: "Google",
    youtube: "YouTube",
    github: "GitHub",

    // Settings
    settingsTitle: "Settings",
    settingsSaved: "Saved",
    changesAutoSave: "Changes are saved automatically",
    generalSettings: "General Settings",
    generalSettingsDesc: "Configure your homepage and default search engine",
    homepage: "Homepage",
    searchEngine: "Search Engine",
    slotsRow1: "Slots in 1st row (Start page)",
    slotsRow2: "Slots in 2nd row (Start page)",
    interface: "Interface",
    interfaceDesc: "Configure browser elements display",
    showBookmarksBar: "Show bookmarks bar",
    openHomeOnStart: "Open homepage on startup",
    bookmarks: "Bookmarks",
    bookmarksDesc: "Manage quick links to your favorite sites",
    addBookmarkBtn: "+ Add Bookmark",
    addCurrentPage: "Add Current Page",
    passwordManager: "Password Manager",
    passwordManagerDesc: "Your encrypted local password database",
    importCSV: "🔑 Import (CSV)",
    dataManagement: "Data",
    dataManagementDesc: "Manage browser data",
    clearHistory: "Clear History",
    resetSettings: "Reset Settings",
    language: "Language",
    languageDesc: "Select interface language",

    // New Tab
    greeting: {
      morning: "Good Morning",
      afternoon: "Good Afternoon",
      evening: "Good Evening",
      night: "Good Night",
    },

    // Find
    findPlaceholder: "Find on page...",

    // Context Menu
    back: "Back",
    forward: "Forward",
    reload: "Reload",
    copyLink: "Copy Link",
    copyImage: "Copy Image",
    saveImage: "Save Image",
    openInNewTab: "Open in New Tab",

    // Downloads
    downloadsTitle: "Downloads",
    noDownloads: "No downloads yet",

    // New Tab Page
    addShortcut: "Add",
    addBookmarkTitle: "Add Bookmark",
    urlPlaceholder: "URL (e.g., github.com)",
    namePlaceholder: "Name (e.g., GitHub)",
    cancel: "Cancel",
    save: "Save",
    deleteShortcut: "Delete shortcut",
    rightClickToDelete: "Right-click to delete shortcut",

    // Settings
    name: "Name",
    remove: "Remove",
    deletePassword: "Delete password for",
    clickToShowHide: "Click to show/hide",
    noLogin: "No login",

    // Tab Manager
    close: "Close",

    // Downloads
    openFile: "Open file:",

    // Date/Time
    today: "Today",
    yesterday: "Yesterday",

    // Status messages
    loading: "Loading...",
    completed: "Completed",
    interrupted: "Interrupted",
    cancelled: "Cancelled",

    // Misc
    clickToMute: "Click to mute",
    browserPage: "Browser page",
    page: "Page",

    // SSL
    secureConnection: "Secure connection",
    insecureConnection: "Insecure connection",

    // History page
    historyTitle: "History",
    nothingFound: "Nothing found",
    historyEmpty: "History is empty",
    searchInHistory: "Search in history...",
    clearHistoryBtn: "Clear History",

    // Settings page
    settingsPageTitle: "Settings",
    passwordDbEmpty:
      "Password database is empty. Import from Chrome or save on login.",

    // New tab
    newTabTitle: "New Tab",

    // Error pages
    insecureConnectionError: "Insecure connection",
    siteNotFound: "Site not found",
    siteNotFoundDesc: "DNS server cannot find IP address for this domain.",
    noInternet: "No internet",
    noInternetDesc: "Looks like you're offline. Check your cable or Wi-Fi.",
    timeoutError: "Timeout expired",
    timeoutErrorDesc: "Server took too long to respond. It may be overloaded.",
    certificateInvalid: "Site certificate is invalid or expired.",

    // Confirm dialogs
    clearHistoryConfirm: "Clear all browsing history?",
    resetSettingsConfirm: "Reset all settings to default values?",

    // Bookmarks
    newBookmark: "New Bookmark",

    // Downloads
    of: "of",
    mb: "MB",

    // Tab context menu
    pinTab: "Pin tab",
    unpinTab: "Unpin tab",
    muteTab: "Mute tab",
    unmuteTab: "Unmute tab",
    duplicateTab: "Duplicate",
    closeOtherTabs: "Close other tabs",
    closeTabsToRight: "Close tabs to the right",
    reopenClosedTab: "Reopen closed tab",

    // Main process dialogs
    savePasswordYes: "Yes, save",
    savePasswordNo: "Not now",
    passwordManagerTitle: "Password Manager",
    savePasswordFor: "Save password for site",
    noLoginText: "No login",
    csvPasswordsFilter: "CSV (Passwords)",
    sponsorSkipped: "⏭️ Skipped: Sponsor",
    integration: "Integration",
    toNotebookLM: "🧠 To NotebookLM",
    copied: "✅ Copied!",

    // Alerts
    noExtensions: "No extensions installed or loaded.",
    installedExtensions: "Installed extensions:",

    // Error page
    networkError: "Network Error",
    oopsSomethingWrong: "Oops, something went wrong",
    couldNotLoadPage: "Browser could not load this page.",
    tryAgain: "Try Again",

    // Navigation tooltips
    backBtn: "Back",
    forwardBtn: "Forward",
    refreshBtn: "Refresh",
    homeBtn: "Home",
    aiBtn: "AI Assistant",

    // Menu items
    incognitoMode: "Incognito Mode",
    extensions: "Extensions",
    zoom: "Zoom",
    zoomInBtn: "Zoom in",
    zoomOutBtn: "Zoom out",
    closeBrowser: "Close Browser",

    // Tab manager
    tabs: "Tabs",
    recentlyClosed: "Recently Closed",
    searchTabs: "Search tabs...",

    // Find bar
    previous: "Previous (Shift+Enter)",
    next: "Next (Enter)",
    closeFindBar: "Close (Esc)",

    // New tab search
    searchWebOrUrl: "Search the web or enter URL...",
  },

  uk: {
    // Navigation
    searchPlaceholder: "Пошук в інтернеті або введіть URL...",
    addBookmark: "Додати до закладок (Ctrl+D)",

    // Menu
    newTab: "Нова вкладка",
    newIncognitoWindow: "Нове вікно інкогніто",
    history: "Історія",
    downloads: "Завантаження",
    bookmarksPanel: "Панель закладок",
    addToBookmarks: "Додати до закладок",
    find: "Знайти на сторінці",
    fullscreen: "Повноекранний режим",
    settings: "Налаштування",
    closeTab: "Закрити вкладку",
    zoomIn: "Збільшити",
    zoomOut: "Зменшити",
    savePage: "Зберегти сторінку",

    // Bookmarks
    google: "Google",
    youtube: "YouTube",
    github: "GitHub",

    // Settings
    settingsTitle: "Налаштування",
    settingsSaved: "Збережено",
    changesAutoSave: "Зміни зберігаються автоматично",
    generalSettings: "Основні налаштування",
    generalSettingsDesc:
      "Налаштуйте домашню сторінку та пошукову систему за замовчуванням",
    homepage: "Домашня сторінка",
    searchEngine: "Пошукова система",
    slotsRow1: "Слотів у 1-му ряду (Стартова сторінка)",
    slotsRow2: "Слотів у 2-му ряду (Стартова сторінка)",
    interface: "Інтерфейс",
    interfaceDesc: "Налаштуйте відображення елементів браузера",
    showBookmarksBar: "Показувати панель закладок",
    openHomeOnStart: "Відкривати домашню сторінку при запуску",
    bookmarks: "Закладки",
    bookmarksDesc: "Керуйте швидкими посиланнями на улюблені сайти",
    addBookmarkBtn: "+ Додати закладку",
    addCurrentPage: "Додати поточну сторінку",
    passwordManager: "Менеджер паролів",
    passwordManagerDesc: "Ваша зашифрована локальна база паролів",
    importCSV: "🔑 Імпорт (CSV)",
    dataManagement: "Дані",
    dataManagementDesc: "Управління даними браузера",
    clearHistory: "Очистити історію",
    resetSettings: "Скинути налаштування",
    language: "Мова",
    languageDesc: "Виберіть мову інтерфейсу",

    // New Tab
    greeting: {
      morning: "Доброго ранку",
      afternoon: "Добрий день",
      evening: "Добрий вечір",
      night: "Доброї ночі",
    },

    // Find
    findPlaceholder: "Знайти на сторінці...",

    // Context Menu
    back: "Назад",
    forward: "Вперед",
    reload: "Оновити",
    copyLink: "Копіювати посилання",
    copyImage: "Копіювати зображення",
    saveImage: "Зберегти зображення",
    openInNewTab: "Відкрити в новій вкладці",

    // Downloads
    downloadsTitle: "Завантаження",
    noDownloads: "Завантажень поки немає",

    // New Tab Page
    addShortcut: "Додати",
    addBookmarkTitle: "Додати закладку",
    urlPlaceholder: "URL (наприклад: github.com)",
    namePlaceholder: "Назва (наприклад: GitHub)",
    cancel: "Скасувати",
    save: "Зберегти",
    deleteShortcut: "Видалити ярлик",
    rightClickToDelete: "ПКМ - видалити ярлик",

    // Settings
    name: "Назва",
    remove: "Видалити",
    deletePassword: "Видалити пароль для",
    clickToShowHide: "Клікніть, щоб показати/сховати",
    noLogin: "Без логіну",

    // Tab Manager
    close: "Закрити",

    // Downloads
    openFile: "Відкрити файл:",

    // Date/Time
    today: "Сьогодні",
    yesterday: "Вчора",

    // Status messages
    loading: "Завантаження...",
    completed: "Завершено",
    interrupted: "Перервано",
    cancelled: "Скасовано",

    // Misc
    clickToMute: "Клікніть, щоб вимкнути звук",
    browserPage: "Сторінка браузера",
    page: "Сторінка",

    // SSL
    secureConnection: "Безпечне з'єднання",
    insecureConnection: "Небезпечне з'єднання",

    // History page
    historyTitle: "Історія",
    nothingFound: "Нічого не знайдено",
    historyEmpty: "Історія порожня",
    searchInHistory: "Пошук в історії...",
    clearHistoryBtn: "Очистити історію",

    // Settings page
    settingsPageTitle: "Налаштування",
    passwordDbEmpty:
      "База паролів порожня. Імпортуйте з Chrome або зберігайте при вході.",

    // New tab
    newTabTitle: "Нова вкладка",

    // Error pages
    insecureConnectionError: "Небезпечне з'єднання",
    siteNotFound: "Сайт не знайдено",
    siteNotFoundDesc: "DNS-сервер не може знайти IP-адресу для цього домену.",
    noInternet: "Немає інтернету",
    noInternetDesc: "Схоже, ви офлайн. Перевірте кабель або Wi-Fi.",
    timeoutError: "Час очікування вичерпано",
    timeoutErrorDesc:
      "Сервер занадто довго не відповідав. Можливо, він перевантажений.",
    certificateInvalid: "Сертифікат сайту недійсний або прострочений.",

    // Confirm dialogs
    clearHistoryConfirm: "Очистити всю історію перегляду?",
    resetSettingsConfirm:
      "Скинути всі налаштування до значень за замовчуванням?",

    // Bookmarks
    newBookmark: "Нова закладка",

    // Downloads
    of: "з",
    mb: "МБ",

    // Tab context menu
    pinTab: "Закріпити вкладку",
    unpinTab: "Відкріпити вкладку",
    muteTab: "Вимкнути звук",
    unmuteTab: "Увімкнути звук",
    duplicateTab: "Дублювати",
    closeOtherTabs: "Закрити інші вкладки",
    closeTabsToRight: "Закрити вкладки справа",
    reopenClosedTab: "Відновити закриту вкладку",

    // Main process dialogs
    savePasswordYes: "Так, зберегти",
    savePasswordNo: "Не зараз",
    passwordManagerTitle: "Менеджер паролів",
    savePasswordFor: "Зберегти пароль для сайту",
    noLoginText: "Без логіну",
    csvPasswordsFilter: "CSV (Паролі)",
    sponsorSkipped: "⏭️ Пропущено: Спонсор",
    integration: "Інтеграція",
    toNotebookLM: "🧠 В NotebookLM",
    copied: "✅ Скопійовано!",

    // Alerts
    noExtensions: "Розширення не встановлені або не завантажені.",
    installedExtensions: "Встановлені розширення:",

    // Error page
    networkError: "Помилка мережі",
    oopsSomethingWrong: "Ой, щось пішло не так",
    couldNotLoadPage: "Браузер не зміг завантажити цю сторінку.",
    tryAgain: "Спробувати знову",

    // Navigation tooltips
    backBtn: "Назад",
    forwardBtn: "Вперед",
    refreshBtn: "Оновити",
    homeBtn: "Домівка",
    aiBtn: "AI Асистент",

    // Menu items
    incognitoMode: "Режим інкогніто",
    extensions: "Розширення",
    zoom: "Масштаб",
    zoomInBtn: "Збільшити",
    zoomOutBtn: "Зменшити",
    closeBrowser: "Закрити браузер",

    // Tab manager
    tabs: "Вкладки",
    recentlyClosed: "Нещодавно закриті",
    searchTabs: "Пошук вкладок...",

    // Find bar
    previous: "Попередній (Shift+Enter)",
    next: "Наступний (Enter)",
    closeFindBar: "Закрити (Esc)",

    // New tab search
    searchWebOrUrl: "Пошук в інтернеті або введіть URL...",
  },

  cs: {
    // Navigation
    searchPlaceholder: "Hledat na webu nebo zadat URL...",
    addBookmark: "Přidat do záložek (Ctrl+D)",

    // Menu
    newTab: "Nová karta",
    newIncognitoWindow: "Nové okno inkognito",
    history: "Historie",
    downloads: "Stahování",
    bookmarksPanel: "Panel záložek",
    addToBookmarks: "Přidat do záložek",
    find: "Najít na stránce",
    fullscreen: "Celá obrazovka",
    settings: "Nastavení",
    closeTab: "Zavřít kartu",
    zoomIn: "Přiblížit",
    zoomOut: "Oddálit",
    savePage: "Uložit stránku",

    // Bookmarks
    google: "Google",
    youtube: "YouTube",
    github: "GitHub",

    // Settings
    settingsTitle: "Nastavení",
    settingsSaved: "Uloženo",
    changesAutoSave: "Změny se ukládají automaticky",
    generalSettings: "Obecná nastavení",
    generalSettingsDesc:
      "Nakonfigurujte domovskou stránku a výchozí vyhledávač",
    homepage: "Domovská stránka",
    searchEngine: "Vyhledávač",
    slotsRow1: "Sloty v 1. řádku (Úvodní stránka)",
    slotsRow2: "Sloty ve 2. řádku (Úvodní stránka)",
    interface: "Rozhraní",
    interfaceDesc: "Nakonfigurujte zobrazení prvků prohlížeče",
    showBookmarksBar: "Zobrazit panel záložek",
    openHomeOnStart: "Otevřít domovskou stránku při spuštění",
    bookmarks: "Záložky",
    bookmarksDesc: "Spravujte rychlé odkazy na oblíbené stránky",
    addBookmarkBtn: "+ Přidat záložku",
    addCurrentPage: "Přidat aktuální stránku",
    passwordManager: "Správce hesel",
    passwordManagerDesc: "Vaše šifrovaná lokální databáze hesel",
    importCSV: "🔑 Import (CSV)",
    dataManagement: "Data",
    dataManagementDesc: "Správa dat prohlížeče",
    clearHistory: "Vymazat historii",
    resetSettings: "Obnovit nastavení",
    language: "Jazyk",
    languageDesc: "Vyberte jazyk rozhraní",

    // New Tab
    greeting: {
      morning: "Dobré ráno",
      afternoon: "Dobré odpoledne",
      evening: "Dobrý večer",
      night: "Dobrou noc",
    },

    // Find
    findPlaceholder: "Najít na stránce...",

    // Context Menu
    back: "Zpět",
    forward: "Vpřed",
    reload: "Obnovit",
    copyLink: "Kopírovat odkaz",
    copyImage: "Kopírovat obrázek",
    saveImage: "Uložit obrázek",
    openInNewTab: "Otevřít v nové kartě",

    // Downloads
    downloadsTitle: "Stahování",
    noDownloads: "Zatím žádná stahování",

    // New Tab Page
    addShortcut: "Přidat",
    addBookmarkTitle: "Přidat záložku",
    urlPlaceholder: "URL (např.: github.com)",
    namePlaceholder: "Název (např.: GitHub)",
    cancel: "Zrušit",
    save: "Uložit",
    deleteShortcut: "Smazat zástupce",
    rightClickToDelete: "Pravým tlačítkem - smazat zástupce",

    // Settings
    name: "Název",
    remove: "Odstranit",
    deletePassword: "Smazat heslo pro",
    clickToShowHide: "Klikněte pro zobrazení/skrytí",
    noLogin: "Bez přihlášení",

    // Tab Manager
    close: "Zavřít",

    // Downloads
    openFile: "Otevřít soubor:",

    // Date/Time
    today: "Dnes",
    yesterday: "Včera",

    // Status messages
    loading: "Načítání...",
    completed: "Dokončeno",
    interrupted: "Přerušeno",
    cancelled: "Zrušeno",

    // Misc
    clickToMute: "Klikněte pro ztlumení",
    browserPage: "Stránka prohlížeče",
    page: "Stránka",

    // SSL
    secureConnection: "Zabezpečené připojení",
    insecureConnection: "Nezabezpečené připojení",

    // History page
    historyTitle: "Historie",
    nothingFound: "Nic nenalezeno",
    historyEmpty: "Historie je prázdná",
    searchInHistory: "Hledat v historii...",
    clearHistoryBtn: "Vymazat historii",

    // Settings page
    settingsPageTitle: "Nastavení",
    passwordDbEmpty:
      "Databáze hesel je prázdná. Importujte z Chrome nebo ukládejte při přihlášení.",

    // New tab
    newTabTitle: "Nová karta",

    // Error pages
    insecureConnectionError: "Nezabezpečené připojení",
    siteNotFound: "Stránka nenalezena",
    siteNotFoundDesc: "DNS server nemůže najít IP adresu pro tuto doménu.",
    noInternet: "Žádný internet",
    noInternetDesc:
      "Vypadá to, že jste offline. Zkontrolujte kabel nebo Wi-Fi.",
    timeoutError: "Časový limit vypršel",
    timeoutErrorDesc: "Server příliš dlouho neodpovídal. Možná je přetížený.",
    certificateInvalid: "Certifikát stránky je neplatný nebo vypršel.",

    // Confirm dialogs
    clearHistoryConfirm: "Vymazat celou historii prohlížení?",
    resetSettingsConfirm: "Obnovit všechna nastavení na výchozí hodnoty?",

    // Bookmarks
    newBookmark: "Nová záložka",

    // Downloads
    of: "z",
    mb: "MB",

    // Tab context menu
    pinTab: "Připnout kartu",
    unpinTab: "Odepnout kartu",
    muteTab: "Ztlumit kartu",
    unmuteTab: "Zrušit ztlumení",
    duplicateTab: "Duplikovat",
    closeOtherTabs: "Zavřít ostatní karty",
    closeTabsToRight: "Zavřít karty vpravo",
    reopenClosedTab: "Obnovit zavřenou kartu",

    // Main process dialogs
    savePasswordYes: "Ano, uložit",
    savePasswordNo: "Teď ne",
    passwordManagerTitle: "Správce hesel",
    savePasswordFor: "Uložit heslo pro stránku",
    noLoginText: "Bez přihlášení",
    csvPasswordsFilter: "CSV (Hesla)",
    sponsorSkipped: "⏭️ Přeskočeno: Sponzor",
    integration: "Integrace",
    toNotebookLM: "🧠 Do NotebookLM",
    copied: "✅ Zkopírováno!",

    // Alerts
    noExtensions: "Žádná rozšíření nejsou nainstalována nebo načtena.",
    installedExtensions: "Nainstalovaná rozšíření:",

    // Error page
    networkError: "Chyba sítě",
    oopsSomethingWrong: "Jejda, něco se pokazilo",
    couldNotLoadPage: "Prohlížeč nemohl načíst tuto stránku.",
    tryAgain: "Zkusit znovu",

    // Navigation tooltips
    backBtn: "Zpět",
    forwardBtn: "Vpřed",
    refreshBtn: "Obnovit",
    homeBtn: "Domů",
    aiBtn: "AI Asistent",

    // Menu items
    incognitoMode: "Režim inkognito",
    extensions: "Rozšíření",
    zoom: "Přiblížení",
    zoomInBtn: "Přiblížit",
    zoomOutBtn: "Oddálit",
    closeBrowser: "Zavřít prohlížeč",

    // Tab manager
    tabs: "Karty",
    recentlyClosed: "Nedávno zavřené",
    searchTabs: "Hledat karty...",

    // Find bar
    previous: "Předchozí (Shift+Enter)",
    next: "Další (Enter)",
    closeFindBar: "Zavřít (Esc)",

    // New tab search
    searchWebOrUrl: "Hledat na webu nebo zadat URL...",
  },
};

// Current language
let currentLang = localStorage.getItem("lang") || "en";

// i18n function
function t(key) {
  const keys = key.split(".");
  let value = translations[currentLang];
  for (const k of keys) {
    value = value?.[k];
  }
  return value || key;
}

// Change language and update UI
function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem("lang", lang);
  // Save to file for main.js access
  ipcRenderer.send("save-language", lang);
  updateAllTranslations();
}

// Update all translatable elements
function updateAllTranslations() {
  // Update URL input placeholder
  if (urlInput) urlInput.placeholder = t("searchPlaceholder");

  // Update bookmark button title
  if (btnBookmark) btnBookmark.title = t("addBookmark");

  // Update find bar placeholder
  if (findInput) findInput.placeholder = t("findPlaceholder");

  // Update static HTML elements
  updateStaticHTMLTranslations();

  // Update dynamic elements
  updateDynamicTranslations();

  // Refresh active tab if it's settings or newtab
  const activeTab = tabs.find((tab) => tab.id === activeTabId);
  if (
    activeTab &&
    (activeTab.url === "browser://settings" ||
      activeTab.url === "browser://newtab")
  ) {
    if (activeTab.url === "browser://settings") {
      renderSettingsTab(activeTab);
    } else if (activeTab.url === "browser://newtab") {
      renderNewTabPage(activeTab);
    }
  }
}

// Update static HTML text elements
function updateStaticHTMLTranslations() {
  // New tab button
  const btnNewTab = document.getElementById("new-tab");
  if (btnNewTab) btnNewTab.title = `${t("newTab")} (Ctrl+T)`;

  // Tab manager button
  const btnTabManager = document.getElementById("btn-tab-manager");
  if (btnTabManager)
    btnTabManager.title = `${t("searchInHistory")} (Ctrl+Shift+A)`;

  // Downloads button
  if (btnDownloads) btnDownloads.title = t("downloads");

  // Menu items
  const menuNewTab = document.getElementById("menu-new-tab");
  if (menuNewTab)
    menuNewTab.innerHTML = `<span class="menu-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></span>${t("newTab")} <span class="menu-shortcut">Ctrl+T</span>`;

  const menuHistory = document.getElementById("menu-history");
  if (menuHistory)
    menuHistory.innerHTML = `<span class="menu-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></span>${t("history")} <span class="menu-shortcut">Ctrl+H</span>`;

  const menuDownloads = document.getElementById("menu-downloads");
  if (menuDownloads)
    menuDownloads.innerHTML = `<span class="menu-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></span>${t("downloads")} <span class="menu-shortcut">Ctrl+J</span>`;

  const menuBookmarksToggle = document.getElementById("menu-bookmarks-toggle");
  if (menuBookmarksToggle)
    menuBookmarksToggle.innerHTML = `<span class="menu-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg></span>${t("bookmarksPanel")} <span class="menu-shortcut">Ctrl+Shift+B</span>`;

  const menuBookmarkPage = document.getElementById("menu-bookmark-page");
  if (menuBookmarkPage)
    menuBookmarkPage.innerHTML = `<span class="menu-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg></span>${t("addToBookmarks")} <span class="menu-shortcut">Ctrl+D</span>`;

  const menuFind = document.getElementById("menu-find");
  if (menuFind)
    menuFind.innerHTML = `<span class="menu-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></span>${t("find")} <span class="menu-shortcut">Ctrl+F</span>`;

  const menuSavePage = document.getElementById("menu-save-page");
  if (menuSavePage)
    menuSavePage.innerHTML = `<span class="menu-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg></span>${t("savePage")} <span class="menu-shortcut">Ctrl+S</span>`;

  const menuFullscreen = document.getElementById("menu-fullscreen");
  if (menuFullscreen)
    menuFullscreen.innerHTML = `<span class="menu-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg></span>${t("fullscreen")} <span class="menu-shortcut">F11</span>`;

  const menuSettings = document.getElementById("menu-settings");
  if (menuSettings)
    menuSettings.innerHTML = `<span class="menu-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></span>${t("settings")} <span class="menu-shortcut">Ctrl+,</span>`;

  const menuClose = document.getElementById("menu-close");
  if (menuClose)
    menuClose.innerHTML = `<span class="menu-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></span>${t("closeTab")}`;

  // Tab context menu
  const ctxItems = document.querySelectorAll("#tab-context-menu .ctx-item");
  ctxItems.forEach((item) => {
    const action = item.dataset.action;
    if (action === "reload")
      item.innerHTML = `<svg class="ctx-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>${t("reload")}`;
    if (action === "duplicate")
      item.innerHTML = `<svg class="ctx-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>${t("duplicateTab")}`;
    if (action === "close")
      item.innerHTML = `<svg class="ctx-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>${t("closeTab")}`;
    if (action === "close-others")
      item.innerHTML = `<svg class="ctx-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>${t("closeOtherTabs")}`;
    if (action === "close-right")
      item.innerHTML = `<svg class="ctx-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>${t("closeTabsToRight")}`;
    if (action === "reopen")
      item.innerHTML = `<svg class="ctx-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>${t("reopenClosedTab")}`;
  });

  // Page context menu
  const pageCtxItems = document.querySelectorAll(
    "#page-context-menu .ctx-item",
  );
  pageCtxItems.forEach((item) => {
    const action = item.dataset.action;
    if (action === "back")
      item.innerHTML = `<svg class="ctx-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>${t("back")}`;
    if (action === "forward")
      item.innerHTML = `<svg class="ctx-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>${t("forward")}`;
    if (action === "reload")
      item.innerHTML = `<svg class="ctx-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>${t("reload")}`;
    if (action === "open-link")
      item.innerHTML = `<svg class="ctx-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>${t("openInNewTab")}`;
    if (action === "copy-link")
      item.innerHTML = `<svg class="ctx-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>${t("copyLink")}`;
    if (action === "save-image")
      item.innerHTML = `<svg class="ctx-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>${t("saveImage")}`;
    if (action === "copy-image")
      item.innerHTML = `<svg class="ctx-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>${t("copyImage")}`;
    if (action === "save-page")
      item.innerHTML = `<svg class="ctx-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>${t("savePage")}`;
  });

  // Downloads panel
  const downloadsHeader = document.querySelector("#downloads-panel h3");
  if (downloadsHeader) downloadsHeader.textContent = t("downloadsTitle");
}

// Update dynamic translations (tooltips, placeholders, etc.)
function updateDynamicTranslations() {
  // Navigation buttons
  const btnBack = document.getElementById("btn-back");
  if (btnBack) btnBack.title = t("backBtn");

  const btnForward = document.getElementById("btn-forward");
  if (btnForward) btnForward.title = t("forwardBtn");

  const btnRefresh = document.getElementById("btn-refresh");
  if (btnRefresh) btnRefresh.title = t("refreshBtn");

  const btnHome = document.getElementById("btn-home");
  if (btnHome) btnHome.title = t("homeBtn");

  const btnAi = document.getElementById("btn-ai");
  if (btnAi) btnAi.title = t("aiBtn");

  // Menu incognito
  const menuIncognito = document.getElementById("menu-incognito");
  if (menuIncognito)
    menuIncognito.innerHTML = `<span class="menu-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg></span>${t("incognitoMode")} <span class="menu-shortcut">Ctrl+Shift+N</span>`;

  // Menu extensions
  const menuExtensions = document.getElementById("menu-extensions");
  if (menuExtensions)
    menuExtensions.innerHTML = `<span class="menu-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M9 3v18M15 3v18M3 9h18M3 15h18"></path></svg></span>${t("extensions")}`;

  // Zoom controls
  const zoomLabel = document.querySelector(".menu-zoom-controls span");
  if (zoomLabel) zoomLabel.textContent = t("zoom");

  const menuZoomIn = document.getElementById("menu-zoom-in");
  if (menuZoomIn) menuZoomIn.title = t("zoomInBtn");

  const menuZoomOut = document.getElementById("menu-zoom-out");
  if (menuZoomOut) menuZoomOut.title = t("zoomOutBtn");

  // Menu close browser
  const menuClose = document.getElementById("menu-close");
  if (menuClose)
    menuClose.innerHTML = `<span class="menu-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></span>${t("closeBrowser")}`;

  // Tab manager
  const tmSectionTitles = document.querySelectorAll(".tm-section-title");
  if (tmSectionTitles[0]) tmSectionTitles[0].textContent = t("tabs");

  const tmClosedToggle = document.getElementById("tm-closed-toggle");
  if (tmClosedToggle) {
    const span = tmClosedToggle.querySelector("span");
    if (span) span.textContent = t("recentlyClosed");
  }

  const tmSearchInput = document.getElementById("tm-search-input");
  if (tmSearchInput) tmSearchInput.placeholder = t("searchTabs");

  // Find bar buttons
  const findPrev = document.getElementById("find-prev");
  if (findPrev) findPrev.title = t("previous");

  const findNext = document.getElementById("find-next");
  if (findNext) findNext.title = t("next");

  const findClose = document.getElementById("find-close");
  if (findClose) findClose.title = t("closeFindBar");
}

// DOM Elements
const tabsContainer = document.getElementById("tabs-container");
const viewsContainer = document.getElementById("view-container");
const btnNewTab = document.getElementById("new-tab");
const btnBack = document.getElementById("btn-back");
const btnForward = document.getElementById("btn-forward");
const btnRefresh = document.getElementById("btn-refresh");
const btnHome = document.getElementById("btn-home");
const btnMenu = document.getElementById("btn-menu");
const btnBookmark = document.getElementById("btn-bookmark");
const btnDownloads = document.getElementById("btn-downloads");
const btnAi = document.getElementById("btn-ai");
const aiPanel = document.getElementById("ai-panel");
const aiClose = document.getElementById("ai-close");
const aiModelSelect = document.getElementById("ai-model-select");
const aiWebview = document.getElementById("ai-webview");
const browserMenu = document.getElementById("browser-menu");
const menuNewTab = document.getElementById("menu-new-tab");
const menuIncognito = document.getElementById("menu-incognito");
const menuHistory = document.getElementById("menu-history");
const menuDownloads = document.getElementById("menu-downloads");
const menuBookmarksToggle = document.getElementById("menu-bookmarks-toggle");
const menuBookmarkPage = document.getElementById("menu-bookmark-page");
const menuFind = document.getElementById("menu-find");
const menuFullscreen = document.getElementById("menu-fullscreen");
const menuSettings = document.getElementById("menu-settings");
const menuClose = document.getElementById("menu-close");
const menuZoomIn = document.getElementById("menu-zoom-in");
const menuZoomOut = document.getElementById("menu-zoom-out");
const menuZoomLevel = document.getElementById("menu-zoom-level");
const urlInput = document.getElementById("url-input");
const sslIcon = document.getElementById("ssl-icon");
const bookmarksBar = document.getElementById("bookmarks-bar");
const loadingBar = document.getElementById("loading-bar");
const zoomIndicator = document.getElementById("zoom-indicator");
const findBar = document.getElementById("find-bar");
const findInput = document.getElementById("find-input");
const findCount = document.getElementById("find-count");
const findPrev = document.getElementById("find-prev");
const findNext = document.getElementById("find-next");
const findClose = document.getElementById("find-close");
const tabContextMenu = document.getElementById("tab-context-menu");
const pageContextMenu = document.getElementById("page-context-menu");
const contextMenuOverlay = document.getElementById("context-menu-overlay");
const downloadsPanel = document.getElementById("downloads-panel");
const downloadsList = document.getElementById("downloads-list");
const downloadsClose = document.getElementById("downloads-close");
const menuSavePage = document.getElementById("menu-save-page");

// Incognito mode detection
const urlParams = new URLSearchParams(window.location.search);
const isIncognito = urlParams.get("incognito") === "true";

if (isIncognito) {
  document.body.classList.add("incognito");
}

// Default Settings
const DEFAULT_SETTINGS = {
  homepage: "about:blank",
  searchEngine: "google",
  newTabUrl: "browser://newtab",
  showBookmarksBar: true,
  openHomeOnStart: false,
  speedDialRow1: 8,
  speedDialRow2: 8,
  bookmarks: [],
};

// State
let settings = loadSettings();
let tabs = [];
let tabRegistry = new Map();
let activeTabId = null;
let tabCount = 0;
let closedTabsHistory = [];
let lastWebviewTabId = null;
let settingsSaveTimer = null;
let currentZoom = 1;
let zoomTimeout = null;
let findBarActive = false;
let findCurrentIndex = 0;
let findTotalMatches = 0;
let contextMenuTabId = null;
let pageContextTarget = null;
let draggedTab = null;
let history = loadHistory();
let downloads = [];

// Utility Functions
function cloneSettings(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadSettings() {
  try {
    const raw = localStorage.getItem("browser-settings");
    if (!raw) return cloneSettings(DEFAULT_SETTINGS);
    const parsed = JSON.parse(raw);
    return { ...cloneSettings(DEFAULT_SETTINGS), ...parsed };
  } catch (_e) {
    return cloneSettings(DEFAULT_SETTINGS);
  }
}

function saveSettings() {
  localStorage.setItem("browser-settings", JSON.stringify(settings));
}

function loadHistory() {
  try {
    const raw = localStorage.getItem("browser-history");
    return raw ? JSON.parse(raw) : [];
  } catch (_e) {
    return [];
  }
}

function saveHistory() {
  localStorage.setItem(
    "browser-history",
    JSON.stringify(history.slice(0, 1000)),
  );
}

function addToHistory(title, url) {
  if (isIncognito || !url || url.startsWith("browser://")) return;
  history.unshift({
    title: title || url,
    url,
    timestamp: Date.now(),
  });
  saveHistory();
}

function normalizeUrl(value, fallback = DEFAULT_SETTINGS.homepage) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return fallback;
  if (trimmed.startsWith("browser://")) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function buildSearchUrl(query) {
  const encoded = encodeURIComponent(query);
  if (settings.searchEngine === "duckduckgo")
    return `https://duckduckgo.com/?q=${encoded}`;
  if (settings.searchEngine === "bing")
    return `https://www.bing.com/search?q=${encoded}`;
  return `https://www.google.com/search?q=${encoded}`;
}

function resolveInputToUrl(value) {
  const input = String(value || "").trim();
  if (!input) return "";
  if (input.startsWith("browser://")) return input;
  if (!input.startsWith("http://") && !input.startsWith("https://")) {
    if (input.includes(".") && !input.includes(" ")) {
      return `https://${input}`;
    }
    return buildSearchUrl(input);
  }
  return input;
}

function getFaviconUrl(url) {
  if (!url || url.startsWith("browser://")) return "Assets/Logo.png";
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
  } catch {
    return "Assets/Logo.png";
  }
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return t("greeting.morning");
  if (hour >= 12 && hour < 17) return t("greeting.afternoon");
  if (hour >= 17 && hour < 22) return t("greeting.evening");
  return t("greeting.night");
}

function formatTime(date) {
  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(date) {
  return date.toLocaleDateString("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function formatHistoryTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatHistoryDate(timestamp) {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return t("today");
  if (date.toDateString() === yesterday.toDateString()) return t("yesterday");
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Tab Management
function createTabRecord(type, title, address) {
  tabCount += 1;
  const id = `tab-${tabCount}`;

  const tabElement = document.createElement("div");
  tabElement.className = "tab";
  tabElement.id = `ui-${id}`;
  tabElement.draggable = true;

  const iconWrap = document.createElement("div");
  iconWrap.className = "tab-icon-wrap";

  const iconElement = document.createElement("img");
  iconElement.className = "tab-icon";
  iconElement.src = getFaviconUrl(address);
  iconElement.alt = "";
  iconElement.onerror = () => {
    iconElement.src = "Assets/Logo.png";
  };

  const spinner = document.createElement("div");
  spinner.className = "tab-spinner";

  iconWrap.appendChild(iconElement);
  iconWrap.appendChild(spinner);

  const titleElement = document.createElement("span");
  titleElement.className = "tab-title";
  titleElement.textContent = title;

  const audioIndicator = document.createElement("div");
  audioIndicator.className = "tab-audio";
  audioIndicator.innerHTML =
    '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';
  audioIndicator.title = t("clickToMute");

  const closeButton = document.createElement("span");
  closeButton.className = "tab-close";
  closeButton.innerHTML =
    '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
  closeButton.onclick = (e) => {
    e.stopPropagation();
    closeTab(id);
  };

  tabElement.appendChild(iconWrap);
  tabElement.appendChild(titleElement);
  tabElement.appendChild(audioIndicator);
  tabElement.appendChild(closeButton);

  tabElement.onclick = () => switchTab(id);
  tabElement.addEventListener("auxclick", (e) => {
    if (e.button === 1) {
      e.preventDefault();
      closeTab(id);
    }
  });
  tabElement.addEventListener("contextmenu", (e) => showTabContextMenu(e, id));

  // Drag and drop
  tabElement.addEventListener("dragstart", (e) => {
    draggedTab = id;
    tabElement.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
  });
  tabElement.addEventListener("dragend", () => {
    tabElement.classList.remove("dragging");
    draggedTab = null;
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.remove("drag-over"));
  });
  tabElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (draggedTab && draggedTab !== id) {
      tabElement.classList.add("drag-over");
    }
  });
  tabElement.addEventListener("dragleave", () => {
    tabElement.classList.remove("drag-over");
  });
  tabElement.addEventListener("drop", (e) => {
    e.preventDefault();
    tabElement.classList.remove("drag-over");
    if (draggedTab && draggedTab !== id) {
      reorderTabs(draggedTab, id);
    }
  });

  tabsContainer.appendChild(tabElement);

  const viewElement =
    type === "webview"
      ? document.createElement("webview")
      : document.createElement("div");
  viewElement.id = `view-${id}`;
  viewElement.className = type === "webview" ? "" : "internal-view";

  if (type === "webview") {
    if (isIncognito) viewElement.partition = "incognito";
    viewElement.setAttribute("allowpopups", "true");
  }

  viewsContainer.appendChild(viewElement);

  const record = {
    id,
    type,
    title,
    address,
    favicon: getFaviconUrl(address),
    tabElement,
    titleElement,
    iconElement,
    viewElement,
    pinned: false,
    muted: false,
    zoom: 1,
  };

  tabs.push(id);
  tabRegistry.set(id, record);
  return record;
}

function reorderTabs(fromId, toId) {
  const fromIndex = tabs.indexOf(fromId);
  const toIndex = tabs.indexOf(toId);
  if (fromIndex === -1 || toIndex === -1) return;

  tabs.splice(fromIndex, 1);
  tabs.splice(toIndex, 0, fromId);

  const fromRecord = tabRegistry.get(fromId);
  const toRecord = tabRegistry.get(toId);
  if (fromRecord && toRecord) {
    tabsContainer.insertBefore(fromRecord.tabElement, toRecord.tabElement);
  }
}

function updateTabPresentation(id, data = {}) {
  const record = tabRegistry.get(id);
  if (!record) return;

  if (data.title !== undefined) {
    record.title = data.title;
    record.titleElement.textContent = data.title;
  }
  if (data.address !== undefined) record.address = data.address;
  if (data.favicon !== undefined) record.favicon = data.favicon;

  record.iconElement.src = record.favicon || getFaviconUrl(record.address);
}

function setTabLoading(id, loading) {
  const record = tabRegistry.get(id);
  if (!record) return;

  if (loading) {
    record.tabElement.classList.add("loading");
  } else {
    record.tabElement.classList.remove("loading");
  }
}

function setTabAudio(id, playing) {
  const record = tabRegistry.get(id);
  if (!record) return;

  if (playing) {
    record.tabElement.classList.add("playing-audio");
  } else {
    record.tabElement.classList.remove("playing-audio");
  }
}

function toggleTabPin(id) {
  const record = tabRegistry.get(id);
  if (!record) return;

  record.pinned = !record.pinned;
  record.tabElement.classList.toggle("pinned", record.pinned);

  // Move pinned tabs to the beginning
  if (record.pinned) {
    const firstUnpinned = tabs.find((t) => !tabRegistry.get(t)?.pinned);
    if (firstUnpinned) {
      const idx = tabs.indexOf(id);
      tabs.splice(idx, 1);
      const newIdx = tabs.indexOf(firstUnpinned);
      tabs.splice(newIdx, 0, id);
      tabsContainer.insertBefore(
        record.tabElement,
        tabRegistry.get(firstUnpinned)?.tabElement,
      );
    }
  }
}

function toggleTabMute(id) {
  const record = tabRegistry.get(id);
  if (!record || record.type !== "webview") return;

  record.muted = !record.muted;
  try {
    record.viewElement.setAudioMuted(record.muted);
  } catch (e) {
    console.log("Could not mute tab:", e);
  }
}

function switchTab(id) {
  if (!tabs.includes(id)) return;

  if (activeTabId) {
    const previous = tabRegistry.get(activeTabId);
    if (previous) {
      previous.tabElement.classList.remove("active");
      previous.viewElement.classList.remove("active");
      previous.viewElement.style.display = "none";
    }
  }

  activeTabId = id;
  const current = tabRegistry.get(id);
  if (!current) return;

  current.tabElement.classList.add("active");
  current.viewElement.classList.add("active");
  current.viewElement.style.display = "flex";

  if (current.type === "webview") {
    try {
      urlInput.value = current.viewElement.getURL() || current.address;
      updateSSLIcon(current.viewElement.getURL());
    } catch {
      urlInput.value = current.address;
    }
    lastWebviewTabId = current.id;
    currentZoom = current.zoom || 1;
    updateZoomDisplay();
  } else {
    urlInput.value = current.address;
    updateSSLIcon(current.address);
  }

  updateNavButtons();
  closeFindBar();
}

function closeTab(id) {
  const record = tabRegistry.get(id);
  if (!record) return;
  if (record.pinned) return; // Can't close pinned tabs with X button

  const index = tabs.indexOf(id);
  if (index === -1) return;

  if (record.type === "webview") {
    try {
      const closedUrl = record.viewElement.getURL() || record.address;
      if (closedUrl && !closedUrl.startsWith("browser://")) {
        closedTabsHistory.push({
          url: closedUrl,
          title: record.title || closedUrl,
          favicon: record.favicon || getFaviconUrl(closedUrl),
        });
        if (closedTabsHistory.length > 30) closedTabsHistory.shift();
      }
    } catch (e) {
      // Ignore errors
    }
  }

  record.tabElement.remove();
  record.viewElement.remove();
  tabRegistry.delete(id);
  tabs.splice(index, 1);

  if (lastWebviewTabId === id) lastWebviewTabId = null;

  if (tabs.length === 0) {
    createNewTabPage();
    return;
  }

  if (activeTabId === id) {
    const nextIndex = Math.min(index, tabs.length - 1);
    switchTab(tabs[nextIndex]);
  }
}

function closeOtherTabs(keepId) {
  const toClose = tabs.filter(
    (id) => id !== keepId && !tabRegistry.get(id)?.pinned,
  );
  toClose.forEach((id) => closeTab(id));
}

function closeTabsToRight(fromId) {
  const index = tabs.indexOf(fromId);
  if (index === -1) return;
  const toClose = tabs
    .slice(index + 1)
    .filter((id) => !tabRegistry.get(id)?.pinned);
  toClose.forEach((id) => closeTab(id));
}

function duplicateTab(id) {
  const record = tabRegistry.get(id);
  if (!record) return;

  if (record.type === "webview") {
    try {
      createWebviewTab(record.viewElement.getURL() || record.address);
    } catch {
      createWebviewTab(record.address);
    }
  }
}

function reopenClosedTab() {
  const item = closedTabsHistory.pop();
  if (item) createWebviewTab(item.url);
}

// Navigation
function openUrlInCurrentContext(url) {
  const target = url;

  if (target.startsWith("browser://")) {
    if (target === "browser://settings") {
      openSettingsTab();
      return;
    }
    if (target === "browser://history") {
      openHistoryTab();
      return;
    }
    if (target === "browser://newtab") {
      createNewTabPage();
      return;
    }
    return;
  }

  const active = getActiveTab();
  if (!active || active.type !== "webview") {
    const closedNewTabId =
      active && active.type === "newtab" ? active.id : null;
    const newTabId = createWebviewTab(target); // Создаем новую вкладку
    // ХАК: Запоминаем, что мы пришли со стартовой страницы!
    if (closedNewTabId) {
      tabRegistry.get(newTabId).fallbackBackUrl = "browser://newtab";
      closeTab(closedNewTabId);
      updateNavButtons(); // <--- Обновляем кнопки навигации
    }
    return;
  }

  active.viewElement.loadURL(target);
}

function updateNavButtons() {
  const record = getActiveTab();
  const webview = getActiveWebview();
  if (!webview) {
    btnBack.disabled = true;
    btnForward.disabled = true;
    return;
  }

  try {
    // Кнопка активна, если есть история браузера ИЛИ если мы пришли со стартовой страницы
    btnBack.disabled = !webview.canGoBack() && !record.fallbackBackUrl;
    btnForward.disabled = !webview.canGoForward();
  } catch (_e) {
    btnBack.disabled = true;
    btnForward.disabled = true;
  }
}
function updateSSLIcon(url) {
  if (!url || url.startsWith("browser://")) {
    sslIcon.className = "internal";
    sslIcon.title = t("browserPage");
    sslIcon.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    return;
  }

  try {
    const urlObj = new URL(url);
    if (urlObj.protocol === "https:") {
      sslIcon.className = "secure";
      sslIcon.title = t("secureConnection");
      sslIcon.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';
    } else {
      sslIcon.className = "insecure";
      sslIcon.title = t("insecureConnection");
      sslIcon.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>';
    }
  } catch {
    sslIcon.className = "internal";
  }
}

// Webview Tab
function attachWebviewEvents(record) {
  const webview = record.viewElement;

  webview.addEventListener("did-start-loading", () => {
    setTabLoading(record.id, true);
    if (activeTabId === record.id) {
      loadingBar.classList.remove("hidden", "complete");
      loadingBar.style.width = "30%";
    }
  });

  webview.addEventListener("did-stop-loading", () => {
    setTabLoading(record.id, false);
    if (activeTabId === record.id) {
      loadingBar.style.width = "100%";
      loadingBar.classList.add("complete");
      setTimeout(() => loadingBar.classList.add("hidden"), 300);
    }
    syncWebviewState(record);
  });

  webview.addEventListener("page-title-updated", (e) => {
    const title = e.title || webview.getTitle() || record.address;
    updateTabPresentation(record.id, { title });
    try {
      addToHistory(title, webview.getURL());
    } catch {}
  });

  webview.addEventListener("page-favicon-updated", (e) => {
    try {
      const iconUrl = e.favicons?.[0] || getFaviconUrl(webview.getURL());
      updateTabPresentation(record.id, { favicon: iconUrl });
    } catch {}
  });

  webview.addEventListener("did-navigate", () => syncWebviewState(record));
  webview.addEventListener("did-navigate-in-page", () =>
    syncWebviewState(record),
  );

  webview.addEventListener("did-fail-load", (e) => {
    if (e.errorCode === -3) return; // Игнорируем Aborted (бывает при блокировке рекламы или отмене загрузки)

    setTabLoading(record.id, false);
    loadingBar.classList.add("hidden");

    // Если ошибка произошла в основной вкладке, а не в каком-то левом рекламном iframe внутри сайта
    if (e.isMainFrame) {
      // Генерируем HTML и конвертируем его в data-URL, чтобы загрузить без локальных файлов
      const errorHTML = generateErrorPage(
        e.errorCode,
        e.errorDescription,
        e.validatedURL,
      );
      const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(errorHTML)}`;

      webview.loadURL(dataUrl);
    }
  });

  webview.addEventListener("context-menu", (e) => {
    showPageContextMenu(e.params, record.id);
  });

  webview.addEventListener("media-started-playing", () =>
    setTabAudio(record.id, true),
  );
  webview.addEventListener("media-paused", () => setTabAudio(record.id, false));

  webview.addEventListener("found-in-page", (e) => {
    if (e.result) {
      findCurrentIndex = e.result.activeMatchOrdinal;
      findTotalMatches = e.result.matches;
      findCount.textContent = `${findCurrentIndex} / ${findTotalMatches}`;
    }
  });
}

function syncWebviewState(record) {
  const webview = record.viewElement;
  try {
    const currentUrl = webview.getURL() || record.address;

    updateTabPresentation(record.id, {
      title: webview.getTitle() || currentUrl,
      address: currentUrl,
    });

    if (activeTabId === record.id) {
      urlInput.value = currentUrl;
      updateSSLIcon(currentUrl);
      updateNavButtons();
    }
  } catch (e) {
    // Ignore errors
  }
}

function createWebviewTab(url = settings.newTabUrl) {
  if (url === "browser://newtab") {
    createNewTabPage();
    return;
  }

  const targetUrl = normalizeUrl(url, settings.homepage);
  const record = createTabRecord("webview", t("loading"), targetUrl);
  record.viewElement.src = targetUrl;
  attachWebviewEvents(record);
  switchTab(record.id);
  return record.id;
}

// Internal Pages
function createNewTabPage() {
  const record = createTabRecord(
    "newtab",
    t("newTabTitle"),
    "browser://newtab",
  );
  renderNewTabPage(record);
  switchTab(record.id);
  return record.id;
}

function renderNewTabPage(record) {
  const view = record.viewElement;
  view.className = "internal-view newtab-page";

  const now = new Date();

  view.innerHTML = `
  <div class="newtab-header">
    <div class="newtab-greeting">${getGreeting()}</div>
    <div class="newtab-clock" id="newtab-clock-${record.id}">${formatTime(now)}</div>
    <div class="newtab-date">${formatDate(now)}</div>
  </div>
  <div class="newtab-search">
    <div class="newtab-search-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    </div>
    <input type="text" id="newtab-search-${record.id}" placeholder="${t("searchWebOrUrl")}" autocomplete="off" />
  </div>
  <div class="newtab-shortcuts" id="newtab-shortcuts-${record.id}"></div>
`;

  // Update clock
  const clockEl = view.querySelector(`#newtab-clock-${record.id}`);
  const clockInterval = setInterval(() => {
    if (!document.contains(clockEl)) {
      clearInterval(clockInterval);
      return;
    }
    clockEl.textContent = formatTime(new Date());
  }, 1000);

  // Search input
  const searchInput = view.querySelector(`#newtab-search-${record.id}`);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && searchInput.value.trim()) {
      openUrlInCurrentContext(resolveInputToUrl(searchInput.value));
    }
  });

  // Focus search input on tab activation
  setTimeout(() => searchInput.focus(), 100);

  // Render shortcuts (Speed Dial)
  const shortcutsContainer = view.querySelector(
    `#newtab-shortcuts-${record.id}`,
  );
  shortcutsContainer.innerHTML = "";

  // Парсим настройки (по умолчанию 8)
  const r1Max = parseInt(settings.speedDialRow1) || 8;
  const r2Max = parseInt(settings.speedDialRow2) || 8;

  const row1 = document.createElement("div");
  row1.className = "newtab-row";
  const row2 = document.createElement("div");
  row2.className = "newtab-row";
  shortcutsContainer.appendChild(row1);
  shortcutsContainer.appendChild(row2);

  let bmIndex = 0; // Глобальный индекс для твоих закладок

  // Умная отрисовка: если закладки кончились, рисуем слоты "Добавить"
  const drawSlots = (row, maxSlots) => {
    for (let i = 0; i < maxSlots; i++) {
      if (bmIndex < settings.bookmarks.length) {
        const bookmark = settings.bookmarks[bmIndex];
        const currentIndex = bmIndex;
        const el = document.createElement("button");
        el.className = "newtab-shortcut";
        el.title = t("rightClickToDelete");
        el.innerHTML = `
        <div class="newtab-shortcut-icon"><img src="${getFaviconUrl(bookmark.url)}" alt="" onerror="this.src='Assets/Logo.png'"></div>
        <div class="newtab-shortcut-label">${bookmark.title}</div>
      `;
        el.onclick = () => openUrlInCurrentContext(normalizeUrl(bookmark.url));
        el.oncontextmenu = (e) => {
          e.preventDefault();
          if (confirm(`${t("deleteShortcut")} "${bookmark.title}"?`)) {
            settings.bookmarks.splice(currentIndex, 1);
            saveSettings();
            renderNewTabPage(record);
          }
        };
        row.appendChild(el);
        bmIndex++;
      } else {
        // Отрисовка пустого слота-кнопки
        const addBtn = document.createElement("button");
        addBtn.className = "newtab-shortcut newtab-add-shortcut";
        addBtn.innerHTML = `
        <div class="newtab-shortcut-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></div>
        <div class="newtab-shortcut-label">${t("addShortcut")}</div>
      `;
        addBtn.onclick = () => {
          // Создаем красивое окошко поверх страницы (т.к. prompt в Electron не работает)
          const overlay = document.createElement("div");
          overlay.style.cssText =
            "position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);z-index:99999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);";
          overlay.innerHTML = `
          <div style="background:var(--bg-elevated);padding:24px;border-radius:var(--radius-md);width:320px;border:1px solid var(--border-strong);box-shadow:var(--shadow-lg);">
            <h3 style="margin:0 0 16px;font-size:16px;color:#fff;font-weight:500;">${t("addBookmarkTitle")}</h3>
            <input id="prompt-url" type="text" placeholder="${t("urlPlaceholder")}" style="width:100%;padding:10px;margin-bottom:12px;background:var(--bg-primary);border:1px solid var(--border);color:#fff;border-radius:var(--radius-sm);outline:none;font-family:inherit;">
            <input id="prompt-title" type="text" placeholder="${t("namePlaceholder")}" style="width:100%;padding:10px;margin-bottom:20px;background:var(--bg-primary);border:1px solid var(--border);color:#fff;border-radius:var(--radius-sm);outline:none;font-family:inherit;">
            <div style="display:flex;gap:10px;justify-content:flex-end;">
              <button id="prompt-cancel" style="padding:8px 16px;background:transparent;border:none;color:var(--text-secondary);cursor:pointer;font-family:inherit;">${t("cancel")}</button>
              <button id="prompt-save" style="padding:8px 16px;background:var(--accent);color:#fff;border:none;border-radius:var(--radius-sm);cursor:pointer;font-family:inherit;">${t("save")}</button>
            </div>
          </div>
        `;
          document.body.appendChild(overlay);

          const iUrl = overlay.querySelector("#prompt-url");
          const iTitle = overlay.querySelector("#prompt-title");
          iUrl.focus();

          const close = () => overlay.remove();
          overlay.querySelector("#prompt-cancel").onclick = close;
          overlay.querySelector("#prompt-save").onclick = () => {
            const urlVal = iUrl.value.trim();
            const titleVal = iTitle.value.trim() || urlVal.split(".")[0];
            if (!urlVal) return;

            settings.bookmarks.push({
              title: titleVal,
              url: normalizeUrl(urlVal),
            });
            saveSettings();
            renderNewTabPage(record); // Мгновенный перерендер
            close();
          };
        };
        row.appendChild(addBtn);
      }
    }
  };

  // Рисуем ряды по твоим правилам!
  drawSlots(row1, r1Max);
  drawSlots(row2, r2Max);
}

function openHistoryTab() {
  const existing = Array.from(tabRegistry.values()).find(
    (t) => t.type === "history",
  );
  if (existing) {
    renderHistoryPage(existing);
    switchTab(existing.id);
    return;
  }

  const record = createTabRecord(
    "history",
    t("historyTitle"),
    "browser://history",
  );
  renderHistoryPage(record);
  switchTab(record.id);
}

function renderHistoryPage(record) {
  const view = record.viewElement;
  view.className = "internal-view history-page";

  view.innerHTML = `
  <div class="history-header">
    <h1>${t("historyTitle")}</h1>
    <input type="text" class="history-search" id="history-search-${record.id}" placeholder="${t("searchInHistory")}" />
    <button class="history-clear-btn" id="history-clear-${record.id}">${t("clearHistoryBtn")}</button>
  </div>
  <div class="history-content" id="history-content-${record.id}"></div>
`;

  const searchInput = view.querySelector(`#history-search-${record.id}`);
  const contentEl = view.querySelector(`#history-content-${record.id}`);
  const clearBtn = view.querySelector(`#history-clear-${record.id}`);

  const renderHistoryItems = (filter = "") => {
    const filtered = history.filter(
      (item) =>
        !filter ||
        item.title.toLowerCase().includes(filter.toLowerCase()) ||
        item.url.toLowerCase().includes(filter.toLowerCase()),
    );

    if (filtered.length === 0) {
      contentEl.innerHTML = `
      <div class="history-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <div>${filter ? t("nothingFound") : t("historyEmpty")}</div>
      </div>
    `;
      return;
    }

    // Group by date
    const grouped = {};
    filtered.forEach((item) => {
      const dateKey = formatHistoryDate(item.timestamp);
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(item);
    });

    contentEl.innerHTML = "";
    Object.entries(grouped).forEach(([date, items]) => {
      const dayHeader = document.createElement("div");
      dayHeader.className = "history-day-header";
      dayHeader.textContent = date;
      contentEl.appendChild(dayHeader);

      items.forEach((item, idx) => {
        const itemEl = document.createElement("div");
        itemEl.className = "history-item";
        itemEl.innerHTML = `
        <img class="history-item-icon" src="${getFaviconUrl(item.url)}" alt="" onerror="this.src='Assets/Logo.png'">
        <span class="history-item-title">${item.title}</span>
        <span class="history-item-url">${item.url}</span>
        <span class="history-item-time">${formatHistoryTime(item.timestamp)}</span>
        <button class="history-item-delete" data-idx="${history.indexOf(item)}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      `;
        itemEl.onclick = (e) => {
          if (!e.target.closest(".history-item-delete")) {
            createWebviewTab(item.url);
          }
        };
        itemEl.querySelector(".history-item-delete").onclick = (e) => {
          e.stopPropagation();
          const idx = parseInt(e.currentTarget.dataset.idx);
          history.splice(idx, 1);
          saveHistory();
          renderHistoryItems(searchInput.value);
        };
        contentEl.appendChild(itemEl);
      });
    });
  };

  searchInput.oninput = () => renderHistoryItems(searchInput.value);
  clearBtn.onclick = () => {
    if (confirm(t("clearHistoryConfirm"))) {
      history = [];
      saveHistory();
      renderHistoryItems();
    }
  };

  renderHistoryItems();
}

function openSettingsTab() {
  const existing = Array.from(tabRegistry.values()).find(
    (t) => t.type === "settings",
  );
  if (existing) {
    renderSettingsTab(existing);
    switchTab(existing.id);
    return;
  }

  const record = createTabRecord(
    "settings",
    t("settingsPageTitle"),
    "browser://settings",
  );
  renderSettingsTab(record);
  switchTab(record.id);
}

function renderSettingsTab(record) {
  const draft = cloneSettings(settings);
  const view = record.viewElement;
  view.className = "internal-view settings-page";

  view.innerHTML = `
  <div class="settings-header">
    <div class="settings-title">
      <img src="Assets/Logo.png" alt="Browser">
      <div class="settings-title-text">
        <strong>${t("settingsTitle")}</strong>
        <span>${t("changesAutoSave")}</span>
      </div>
    </div>
    <div class="settings-status" id="settings-status" style="opacity: 0">${t("settingsSaved")}</div>
  </div>
  <div class="settings-content">
    <section class="settings-card">
      <div class="settings-section-head">
        <h2>${t("generalSettings")}</h2>
        <div class="settings-microcopy">${t("generalSettingsDesc")}</div>
      </div>
      <div class="settings-grid">
        <div class="settings-row">
          <div class="settings-field">
            <label>${t("homepage")}</label>
            <input class="settings-input" id="settings-homepage" type="text" placeholder="about:blank">
          </div>
          <div class="settings-field">
            <label>${t("searchEngine")}</label>
            <select class="settings-select" id="settings-search-engine">
              <option value="google">Google</option>
              <option value="duckduckgo">DuckDuckGo</option>
              <option value="bing">Bing</option>
            </select>
          </div>
        </div>
        <div class="settings-row" style="margin-top: 16px;">
          <div class="settings-field">
            <label>${t("slotsRow1")}</label>
            <input class="settings-input" id="settings-r1" type="number" min="1" max="12">
          </div>
          <div class="settings-field">
            <label>${t("slotsRow2")}</label>
            <input class="settings-input" id="settings-r2" type="number" min="0" max="12">
          </div>
        </div>
      </div>
    </section>

    <section class="settings-card">
      <div class="settings-section-head">
        <h2>${t("language")}</h2>
        <div class="settings-microcopy">${t("languageDesc")}</div>
      </div>
      <div class="settings-row">
        <div class="settings-field">
          <label>${t("language")}</label>
          <select class="settings-select" id="settings-language">
            <option value="en">English</option>
            <option value="uk">Українська</option>
            <option value="cs">Čeština</option>
          </select>
        </div>
      </div>
    </section>

    <section class="settings-card">
      <div class="settings-section-head">
        <h2>${t("interface")}</h2>
        <div class="settings-microcopy">${t("interfaceDesc")}</div>
      </div>
      <div class="toggle-row">
        <span>${t("showBookmarksBar")}</span>
        <input class="toggle" id="settings-show-bookmarks" type="checkbox">
      </div>
      <div class="toggle-row">
        <span>${t("openHomeOnStart")}</span>
        <input class="toggle" id="settings-open-home" type="checkbox">
      </div>
    </section>

    <section class="settings-card">
      <div class="settings-section-head">
        <h2>${t("bookmarks")}</h2>
        <div class="settings-microcopy">${t("bookmarksDesc")}</div>
      </div>
      <div id="settings-bookmarks-list"></div>
      <div class="settings-btn-row">
        <button class="settings-btn primary" id="settings-add-bookmark">${t("addBookmarkBtn")}</button>
        <button class="settings-btn" id="settings-add-current">${t("addCurrentPage")}</button>
      </div>
    </section>

    <section class="settings-card">
      <div class="settings-section-head">
        <h2>${t("passwordManager")}</h2>
        <div class="settings-microcopy">${t("passwordManagerDesc")}</div>
      </div>
      <div id="settings-passwords-list"></div>
      <div class="settings-btn-row" style="margin-top: 16px;">
        <button class="settings-btn primary" id="settings-import-pass">${t("importCSV")}</button>
      </div>
    </section>

    <section class="settings-card">
      <div class="settings-section-head">
        <h2>${t("dataManagement")}</h2>
        <div class="settings-microcopy">${t("dataManagementDesc")}</div>
      </div>
      <div class="settings-btn-row">
        <button class="settings-btn danger" id="settings-clear-history">${t("clearHistory")}</button>
        <button class="settings-btn danger" id="settings-reset">${t("resetSettings")}</button>
      </div>
    </section>
  </div>
`;

  const homepageInput = view.querySelector("#settings-homepage");
  const searchEngineSelect = view.querySelector("#settings-search-engine");
  const languageSelect = view.querySelector("#settings-language");
  const showBookmarksToggle = view.querySelector("#settings-show-bookmarks");
  const openHomeToggle = view.querySelector("#settings-open-home");
  const bookmarksList = view.querySelector("#settings-bookmarks-list");
  const addBookmarkBtn = view.querySelector("#settings-add-bookmark");
  const addCurrentBtn = view.querySelector("#settings-add-current");
  const clearHistoryBtn = view.querySelector("#settings-clear-history");
  const importPassBtn = view.querySelector("#settings-import-pass");
  const resetBtn = view.querySelector("#settings-reset");
  const statusEl = view.querySelector("#settings-status");

  // --- ЛОГИКА МЕНЕДЖЕРА ПАРОЛЕЙ ---
  const renderPasswords = async () => {
    const passList = view.querySelector("#settings-passwords-list");
    if (!passList) return;

    const vault = await ipcRenderer.invoke("get-vault");
    passList.innerHTML = "";

    if (vault.length === 0) {
      passList.innerHTML = `<div style="color:var(--text-muted); font-size:13px; padding:10px 0;">${t("passwordDbEmpty")}</div>`;
      return;
    }

    vault.forEach((item) => {
      const row = document.createElement("div");
      row.className = "settings-bookmark-item"; // Используем стили закладок
      row.innerHTML = `
      <img class="settings-bookmark-icon" src="${getFaviconUrl(item.url)}" alt="" onerror="this.src='Assets/Logo.png'">
      <div style="flex:1; display:flex; flex-direction:column; gap:4px; overflow:hidden;">
        <div style="font-size:13px; color:var(--text-primary); text-overflow:ellipsis; white-space:nowrap; overflow:hidden;">${item.url}</div>
        <div style="font-size:11px; color:var(--text-secondary);">${item.username || t("noLogin")}</div>
      </div>
      <input type="password" value="${item.password}" readonly title="${t("clickToShowHide")}" style="width:140px; background:transparent; border:none; color:var(--text-muted); font-family:monospace; font-size:12px; outline:none; cursor:pointer;" onclick="this.type=this.type==='password'?'text':'password'">
      <button class="settings-remove-btn">${t("remove")}</button>
    `;
      row.querySelector(".settings-remove-btn").onclick = async () => {
        if (confirm(`${t("deletePassword")} ${item.url}?`)) {
          await ipcRenderer.invoke("delete-vault-item", item.id);
          renderPasswords();
        }
      };
      passList.appendChild(row);
    });
  };

  renderPasswords(); // Запускаем отрисовку

  // Обработчик импорта
  if (importPassBtn) {
    importPassBtn.onclick = async () => {
      const count = await ipcRenderer.invoke("select-and-import-csv");
      if (count !== undefined) {
        alert(`✅ Успешно импортировано паролей: ${count}`);
        renderPasswords(); // Обновляем список после импорта
      }
    };
  }

  const r1Input = view.querySelector("#settings-r1");
  const r2Input = view.querySelector("#settings-r2");

  const showSaveStatus = () => {
    statusEl.style.opacity = "1";
    clearTimeout(settingsSaveTimer);
    settingsSaveTimer = setTimeout(() => {
      statusEl.style.opacity = "0";
    }, 2000);
  };

  const persist = () => {
    settings = cloneSettings(draft);
    saveSettings();
    applySettings();
    showSaveStatus();
  };

  const syncForm = () => {
    homepageInput.value = draft.homepage;
    searchEngineSelect.value = draft.searchEngine;
    languageSelect.value = currentLang;
    showBookmarksToggle.checked = draft.showBookmarksBar;
    openHomeToggle.checked = draft.openHomeOnStart;
    r1Input.value = draft.speedDialRow1 || 8;
    r2Input.value = draft.speedDialRow2 || 8;
  };

  r1Input.oninput = () => {
    draft.speedDialRow1 = parseInt(r1Input.value) || 8;
    persist();
  };
  r2Input.oninput = () => {
    draft.speedDialRow2 = parseInt(r2Input.value) || 0;
    persist();
  };

  const renderBookmarks = () => {
    bookmarksList.innerHTML = "";
    draft.bookmarks.forEach((bm, i) => {
      const item = document.createElement("div");
      item.className = "settings-bookmark-item";
      item.innerHTML = `
      <img class="settings-bookmark-icon" src="${getFaviconUrl(bm.url)}" alt="" onerror="this.src='Assets/Logo.png'">
      <input type="text" value="${bm.title}" placeholder="${t("name")}" data-field="title" data-idx="${i}">
      <div class="split"></div>
      <input type="text" value="${bm.url}" placeholder="https://example.com" data-field="url" data-idx="${i}">
      <button class="settings-remove-btn" data-idx="${i}">${t("remove")}</button>
    `;

      item.querySelectorAll("input").forEach((input) => {
        input.oninput = () => {
          const idx = parseInt(input.dataset.idx);
          draft.bookmarks[idx][input.dataset.field] = input.value;
          if (input.dataset.field === "url") {
            item.querySelector(".settings-bookmark-icon").src = getFaviconUrl(
              input.value,
            );
          }
          persist();
        };
      });

      item.querySelector(".settings-remove-btn").onclick = () => {
        draft.bookmarks.splice(i, 1);
        renderBookmarks();
        persist();
      };

      bookmarksList.appendChild(item);
    });
  };

  syncForm();
  renderBookmarks();

  homepageInput.oninput = () => {
    draft.homepage = homepageInput.value;
    persist();
  };
  searchEngineSelect.onchange = () => {
    draft.searchEngine = searchEngineSelect.value;
    persist();
  };
  languageSelect.onchange = () => {
    setLanguage(languageSelect.value);
  };
  showBookmarksToggle.onchange = () => {
    draft.showBookmarksBar = showBookmarksToggle.checked;
    persist();
  };
  openHomeToggle.onchange = () => {
    draft.openHomeOnStart = openHomeToggle.checked;
    persist();
  };

  addBookmarkBtn.onclick = () => {
    draft.bookmarks.push({
      title: t("newBookmark"),
      url: "https://example.com",
    });
    renderBookmarks();
    persist();
  };

  addCurrentBtn.onclick = () => {
    const webview = getActiveWebview() || getWebviewByTabId(lastWebviewTabId);
    if (webview) {
      try {
        draft.bookmarks.push({
          title: webview.getTitle() || t("page"),
          url: webview.getURL() || settings.homepage,
        });
        renderBookmarks();
        persist();
      } catch (e) {
        console.log("Could not get webview info:", e);
      }
    }
  };

  clearHistoryBtn.onclick = () => {
    if (confirm(t("clearHistoryConfirm"))) {
      history = [];
      saveHistory();
    }
  };

  resetBtn.onclick = () => {
    if (confirm(t("resetSettingsConfirm"))) {
      Object.assign(draft, cloneSettings(DEFAULT_SETTINGS));
      syncForm();
      renderBookmarks();
      persist();
    }
  };
}

// Bookmarks
function renderBookmarks() {
  bookmarksBar.innerHTML = "";
  settings.bookmarks.forEach((bm) => {
    const btn = document.createElement("button");
    btn.className = "bookmark";
    btn.title = bm.url;
    btn.innerHTML = `
    <img class="bookmark-icon" src="${getFaviconUrl(bm.url)}" alt="" onerror="this.src='Assets/Logo.png'">
    <span>${bm.title}</span>
  `;
    btn.onclick = () => openUrlInCurrentContext(normalizeUrl(bm.url));
    bookmarksBar.appendChild(btn);
  });
}

function applySettings() {
  if (settings.showBookmarksBar) {
    bookmarksBar.classList.remove("hidden");
  } else {
    bookmarksBar.classList.add("hidden");
  }
  renderBookmarks();
}

function bookmarkCurrentPage() {
  const webview = getActiveWebview() || getWebviewByTabId(lastWebviewTabId);
  if (!webview) return;

  try {
    settings.bookmarks.push({
      title: webview.getTitle() || webview.getURL() || "Закладка",
      url: webview.getURL() || settings.homepage,
    });
    saveSettings();
    applySettings();
  } catch (e) {
    console.log("Could not bookmark page:", e);
  }
}

// Find in Page
function openFindBar() {
  findBarActive = true;
  findBar.classList.add("visible");
  findInput.value = "";
  findInput.focus();
  findCount.textContent = "0 / 0";
}

function closeFindBar() {
  findBarActive = false;
  findBar.classList.remove("visible");
  const webview = getActiveWebview();
  if (webview) {
    try {
      webview.stopFindInPage("clearSelection");
    } catch {}
  }
}

function findInPage(forward = true) {
  const webview = getActiveWebview();
  const query = findInput.value.trim();
  if (!webview || !query) return;

  try {
    webview.findInPage(query, { forward, findNext: true });
  } catch (e) {
    console.log("Find error:", e);
  }
}

// Zoom
function setZoom(delta) {
  const webview = getActiveWebview();
  if (!webview) return;

  currentZoom = Math.max(0.25, Math.min(3, currentZoom + delta));
  try {
    webview.setZoomFactor(currentZoom);
  } catch (e) {
    console.log("Zoom error:", e);
  }

  const record = getActiveTab();
  if (record) record.zoom = currentZoom;

  updateZoomDisplay();
  showZoomIndicator();
}

function resetZoom() {
  const webview = getActiveWebview();
  if (!webview) return;

  currentZoom = 1;
  try {
    webview.setZoomFactor(1);
  } catch (e) {
    console.log("Zoom error:", e);
  }

  const record = getActiveTab();
  if (record) record.zoom = 1;

  updateZoomDisplay();
  showZoomIndicator();
}

function updateZoomDisplay() {
  const percent = Math.round(currentZoom * 100);
  if (menuZoomLevel) menuZoomLevel.textContent = `${percent}%`;
  zoomIndicator.textContent = `${percent}%`;
}

function showZoomIndicator() {
  zoomIndicator.classList.add("visible");
  clearTimeout(zoomTimeout);
  zoomTimeout = setTimeout(() => {
    zoomIndicator.classList.remove("visible");
  }, 1500);
}

// Context Menu
function showTabContextMenu(e, tabId) {
  e.preventDefault();
  hidePageContextMenu();
  contextMenuTabId = tabId;

  const record = tabRegistry.get(tabId);
  if (!record) return;

  const pinText = tabContextMenu.querySelector(".ctx-pin-text");
  const muteText = tabContextMenu.querySelector(".ctx-mute-text");

  if (pinText)
    pinText.textContent = record.pinned ? t("unpinTab") : t("pinTab");
  if (muteText)
    muteText.textContent = record.muted ? t("unmuteTab") : t("muteTab");

  contextMenuOverlay.style.display = "block";
  tabContextMenu.classList.add("visible");

  let left = e.clientX;
  let top = e.clientY;
  const rect = tabContextMenu.getBoundingClientRect();

  if (left + rect.width > window.innerWidth) {
    left = window.innerWidth - rect.width;
  }
  if (top + rect.height > window.innerHeight) {
    top = window.innerHeight - rect.height;
  }

  tabContextMenu.style.left = `${left}px`;
  tabContextMenu.style.top = `${top}px`;
}

function hideContextMenu() {
  tabContextMenu.classList.remove("visible");
  contextMenuTabId = null;
  if (!pageContextMenu.classList.contains("visible")) {
    contextMenuOverlay.style.display = "none";
  }
}

function hidePageContextMenu() {
  pageContextMenu.classList.remove("visible");
  pageContextTarget = null;
  if (!tabContextMenu.classList.contains("visible")) {
    contextMenuOverlay.style.display = "none";
  }
}

function showPageContextMenu(params, tabId) {
  hideContextMenu();
  const tabRecord = tabRegistry.get(tabId);
  const webviewRect = tabRecord?.viewElement?.getBoundingClientRect();

  // params.x and params.y are relative to the webview content. Check if we need offset.
  // Actually, webview context-menu params x/y are relative to the WINDOW. So we shouldn't add webviewRect.left/top
  const menuX = Math.round(params?.x || 0);
  const menuY = Math.round(params?.y || 0);

  pageContextTarget = {
    tabId,
    linkURL: params?.linkURL || "",
    srcURL: params?.srcURL || "",
    hasImage: params?.mediaType === "image",
    x: menuX,
    y: menuY,
  };

  const openLinkItem = document.getElementById("page-ctx-open-link");
  const copyLinkItem = document.getElementById("page-ctx-copy-link");
  const hasLink = Boolean(pageContextTarget.linkURL);

  const saveImageItem = document.getElementById("page-ctx-save-image");
  const copyImageItem = document.getElementById("page-ctx-copy-image");
  const hasImage = Boolean(pageContextTarget.hasImage);

  if (openLinkItem) openLinkItem.style.display = hasLink ? "flex" : "none";
  if (copyLinkItem) copyLinkItem.style.display = hasLink ? "flex" : "none";
  if (saveImageItem) saveImageItem.style.display = hasImage ? "flex" : "none";
  if (copyImageItem) copyImageItem.style.display = hasImage ? "flex" : "none";

  contextMenuOverlay.style.display = "block";
  pageContextMenu.classList.add("visible");

  const rect = pageContextMenu.getBoundingClientRect();
  let left = pageContextTarget.x;
  let top = pageContextTarget.y;

  if (left + rect.width > window.innerWidth) {
    left = window.innerWidth - rect.width;
  }
  if (top + rect.height > window.innerHeight) {
    top = window.innerHeight - rect.height;
  }

  pageContextMenu.style.left = `${left}px`;
  pageContextMenu.style.top = `${top}px`;
}

// Downloads Panel
function toggleDownloadsPanel() {
  downloadsPanel.classList.toggle("visible");
}

// Helpers
function getActiveTab() {
  return activeTabId ? tabRegistry.get(activeTabId) : null;
}

function getActiveWebview() {
  const record = getActiveTab();
  return record?.type === "webview" ? record.viewElement : null;
}

function getWebviewByTabId(id) {
  const record = tabRegistry.get(id);
  return record?.type === "webview" ? record.viewElement : null;
}

function focusAddressBar() {
  urlInput.focus();
  urlInput.select();
}

function switchTabByOffset(offset) {
  if (tabs.length <= 1) return;
  const idx = tabs.indexOf(activeTabId);
  const nextIdx = (idx + offset + tabs.length) % tabs.length;
  switchTab(tabs[nextIdx]);
}

function switchTabByIndex(index) {
  if (index === -1) {
    switchTab(tabs[tabs.length - 1]);
  } else if (tabs[index]) {
    switchTab(tabs[index]);
  }
}

function toggleFullscreen() {
  try {
    ipcRenderer.send("toggle-fullscreen");
  } catch (e) {
    // Fullscreen toggle not available
  }
}

async function saveCurrentPage() {
  const webview = getActiveWebview();
  if (!webview) return;

  try {
    webview.downloadURL(webview.getURL());
  } catch (e) {
    console.error("Ошибка сохранения страницы:", e);
  }
}

// Event Listeners
btnBack.onclick = () => {
  const record = getActiveTab();
  const wv = getActiveWebview();
  let wentBack = false;
  if (wv) {
    try {
      if (wv.canGoBack()) {
        wv.goBack();
        wentBack = true;
      }
    } catch {}
  }
  // Если история в самом Chromium пуста, но есть наша метка — возвращаемся на стартовую
  if (!wentBack && record && record.fallbackBackUrl) {
    openUrlInCurrentContext(record.fallbackBackUrl);
  }
};
btnForward.onclick = () => {
  const wv = getActiveWebview();
  if (wv)
    try {
      wv.goForward();
    } catch {}
};
btnRefresh.onclick = () => {
  const wv = getActiveWebview();
  if (wv)
    try {
      wv.reload();
    } catch {}
};
btnHome.onclick = () => openUrlInCurrentContext(settings.homepage);
btnNewTab.onclick = () => createNewTabPage();
if (btnBookmark) btnBookmark.onclick = bookmarkCurrentPage;
if (btnDownloads) btnDownloads.onclick = toggleDownloadsPanel;
if (downloadsClose)
  downloadsClose.onclick = () => downloadsPanel.classList.remove("visible");

btnMenu.onclick = (e) => {
  e.stopPropagation();
  browserMenu.classList.toggle("visible");
};

document.addEventListener("click", (e) => {
  if (!browserMenu.contains(e.target) && e.target !== btnMenu) {
    browserMenu.classList.remove("visible");
  }
  if (!e.target.closest(".context-menu")) {
    hideContextMenu();
    hidePageContextMenu();
  }
});

contextMenuOverlay.addEventListener("click", (e) => {
  hideContextMenu();
  hidePageContextMenu();
});

contextMenuOverlay.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  hideContextMenu();
  hidePageContextMenu();
});

// Menu items
if (menuNewTab)
  menuNewTab.onclick = () => {
    browserMenu.classList.remove("visible");
    createNewTabPage();
  };
if (menuIncognito)
  menuIncognito.onclick = () => {
    browserMenu.classList.remove("visible");
    ipcRenderer.send("create-incognito-window");
  };
if (menuHistory)
  menuHistory.onclick = () => {
    browserMenu.classList.remove("visible");
    openHistoryTab();
  };
if (menuDownloads)
  menuDownloads.onclick = () => {
    browserMenu.classList.remove("visible");
    toggleDownloadsPanel();
  };
if (menuBookmarksToggle)
  menuBookmarksToggle.onclick = () => {
    browserMenu.classList.remove("visible");
    settings.showBookmarksBar = !settings.showBookmarksBar;
    saveSettings();
    applySettings();
  };
if (menuBookmarkPage)
  menuBookmarkPage.onclick = () => {
    browserMenu.classList.remove("visible");
    bookmarkCurrentPage();
  };
if (menuFind)
  menuFind.onclick = () => {
    browserMenu.classList.remove("visible");
    openFindBar();
  };
if (menuSavePage)
  menuSavePage.onclick = () => {
    browserMenu.classList.remove("visible");
    saveCurrentPage();
  };
if (menuFullscreen)
  menuFullscreen.onclick = () => {
    browserMenu.classList.remove("visible");
    toggleFullscreen();
  };
if (menuSettings)
  menuSettings.onclick = () => {
    browserMenu.classList.remove("visible");
    openSettingsTab();
  };

const menuExtensions = document.getElementById("menu-extensions");
if (menuExtensions) {
  menuExtensions.onclick = async () => {
    browserMenu.classList.remove("visible");
    const exts = await ipcRenderer.invoke("get-extensions");
    if (exts.length === 0) {
      alert(t("noExtensions"));
    } else {
      const extList = exts
        .map((e) => `📦 ${e.name} (v${e.version})`)
        .join("\n");
      alert(`${t("installedExtensions")}\n\n${extList}`);
    }
  };
}
if (menuClose) menuClose.onclick = () => window.close();
if (menuZoomIn) menuZoomIn.onclick = () => setZoom(0.1);
if (menuZoomOut) menuZoomOut.onclick = () => setZoom(-0.1);

// URL input
urlInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const url = resolveInputToUrl(urlInput.value);
    if (url) openUrlInCurrentContext(url);
    urlInput.blur();
  }
});

urlInput.addEventListener("focus", () => urlInput.select());

// Find bar
findInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    findInPage(!e.shiftKey);
  } else if (e.key === "Escape") {
    closeFindBar();
  }
});
findInput.addEventListener("input", () => findInPage());
findPrev.onclick = () => findInPage(false);
findNext.onclick = () => findInPage(true);
findClose.onclick = closeFindBar;

// Tab context menu
tabContextMenu.addEventListener("click", (e) => {
  const action = e.target.closest(".ctx-item")?.dataset.action;
  if (!action || !contextMenuTabId) return;

  switch (action) {
    case "reload":
      const wv = getWebviewByTabId(contextMenuTabId);
      if (wv)
        try {
          wv.reload();
        } catch {}
      break;
    case "duplicate":
      duplicateTab(contextMenuTabId);
      break;
    case "pin":
      toggleTabPin(contextMenuTabId);
      break;
    case "mute":
      toggleTabMute(contextMenuTabId);
      break;
    case "close":
      closeTab(contextMenuTabId);
      break;
    case "close-others":
      closeOtherTabs(contextMenuTabId);
      break;
    case "close-right":
      closeTabsToRight(contextMenuTabId);
      break;
    case "reopen":
      reopenClosedTab();
      break;
  }

  hideContextMenu();
});

pageContextMenu.addEventListener("click", (e) => {
  const action = e.target.closest(".ctx-item")?.dataset.action;
  if (!action) return;

  const targetTab =
    pageContextTarget?.tabId && tabRegistry.get(pageContextTarget.tabId);
  const webview =
    targetTab?.type === "webview" ? targetTab.viewElement : getActiveWebview();

  if (action === "back" && webview) {
    try {
      if (webview.canGoBack()) webview.goBack();
    } catch {}
  }

  if (action === "forward" && webview) {
    try {
      if (webview.canGoForward()) webview.goForward();
    } catch {}
  }

  if (action === "reload" && webview) {
    try {
      webview.reload();
    } catch {}
  }

  if (action === "open-link" && pageContextTarget?.linkURL) {
    createWebviewTab(pageContextTarget.linkURL);
  }

  if (action === "copy-link" && pageContextTarget?.linkURL) {
    try {
      clipboard.writeText(pageContextTarget.linkURL);
    } catch (err) {
      console.error("Не удалось скопировать ссылку:", err);
    }
  }

  if (action === "save-image" && pageContextTarget?.srcURL && webview) {
    try {
      webview.downloadURL(pageContextTarget.srcURL);
    } catch (err) {
      console.error("Ошибка скачивания картинки:", err);
    }
  }

  if (action === "copy-image" && pageContextTarget?.srcURL) {
    try {
      clipboard.writeText(pageContextTarget.srcURL);
    } catch (err) {
      console.error("Не удалось скопировать URL картинки:", err);
    }
  }

  if (action === "save-page") {
    saveCurrentPage();
  }

  hidePageContextMenu();
});

// IPC shortcuts
ipcRenderer.on("browser-shortcut", (_, data) => {
  switch (data.action) {
    case "new-tab":
      createNewTabPage();
      break;
    case "close-tab":
      if (activeTabId) closeTab(activeTabId);
      break;
    case "reopen-closed-tab":
      reopenClosedTab();
      break;
    case "next-tab":
      switchTabByOffset(1);
      break;
    case "previous-tab":
      switchTabByOffset(-1);
      break;
    case "focus-address":
      focusAddressBar();
      break;
    case "refresh":
      const wv = getActiveWebview();
      if (wv)
        try {
          wv.reload();
        } catch {}
      break;
    case "go-back":
      const wvb = getActiveWebview();
      if (wvb)
        try {
          wvb.goBack();
        } catch {}
      break;
    case "go-forward":
      const wvf = getActiveWebview();
      if (wvf)
        try {
          wvf.goForward();
        } catch {}
      break;
    case "switch-to-index":
      switchTabByIndex(data.payload.index);
      break;
    case "bookmark-current-page":
      bookmarkCurrentPage();
      break;
    case "toggle-bookmarks-bar":
      settings.showBookmarksBar = !settings.showBookmarksBar;
      saveSettings();
      applySettings();
      break;
    case "open-settings":
      openSettingsTab();
      break;
    case "open-history":
      openHistoryTab();
      break;
    case "find-in-page":
      openFindBar();
      break;
    case "save-page":
      saveCurrentPage();
      break;
    case "zoom-in":
      setZoom(0.1);
      break;
    case "zoom-out":
      setZoom(-0.1);
      break;
    case "zoom-reset":
      resetZoom();
      break;
    case "toggle-fullscreen":
      toggleFullscreen();
      break;
    case "open-tab-url":
      createWebviewTab(data.payload);
      break;
    case "toggle-tab-manager":
      toggleTabManager();
      break;
    case "escape":
      if (findBarActive) closeFindBar();
      browserMenu.classList.remove("visible");
      hidePageContextMenu();
      break;
  }
});

// --- МЕНЕДЖЕР ВКЛАДОК (Ctrl+Shift+A) ---
const tabManagerPanel = document.getElementById("tab-manager-panel");
const tmSearchInput = document.getElementById("tm-search-input");
const tmActiveList = document.getElementById("tm-active-list");
const tmClosedList = document.getElementById("tm-closed-list");
const tmClosedToggle = document.getElementById("tm-closed-toggle");
const btnTabManager = document.getElementById("btn-tab-manager");
let isClosedListHidden = false;

function toggleTabManager() {
  if (tabManagerPanel.classList.contains("visible")) {
    tabManagerPanel.classList.remove("visible");
  } else {
    tmSearchInput.value = "";
    renderTabManager();
    tabManagerPanel.classList.add("visible");
    setTimeout(() => tmSearchInput.focus(), 100);
  }
}

function renderTabManager(filter = "") {
  const lowerFilter = filter.toLowerCase();

  // 1. Рисуем активные вкладки
  tmActiveList.innerHTML = "";
  tabs.forEach((id) => {
    const record = tabRegistry.get(id);
    if (!record) return;
    const title = record.title || record.address;
    if (
      filter &&
      !title.toLowerCase().includes(lowerFilter) &&
      !record.address.toLowerCase().includes(lowerFilter)
    )
      return;

    const el = document.createElement("div");
    el.className = "tm-item";
    el.innerHTML = `
      <img class="tm-item-icon" src="${record.favicon || getFaviconUrl(record.address)}" onerror="this.src='Assets/Logo.png'">
      <div class="tm-item-text">
        <div class="tm-item-title">${title}</div>
        <div class="tm-item-url">${record.address.replace(/^https?:\/\//, "")}</div>
      </div>
      <button class="tm-item-close" title="${t("close")}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    `;
    el.onclick = (e) => {
      if (e.target.closest(".tm-item-close")) {
        closeTab(id);
        renderTabManager(tmSearchInput.value);
      } else {
        switchTab(id);
        toggleTabManager();
      }
    };
    tmActiveList.appendChild(el);
  });

  // 2. Рисуем историю закрытых вкладок
  tmClosedList.innerHTML = "";
  const closedFiltered = closedTabsHistory.filter(
    (item) =>
      !filter ||
      item.title.toLowerCase().includes(lowerFilter) ||
      item.url.toLowerCase().includes(lowerFilter),
  );

  [...closedFiltered].reverse().forEach((item) => {
    const el = document.createElement("div");
    el.className = "tm-item";
    el.innerHTML = `
      <img class="tm-item-icon" src="${item.favicon}" onerror="this.src='Assets/Logo.png'">
      <div class="tm-item-text">
        <div class="tm-item-title">${item.title}</div>
        <div class="tm-item-url">${item.url.replace(/^https?:\/\//, "")}</div>
      </div>
    `;
    el.onclick = () => {
      const realIndex = closedTabsHistory.indexOf(item);
      if (realIndex > -1) closedTabsHistory.splice(realIndex, 1);
      createWebviewTab(item.url);
      toggleTabManager();
    };
    tmClosedList.appendChild(el);
  });
}

if (btnTabManager)
  btnTabManager.onclick = (e) => {
    e.stopPropagation();
    toggleTabManager();
  };
if (tmSearchInput)
  tmSearchInput.oninput = () => renderTabManager(tmSearchInput.value);
if (tmClosedToggle) {
  tmClosedToggle.onclick = () => {
    isClosedListHidden = !isClosedListHidden;
    tmClosedList.classList.toggle("hidden", isClosedListHidden);
    tmClosedToggle.querySelector("svg").style.transform = isClosedListHidden
      ? "rotate(-90deg)"
      : "rotate(0deg)";
  };
}

// Закрываем при клике мимо
document.addEventListener("click", (e) => {
  if (
    tabManagerPanel &&
    !tabManagerPanel.contains(e.target) &&
    e.target !== btnTabManager &&
    (!btnTabManager || !btnTabManager.contains(e.target))
  ) {
    tabManagerPanel.classList.remove("visible");
  }
});

// Initialize
updateStaticHTMLTranslations();
updateDynamicTranslations();
applySettings();
if (settings.openHomeOnStart) {
  createWebviewTab(settings.homepage);
} else {
  createNewTabPage();
}

// Download Events Handling
ipcRenderer.on("download-started", (_, item) => {
  downloads.push({ ...item, received: 0, state: "progressing" });
  renderDownloads();
  downloadsPanel.classList.add("visible");
});

ipcRenderer.on("download-updated", (_, data) => {
  const download = downloads.find((d) => d.id === data.id);
  if (download) {
    if (data.state) download.state = data.state;
    if (data.received !== undefined) download.received = data.received;
    if (data.savePath) download.savePath = data.savePath;
    renderDownloads();
  }
});

function renderDownloads() {
  if (downloads.length === 0) {
    downloadsList.innerHTML = `<div class="downloads-empty">${t("noDownloads")}</div>`;
    return;
  }

  downloadsList.innerHTML = "";
  downloads.forEach((d) => {
    let progress = 0;
    if (d.total > 0)
      progress = Math.min(100, Math.floor((d.received / d.total) * 100));
    else if (d.state === "completed") progress = 100;

    let statusText =
      d.state === "completed"
        ? t("completed")
        : d.state === "interrupted"
          ? t("interrupted")
          : d.state === "cancelled"
            ? t("cancelled")
            : d.total
              ? `${Math.round(d.received / 1024 / 1024)} ${t("of")} ${Math.round(d.total / 1024 / 1024)} ${t("mb")}`
              : t("loading");

    const el = document.createElement("div");
    el.className = "download-item";
    if (d.state === "completed" && d.savePath) {
      el.style.cursor = "pointer";
      el.title = t("openFile") + " " + d.savePath;
    }
    el.innerHTML = `
    <div class="download-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
    </div>
    <div class="download-info">
      <div class="download-name">${d.filename}</div>
      <div class="download-status">${statusText}</div>
      ${d.state === "progressing" ? `<div class="download-progress"><div class="download-progress-bar" style="width: ${progress}%"></div></div>` : ""}
    </div>
  `;

    if (d.state === "completed" && d.savePath) {
      el.addEventListener("click", () => {
        require("electron")
          .shell.openPath(d.savePath)
          .catch((err) => console.error(err));
      });
    }

    downloadsList.prepend(el);
  });
}

// --- ЛОГИКА SPLIT-VIEW ДЛЯ AI ПАНЕЛИ ---
let aiFirstLoad = true;

// 1. Создаем невидимый ползунок ресайза и кидаем его внутрь панели
const resizer = document.createElement("div");
resizer.id = "ai-resizer";
aiPanel.appendChild(resizer);
let isDraggingAI = false;

// 2. Начинаем тянуть
resizer.addEventListener("mousedown", (e) => {
  isDraggingAI = true;
  aiPanel.classList.add("dragging"); // Отключаем CSS-анимацию
  resizer.classList.add("active");
  document.body.style.cursor = "col-resize";
  // КРИТИЧЕСКИ ВАЖНО: Глушим все Webview!
  // Иначе, если мышка быстро соскочит на сайт, Chromium украдет событие мыши и ресайз залипнет.
  document
    .querySelectorAll("webview")
    .forEach((wv) => (wv.style.pointerEvents = "none"));
});

// 3. Тащим мышь
document.addEventListener("mousemove", (e) => {
  if (!isDraggingAI) return;
  // Ширина панели = Ширина всего окна МИНУС позиция мыши по X
  const newWidth = window.innerWidth - e.clientX;
  // Лимиты: не меньше 250px, и не больше 60% экрана (чтобы не убить основной сайт)
  if (newWidth > 250 && newWidth < window.innerWidth * 0.6) {
    aiPanel.style.width = newWidth + "px";
  }
});

// 4. Отпускаем мышь
document.addEventListener("mouseup", () => {
  if (isDraggingAI) {
    isDraggingAI = false;
    aiPanel.classList.remove("dragging");
    resizer.classList.remove("active");
    document.body.style.cursor = "";
    // Возвращаем сайтам способность принимать клики
    document
      .querySelectorAll("webview")
      .forEach((wv) => (wv.style.pointerEvents = "auto"));
  }
});

// 5. Кнопка открытия/закрытия панели
btnAi.addEventListener("click", () => {
  const isVisible = aiPanel.classList.contains("visible");
  if (isVisible) {
    // Закрываем
    aiPanel.classList.remove("visible");
    aiPanel.style.width = "0px"; // Анимация схлопывания
  } else {
    // Открываем
    aiPanel.classList.add("visible");
    aiPanel.style.width = "400px"; // Разворачиваем до дефолтных 400px
    if (aiFirstLoad) {
      aiWebview.src = aiModelSelect.value;
      aiFirstLoad = false;
    }
  }
});

aiClose.addEventListener("click", () => {
  aiPanel.classList.remove("visible");
  aiPanel.style.width = "0px";
});

aiModelSelect.addEventListener("change", (e) => {
  aiWebview.src = e.target.value;
});

// Debug tool: Right-click AI header to open webview devtools
document.querySelector(".ai-header").addEventListener("contextmenu", (e) => {
  e.preventDefault();
  try {
    aiWebview.openDevTools();
  } catch (err) {
    console.error(err);
  }
});
// Зум через Ctrl + Колесико мыши
document.addEventListener(
  "wheel",
  (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      setZoom(e.deltaY < 0 ? 0.1 : -0.1);
    }
  },
  { passive: false },
);

// Генератор кастомных страниц ошибок
function generateErrorPage(code, desc, url) {
  let title = t("networkError");
  let message = desc || t("couldNotLoadPage");
  let icon = "⚠️";

  // Расшифровываем популярные сетевые коды Chromium
  if (code === -105 || code === -104) {
    title = t("siteNotFound");
    message = t("siteNotFoundDesc");
    icon = "🌐";
  } else if (code === -106) {
    title = t("noInternet");
    message = t("noInternetDesc");
    icon = "🔌";
  } else if (code === -118) {
    title = t("timeoutError");
    message = t("timeoutErrorDesc");
    icon = "⏱️";
  } else if (code === -501) {
    title = t("insecureConnectionError");
    message = t("certificateInvalid");
    icon = "🔒";
  }

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>${t("networkError")}</title>
  <style>
    body { background: #0d0d0f; color: #f0f0f2; font-family: 'Segoe UI', system-ui, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; user-select: none; }
    .container { text-align: center; max-width: 480px; padding: 48px; background: #161618; border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
    .icon { font-size: 72px; margin-bottom: 24px; filter: drop-shadow(0 0 20px rgba(255,255,255,0.1)); }
    h1 { margin: 0 0 12px; font-size: 24px; font-weight: 500; }
    p { color: #a0a0a8; line-height: 1.6; margin-bottom: 24px; font-size: 15px; }
    .code-box { background: rgba(255, 107, 107, 0.1); padding: 8px 12px; border-radius: 8px; color: #ff6b6b; font-family: monospace; font-size: 13px; margin-bottom: 32px; display: inline-block; border: 1px solid rgba(255, 107, 107, 0.2); }
    button { background: linear-gradient(135deg, #6e8eff 0%, #a78bfa 100%); color: #fff; border: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 12px rgba(110, 142, 255, 0.25); }
    button:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(110, 142, 255, 0.4); }
    button:active { transform: translateY(0); }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">${icon}</div>
    <h1>${title}</h1>
    <p>${message}</p>
    <div class="code-box">ERR_CODE: ${code} (${desc})</div>
    <br>
    <button onclick="window.location.href='${url}'">${t("tryAgain")}</button>
  </div>
</body>
</html>`;
}
