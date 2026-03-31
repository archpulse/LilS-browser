const {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  webContents,
  session,
  safeStorage,
} = require("electron");
const path = require("path");
const fs = require("fs");
const { ElectronBlocker } = require("@cliqz/adblocker-electron");
const fetch = require("cross-fetch");

const VAULT_PATH = path.join(app.getPath("userData"), "vault.json");

// i18n for main process
const translations = {
  en: {
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
  },
  uk: {
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
  },
  cs: {
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
  },
};

function getCurrentLanguage() {
  try {
    // Read from localStorage file (Chromium stores it in Local Storage/leveldb)
    const localStoragePath = path.join(
      app.getPath("userData"),
      "Local Storage",
      "leveldb",
    );

    // Fallback: try to read from a simple lang file we'll create
    const langFilePath = path.join(app.getPath("userData"), "current-lang.txt");
    if (fs.existsSync(langFilePath)) {
      const lang = fs.readFileSync(langFilePath, "utf-8").trim();
      if (lang && (lang === "en" || lang === "uk" || lang === "cs")) {
        return lang;
      }
    }
  } catch (e) {
    // Fallback to default
  }
  return "en";
}

function t(key) {
  const lang = getCurrentLanguage();
  return translations[lang]?.[key] || translations.en[key] || key;
}

function loadVault() {
  if (!fs.existsSync(VAULT_PATH)) return [];
  try {
    return JSON.parse(fs.readFileSync(VAULT_PATH, "utf-8"));
  } catch (e) {
    return [];
  }
}

let mainWindow;

app.setName("BROWSER");
app.setPath("userData", path.join(app.getPath("appData"), "BROWSER"));
app.setPath("sessionData", path.join(app.getPath("userData"), "Session"));

const hasSingleInstanceLock = app.requestSingleInstanceLock();
if (!hasSingleInstanceLock) {
  app.quit();
  return;
}

// --- ИДЕАЛЬНАЯ ОПТИМИЗАЦИЯ И АППАРАТНОЕ УСКОРЕНИЕ ---
// 1. Убиваем 7-секундные задержки
app.commandLine.appendSwitch("no-proxy-server"); // Отрубает системный пинг WPAD
app.commandLine.appendSwitch("disable-quic"); // Убирает сетевые фризы
// 2. Скрываем бота от Гугла
app.commandLine.appendSwitch("disable-blink-features", "AutomationControlled");
// 3. Форсируем видеокарту (GPU) на Linux (УБИРАЕТ ЛАГИ БРАУЗЕРА!)
app.commandLine.appendSwitch("ignore-gpu-blocklist");
app.commandLine.appendSwitch("enable-gpu-rasterization");
app.commandLine.appendSwitch("enable-zero-copy");
app.commandLine.appendSwitch("enable-features", "ParallelDownloading");

function sendShortcutAction(action, payload = {}) {
  const fw = BrowserWindow.getFocusedWindow();
  if (fw && !fw.isDestroyed()) {
    fw.webContents.send("browser-shortcut", { action, payload });
  } else if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send("browser-shortcut", { action, payload });
  }
}

function bindShortcutSource(contents) {
  contents.on("before-input-event", (event, input) => {
    const control = input.control || input.meta;
    const shift = input.shift;
    const key = input.key;
    const code = input.code;

    if (control && code === "KeyT" && !shift) {
      event.preventDefault();
      sendShortcutAction("new-tab");
      return;
    }
    if (control && code === "KeyW" && !shift) {
      event.preventDefault();
      sendShortcutAction("close-tab");
      return;
    }
    if (control && code === "KeyT" && shift) {
      event.preventDefault();
      sendShortcutAction("reopen-closed-tab");
      return;
    }
    if (control && shift && code === "KeyA") {
      event.preventDefault();
      sendShortcutAction("toggle-tab-manager");
      return;
    }
    if (control && code === "KeyN" && shift) {
      event.preventDefault();
      createIncognitoWindow();
      return;
    }
    if (control && code === "KeyD" && !shift) {
      event.preventDefault();
      sendShortcutAction("bookmark-current-page");
      return;
    }
    if (control && code === "KeyB" && shift) {
      event.preventDefault();
      sendShortcutAction("toggle-bookmarks-bar");
      return;
    }
    if (control && code === "Tab" && !shift) {
      event.preventDefault();
      sendShortcutAction("next-tab");
      return;
    }
    if (control && code === "Tab" && shift) {
      event.preventDefault();
      sendShortcutAction("previous-tab");
      return;
    }
    if (control && code === "KeyL") {
      event.preventDefault();
      sendShortcutAction("focus-address");
      return;
    }
    if (control && code === "Comma") {
      event.preventDefault();
      sendShortcutAction("open-settings");
      return;
    }
    if ((control && code === "KeyR") || key === "F5") {
      event.preventDefault();
      sendShortcutAction("refresh");
      return;
    }
    if (input.alt && code === "ArrowLeft") {
      event.preventDefault();
      sendShortcutAction("go-back");
      return;
    }
    if (input.alt && code === "ArrowRight") {
      event.preventDefault();
      sendShortcutAction("go-forward");
      return;
    }
    if (control && code === "KeyF" && !shift) {
      event.preventDefault();
      sendShortcutAction("find-in-page");
      return;
    }
    if (control && code === "KeyH" && !shift) {
      event.preventDefault();
      sendShortcutAction("open-history");
      return;
    }
    if (control && code === "KeyS" && !shift) {
      event.preventDefault();
      sendShortcutAction("save-page");
      return;
    }
    if (control && code === "Equal" && !shift) {
      event.preventDefault();
      sendShortcutAction("zoom-in");
      return;
    }
    if (control && code === "Minus" && !shift) {
      event.preventDefault();
      sendShortcutAction("zoom-out");
      return;
    }
    if (control && code === "Digit0" && !shift) {
      event.preventDefault();
      sendShortcutAction("zoom-reset");
      return;
    }
    if (key === "F11") {
      event.preventDefault();
      sendShortcutAction("toggle-fullscreen");
      return;
    }
    if ((control && shift && code === "KeyI") || key === "F12") {
      event.preventDefault();
      if (contents.isDevToolsOpened()) {
        contents.closeDevTools();
      } else {
        contents.openDevTools({ mode: "detach" });
      }
      return;
    }
    if (key === "Escape") {
      sendShortcutAction("escape");
      return;
    }
    if (control && /^Digit[1-9]$/.test(code)) {
      event.preventDefault();
      sendShortcutAction("switch-to-index", {
        index: code === "Digit9" ? -1 : Number(code.replace("Digit", "")) - 1,
      });
      return;
    }
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, "Assets", "Logo.png"),
    backgroundColor: "#1a1b1e",
    titleBarStyle: "hidden",
    titleBarOverlay: { color: "#0f1012", symbolColor: "#e8eaed", height: 44 },
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
    },
    autoHideMenuBar: true,
  });

  mainWindow.loadFile("index.html");
  mainWindow.setMenu(null);
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

function createIncognitoWindow() {
  const incognitoWindow = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, "Assets", "Logo.png"),
    backgroundColor: "#111111",
    titleBarStyle: "hidden",
    titleBarOverlay: { color: "#000000", symbolColor: "#e8eaed", height: 44 },
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
      partition: "incognito",
    },
    autoHideMenuBar: true,
  });
  incognitoWindow.loadFile("index.html", { query: { incognito: "true" } });
  incognitoWindow.setMenu(null);
}

ipcMain.on("create-incognito-window", () => {
  createIncognitoWindow();
});

ipcMain.on("toggle-fullscreen", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) {
    win.setFullScreen(!win.isFullScreen());
  }
});

ipcMain.handle("get-extensions", () => {
  const { session } = require("electron");
  const exts = session.defaultSession.extensions.getAllExtensions();
  return exts.map((ext) => ({
    id: ext.id,
    name: ext.name,
    version: ext.version,
  }));
});

ipcMain.on("save-language", (event, lang) => {
  try {
    const langFilePath = path.join(app.getPath("userData"), "current-lang.txt");
    fs.writeFileSync(langFilePath, lang, "utf-8");
  } catch (e) {
    console.error("Failed to save language:", e);
  }
});

app.whenReady().then(async () => {
  // Идеальная маскировка под Firefox 128. Гугл не будет искать спец-API Хрома!
  const solidUA =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0";
  app.userAgentFallback = solidUA;

  const setupSession = (sess) => {
    sess.setUserAgent(solidUA);
    sess.webRequest.onBeforeSendHeaders((details, callback) => {
      // ВАЖНО: Мы больше не трогаем User-Agent тут, ядро само подставит нужный!
      // Мы ТОЛЬКО стираем шпионские заголовки Client Hints, чтобы Гугл нас не спалил.
      delete details.requestHeaders["sec-ch-ua"];
      delete details.requestHeaders["sec-ch-ua-mobile"];
      delete details.requestHeaders["sec-ch-ua-platform"];
      callback({ cancel: false, requestHeaders: details.requestHeaders });
    });

    sess.on("will-download", (event, item, webContents) => {
      const window =
        BrowserWindow.fromWebContents(webContents) ||
        BrowserWindow.getFocusedWindow() ||
        mainWindow;
      const downloadInfo = {
        id: Date.now().toString(),
        filename: item.getFilename(),
        total: item.getTotalBytes(),
        url: item.getURL(),
      };
      if (window) window.webContents.send("download-started", downloadInfo);
      item.on("updated", (event, state) => {
        if (state === "interrupted") {
          if (window)
            window.webContents.send("download-updated", {
              id: downloadInfo.id,
              state: "interrupted",
            });
        } else if (state === "progressing") {
          if (window)
            window.webContents.send("download-updated", {
              id: downloadInfo.id,
              state: "progressing",
              received: item.getReceivedBytes(),
              savePath: item.getSavePath(),
            });
        }
      });
      item.once("done", (event, state) => {
        if (window)
          window.webContents.send("download-updated", {
            id: downloadInfo.id,
            state,
            savePath: item.getSavePath(),
          });
      });
    });
  };

  const sessions = [
    session.defaultSession,
    session.fromPartition("incognito"),
    session.fromPartition("persist:ai_clean"),
  ];

  for (const sess of sessions) {
    setupSession(sess);
  }

  ipcMain.handle("get-vault", () => {
    const vault = loadVault();
    return vault.map((c, idx) => {
      let decryptedPass = "";
      if (safeStorage.isEncryptionAvailable()) {
        try {
          decryptedPass = safeStorage
            .decryptString(Buffer.from(c.password, "base64"))
            .toString();
        } catch (e) {}
      } else {
        try {
          decryptedPass = Buffer.from(c.password, "base64").toString("utf-8");
        } catch (e) {}
      }
      return {
        id: idx,
        url: c.url,
        username: c.username,
        password: decryptedPass,
      };
    });
  });

  ipcMain.handle("delete-vault-item", (event, index) => {
    const vault = loadVault();
    vault.splice(index, 1);
    fs.writeFileSync(VAULT_PATH, JSON.stringify(vault));
    return true;
  });

  ipcMain.handle("select-and-import-csv", async (event) => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: t("csvPasswordsFilter"), extensions: ["csv"] }],
    });
    if (canceled || filePaths.length === 0) return;

    const csv = fs.readFileSync(filePaths[0], "utf-8");
    const lines = csv.split("\n");
    const vault = loadVault();
    let importedCount = 0;

    // Умный парсер строки CSV (учитывает кавычки и запятые внутри них)
    const parseCSVRow = (text) => {
      let ret = [],
        col = "",
        inQuote = false;
      for (let i = 0; i < text.length; i++) {
        let c = text[i];
        if (c === '"' && text[i + 1] === '"') {
          col += '"';
          i++;
        } // Экранированные кавычки
        else if (c === '"') {
          inQuote = !inQuote;
        } else if (c === "," && !inQuote) {
          ret.push(col);
          col = "";
        } else {
          col += c;
        }
      }
      ret.push(col);
      return ret;
    };

    for (let i = 1; i < lines.length; i++) {
      // Удаляем только скрытый символ переноса строки \r, оставляя пробелы!
      const line = lines[i].replace(/[\r\n]+$/, "");
      if (!line) continue;

      const parts = parseCSVRow(line);
      if (parts.length >= 4) {
        const url = parts[1].trim();
        const username = parts[2].trim();
        const password = parts[3]; // ВНИМАНИЕ: без .trim()! Сохраняем все пробелы!

        if (url && username && password) {
          let encryptedPass;
          if (safeStorage.isEncryptionAvailable()) {
            encryptedPass = safeStorage
              .encryptString(password)
              .toString("base64");
          } else {
            encryptedPass = Buffer.from(password).toString("base64");
          }
          vault.push({
            url: new URL(url.startsWith("http") ? url : `https://${url}`)
              .hostname,
            username,
            password: encryptedPass,
          });
          importedCount++;
        }
      }
    }
    fs.writeFileSync(VAULT_PATH, JSON.stringify(vault));
    return importedCount;
  });

  // --- ОПТИМИЗИРОВАННЫЙ ADBLOCKER (Абсолютная победа: Сборка из исходников) ---
  const adBlockerEnginePath = path.join(
    app.getPath("userData"),
    "adblock-lists-v1.bin",
  );
  // Умный fetch: качает ТЕКСТОВЫЕ правила и вшивает иммунитет к косметическому CSS!
  const customFetch = async (...args) => {
    const res = await fetch(...args);
    const originalText = await res.text();
    // Тег $document — это команда Адблоку: "Вообще забудь про эти сайты, не трогай ни сеть, ни CSS!"
    const whitelist =
      "\n@@||youtube.com^$document\n@@||googlevideo.com^$document\n@@||ytimg.com^$document\n";
    return {
      ok: res.ok,
      status: res.status,
      text: async () => originalText + whitelist,
    };
  };
  // ИСПОЛЬЗУЕМ fromLists! Мы больше не зависим от кривых чужих бинарников.
  // Браузер скачает чистый текст, допишет наш иммунитет и сам соберет безопасный кэш.
  ElectronBlocker.fromLists(
    customFetch,
    [
      "https://easylist.to/easylist/easylist.txt", // Оригинальный, чистый EasyList
    ],
    {},
    {
      path: adBlockerEnginePath,
      read: fs.promises.readFile,
      write: fs.promises.writeFile,
    },
  )
    .then((blocker) => {
      blocker.on("request-blocked", () => {}); // Гасим спам
      blocker.enableBlockingInSession(session.defaultSession);
      blocker.enableBlockingInSession(
        session.fromPartition("persist:ai_clean"),
      );
      console.log(
        "🛡 Умный AdBlocker загружен. Косметические фильтры Ютуба уничтожены!",
      );
    })
    .catch((e) => console.error("Ошибка AdBlocker:", e));

  app.on("web-contents-created", (_event, contents) => {
    contents.on("will-attach-webview", (event, webPreferences, params) => {
      webPreferences.nodeIntegration = false;
      webPreferences.contextIsolation = true;
      webPreferences.javascript = true;
      // МАГИЯ ХАМЕЛЕОНА: Если открываем Ютуб — мы Chrome. Иначе — Firefox.
      if (
        params.src &&
        (params.src.includes("youtube.com") ||
          params.src.includes("googlevideo.com"))
      ) {
        params.useragent =
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";
      } else {
        params.useragent = solidUA;
      }
    });

    // Поддерживаем маскировку при переходе по ссылкам внутри вкладки
    contents.on(
      "did-start-navigation",
      (event, url, isInPlace, isMainFrame) => {
        if (isMainFrame) {
          if (url.includes("youtube.com") || url.includes("googlevideo.com")) {
            contents.setUserAgent(
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
            );
          } else {
            contents.setUserAgent(solidUA);
          }
        }
      },
    );

    // Функция инжекта (Полностью асинхронная, не тормозит ядро!)
    const injectYT = (event, navigationUrl) => {
      const url =
        typeof navigationUrl === "string" ? navigationUrl : contents.getURL();
      if (!url.includes("youtube.com")) return;

      contents
        .executeJavaScript(
          `
        // 1. УБИЙЦА РЕКЛАМЫ (Мгновенный)
        if (!window.ytAdKiller) {
          window.ytAdKiller = setInterval(() => {
            const adShowing = document.querySelector('.ad-showing');
            if (adShowing) {
              const video = document.querySelector('video');
              if (video) {
                // Врубаем скорость х16 и выключаем звук — реклама пролетает за миллисекунды без буферизации!
                video.playbackRate = 16.0;
                video.muted = true;
                if (!isNaN(video.duration) && video.currentTime < video.duration - 1) {
                  video.currentTime = video.duration - 0.5;
                }
              }
              const skipBtn = document.querySelector('.ytp-skip-ad-button, .ytp-ad-skip-button, .ytp-ad-skip-button-modern');
              if (skipBtn) skipBtn.click();
            }

            // Вырезаем баннеры в ленте
            const adSelectors = ['ytd-in-feed-ad-layout-renderer', 'ytd-ad-slot-renderer', 'ytd-banner-promo-renderer', '#masthead-ad'];
            adSelectors.forEach(sel => {
              document.querySelectorAll(sel).forEach(el => {
                const gridItem = el.closest('ytd-rich-item-renderer') || el.closest('ytd-item-section-renderer') || el;
                if (gridItem && gridItem.style.display !== 'none') gridItem.style.display = 'none';
              });
            });

            // Контрольный выстрел по плашкам
            document.querySelectorAll('ytd-badge-supported-renderer, .badge-shape-bg').forEach(badge => {
              const text = (badge.innerText || '').trim().toLowerCase();
              if (text === 'реклама' || text === 'ad' || text === 'sponsored' || text === 'спонсировано') {
                const gridItem = badge.closest('ytd-rich-item-renderer') || badge.closest('ytd-compact-video-renderer');
                if (gridItem && gridItem.style.display !== 'none') gridItem.style.display = 'none';
              }
            });
          }, 300);
        }

        // 2. СпонсорБлок (Асинхронный fetch внутри страницы браузера!)
        (async function() {
          if (!window.location.href.includes('/watch')) return;
          const videoIdMatch = window.location.href.match(/[?&]v=([^&]+)/);
          if (!videoIdMatch) return;
          const videoId = videoIdMatch[1];
          if (window.currentSbId === videoId) return; // Данные уже загружены
          window.currentSbId = videoId;

          try {
            // Качаем базу прямо из вкладки браузера, ядро Electron свободно!
            const res = await fetch('https://sponsor.ajay.app/api/skipSegments?videoID=' + videoId);
            const data = res.ok ? await res.json() : [];

            if (window.sbDrawInterval) clearInterval(window.sbDrawInterval);
            window.sbDrawInterval = setInterval(() => {
              const video = document.querySelector('video');
              const progressList = document.querySelector('.ytp-progress-list');
              if (!video || !progressList || isNaN(video.duration)) return;

              if (progressList.getAttribute('data-sb-id') !== videoId) {
                document.querySelectorAll('.custom-sb-segment').forEach(el => el.remove());
                progressList.setAttribute('data-sb-id', videoId);

                const colors = { 'sponsor': '#00d400', 'intro': '#00ffff', 'outro': '#0202ed', 'interaction': '#cc00ff', 'selfpromo': '#ffff00', 'music_offtopic': '#ff9900' };
                data.forEach(seg => {
                  const startPct = (seg.segment[0] / video.duration) * 100;
                  const widthPct = ((seg.segment[1] - seg.segment[0]) / video.duration) * 100;
                  const segEl = document.createElement('div');
                  segEl.className = 'custom-sb-segment';
                  segEl.style.cssText = 'position: absolute; left: ' + startPct + '%; width: ' + widthPct + '%; height: 100%; background: ' + (colors[seg.category] || '#00d400') + '; z-index: 99; opacity: 0.85; pointer-events: none; border-radius: 2px;';
                  progressList.appendChild(segEl);
                });
              }

              for (const seg of data) {
                if (video.currentTime >= seg.segment[0] && video.currentTime < seg.segment[1]) {
                  video.currentTime = seg.segment[1];

                  let toast = document.getElementById('sponsor-toast');
                  if (!toast) {
                    toast = document.createElement('div');
                    toast.id = 'sponsor-toast';
                    toast.style = 'position: absolute; top: 10%; left: 50%; transform: translateX(-50%); background: rgba(74, 222, 128, 0.9); color: #000; padding: 6px 16px; border-radius: 20px; z-index: 9999; font-weight: 600; font-size: 14px; pointer-events: none; box-shadow: 0 4px 12px rgba(0,0,0,0.5);';
                    const player = document.querySelector('.html5-video-player') || document.body;
                    player.appendChild(toast);
                  }
                  toast.innerText = '${t("sponsorSkipped").replace("Sponsor", seg.category === "sponsor" ? "Sponsor" : t("integration"))}';
                  toast.style.display = 'block';
                  setTimeout(() => toast.style.display = 'none', 3000);
                }
              }
          }, 300);
          } catch(e) {}
        })();

        // 3. Кнопка NotebookLM
        function injectNotebookBtn() {
          if (document.getElementById('custom-nl-btn')) return;
          const titleArea = document.querySelector('#title h1') || document.querySelector('h1.ytd-watch-metadata');
          if (titleArea) {
            const btn = document.createElement('button');
            btn.id = 'custom-nl-btn';
            btn.innerText = '${t("toNotebookLM")}';
            btn.style = 'margin-left: 16px; padding: 6px 14px; background: #6e8eff; color: #fff; border: none; border-radius: 18px; cursor: pointer; font-weight: 500; font-size: 14px; transition: 0.2s; white-space: nowrap; height: fit-content;';
            btn.onmouseenter = () => btn.style.background = '#8da4ff';
            btn.onmouseleave = () => btn.style.background = '#6e8eff';
            btn.onclick = () => {
              navigator.clipboard.writeText(window.location.href);
              btn.innerText = '${t("copied")}';
              btn.style.background = '#4ade80';
              setTimeout(() => { btn.innerText = '${t("toNotebookLM")}'; btn.style.background = '#6e8eff'; }, 2000);
            };
            titleArea.style.display = 'flex';
            titleArea.style.alignItems = 'center';
            titleArea.appendChild(btn);
          }
        }
        setTimeout(injectNotebookBtn, 1000);
        setTimeout(injectNotebookBtn, 2500);
      `,
        )
        .catch(() => {});
    };

    contents.on("did-finish-load", () => {
      injectYT();

      const currentUrl = contents.getURL();
      if (currentUrl.startsWith("http")) {
        try {
          const hostname = new URL(currentUrl).hostname;
          const vault = loadVault();
          const siteCreds = vault.find(
            (c) => hostname.includes(c.url) || c.url.includes(hostname),
          );

          let decryptedPass = "";
          if (siteCreds) {
            if (safeStorage.isEncryptionAvailable()) {
              decryptedPass = safeStorage
                .decryptString(Buffer.from(siteCreds.password, "base64"))
                .toString();
            } else {
              decryptedPass = Buffer.from(
                siteCreds.password,
                "base64",
              ).toString("utf-8");
            }
          }
          // Безопасно передаем данные в инжект через JSON (спасает от спецсимволов в паролях)
          const credsPayload = siteCreds
            ? JSON.stringify({ user: siteCreds.username, pass: decryptedPass })
            : "null";

          // ВНЕДРЯЕМ УМНЫЙ СКРИПТ (Автозаполнение + Захват новых паролей)
          contents
            .executeJavaScript(
              `
            (function() {
              const creds = ${credsPayload};

              // 1. Автозаполнение (Ждем появления формы)
              if (creds) {
                const setNativeValue = (element, value) => {
                  try {
                    // Обращаемся напрямую к "железу" браузера, игнорируя защиту сайта
                    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
                    nativeInputValueSetter.call(element, value);

                    // Эмулируем ручной ввод, чтобы сайт подумал, что ты печатаешь на клавиатуре
                    element.dispatchEvent(new Event('input', { bubbles: true }));
                    element.dispatchEvent(new Event('change', { bubbles: true }));

                    // Красим поля
                    element.style.backgroundColor = '#e8f0fe';
                    element.style.color = '#000000';
                  } catch(e) {
                    // Резервный метод
                    element.value = value;
                    element.style.backgroundColor = '#e8f0fe';
                  }
                };

                // SPA-сайты грузятся долго. Делаем 50 попыток (5 секунд) найти пароль
                let attempts = 0;
                const fillInterval = setInterval(() => {
                  attempts++;
                  const passInput = document.querySelector('input[type="password"]');

                  if (passInput && !passInput.value) {
                    setNativeValue(passInput, creds.pass);

                    // Ищем логин рядом с паролем
                    const inputs = Array.from(document.querySelectorAll('input'));
                    const passIndex = inputs.indexOf(passInput);
                    for (let i = passIndex - 1; i >= 0; i--) {
                      const type = inputs[i].type.toLowerCase();
                      if (type === 'text' || type === 'email' || type === 'tel' || inputs[i].name.includes('user') || inputs[i].name.includes('login')) {
                        setNativeValue(inputs[i], creds.user);
                        break;
                      }
                    }
                    clearInterval(fillInterval); // Успех! Останавливаем поиск
                  }
                  if (attempts > 50) clearInterval(fillInterval); // Сдаемся через 5 сек
                }, 100);
              }

              // 2. ЗАХВАТ НОВЫХ ПАРОЛЕЙ (Шпион форм)
              document.addEventListener('submit', (e) => {
                const form = e.target;
                const passInput = form.querySelector('input[type="password"]');
                if (passInput && passInput.value) {
                   const loginInput = form.querySelector('input[type="email"], input[type="text"], input[name*="user"], input[name*="login"]');
                   const user = loginInput ? loginInput.value : '';
                   const pass = passInput.value;
                   console.debug('BROWSER_SAVE_PASS::' + JSON.stringify({ url: window.location.hostname, user, pass }));
                }
              }, true);
               // 3. Зум через Ctrl + Колесико
              window.addEventListener('wheel', (e) => {
                if (e.ctrlKey || e.metaKey) {
                  e.preventDefault();
                  console.debug('BROWSER_ZOOM::' + (e.deltaY < 0 ? 'in' : 'out'));
                }
              }, { passive: false });
            })();
          `,
            )
            .catch(() => {});
        } catch (e) {}
      }
    });

    // ЯДРО СЛУШАЕТ СООБЩЕНИЯ ОТ ШПИОНА
    contents.on("console-message", async (event, level, message) => {
      if (typeof message !== "string") return;

      // Отлавливаем зум
      if (message.startsWith("BROWSER_ZOOM::")) {
        const action = message.split("::")[1];
        sendShortcutAction(action === "in" ? "zoom-in" : "zoom-out");
        return;
      }

      // Отлавливаем сохранение паролей
      if (message.startsWith("BROWSER_SAVE_PASS::")) {
        try {
          const creds = JSON.parse(message.replace("BROWSER_SAVE_PASS::", ""));
          if (!creds.pass) return;

          const vault = loadVault();
          // Проверяем, нет ли уже такого пароля
          const existing = vault.find(
            (c) => creds.url.includes(c.url) && c.username === creds.user,
          );

          if (!existing) {
            // Спрашиваем тебя: "Сохранить?"
            const targetWindow =
              BrowserWindow.fromWebContents(contents) || mainWindow;
            const { response } = await dialog.showMessageBox(targetWindow, {
              type: "question",
              buttons: [t("savePasswordYes"), t("savePasswordNo")],
              title: t("passwordManagerTitle"),
              message: `${t("savePasswordFor")} ${creds.url}?`,
              detail: `${creds.user || t("noLoginText")}`,
            });

            if (response === 0) {
              let encryptedPass;
              if (safeStorage.isEncryptionAvailable()) {
                encryptedPass = safeStorage
                  .encryptString(creds.pass)
                  .toString("base64");
              } else {
                encryptedPass = Buffer.from(creds.pass).toString("base64");
              }
              vault.push({
                url: creds.url,
                username: creds.user,
                password: encryptedPass,
              });
              fs.writeFileSync(VAULT_PATH, JSON.stringify(vault));
            }
          }
        } catch (e) {
          console.error("Ошибка сейва:", e);
        }
      }
    });
    contents.on("did-navigate-in-page", (event, url) => injectYT(event, url));

    const type = contents.getType();
    if (type === "window" || type === "webview") {
      bindShortcutSource(contents);
    }

    contents.setWindowOpenHandler(({ url }) => {
      let targetWindow =
        BrowserWindow.fromWebContents(contents) ||
        BrowserWindow.getFocusedWindow() ||
        mainWindow;
      if (targetWindow && !targetWindow.isDestroyed()) {
        targetWindow.webContents.send("browser-shortcut", {
          action: "open-tab-url",
          payload: url,
        });
      }
      return { action: "deny" };
    });
  });
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("second-instance", () => {
  if (!mainWindow) return;
  if (mainWindow.isMinimized()) mainWindow.restore();
  mainWindow.focus();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
