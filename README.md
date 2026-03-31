# LilS Browser

**Lightweight, Simple Browser**

A lightweight, privacy-focused web browser built with Electron. Designed for minimal RAM usage (< 400 MB) and maximum performance.

## 🌟 Features

- **🌍 Multilingual** - English, Ukrainian, Czech support
- **⚡ Lightweight** - RAM usage under 400 MB
- **🔒 Privacy-First** - Built-in ad blocker, no telemetry
- **🎨 Modern UI** - Clean, dark-themed interface
- **🔐 Password Manager** - Encrypted local storage
- **🚀 Fast** - Optimized performance with GPU acceleration
- **📱 Tab Management** - Advanced tab search and organization
- **🎯 Customizable** - Speed dial, bookmarks, search engines

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Run

```bash
npm start
```

### Build

```bash
npm run build
```

## 🌍 Language Support

Switch between languages instantly without restart:
- **English** (en)
- **Українська** (uk) - Ukrainian
- **Čeština** (cs) - Czech

Change language in **Settings** → **Language**

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+T` | New tab |
| `Ctrl+W` | Close tab |
| `Ctrl+Shift+T` | Reopen closed tab |
| `Ctrl+D` | Bookmark page |
| `Ctrl+Shift+B` | Toggle bookmarks bar |
| `Ctrl+L` | Focus address bar |
| `Ctrl+F` | Find on page |
| `Ctrl+H` | History |
| `Ctrl+J` | Downloads |
| `Ctrl+,` | Settings |
| `Ctrl+Shift+N` | Incognito window |
| `Ctrl+Shift+A` | Tab manager |
| `Ctrl++` / `Ctrl+-` | Zoom in/out |
| `Ctrl+0` | Reset zoom |
| `F11` | Fullscreen |
| `F12` | DevTools |

## 🔧 Configuration

### Default Settings

- **Homepage:** `about:blank`
- **Search Engine:** Google
- **Bookmarks:** Empty (add your own)
- **Language:** English

### Customization

All settings available in **Settings** (Ctrl+,):
- Homepage URL
- Search engine (Google, DuckDuckGo, Bing)
- Bookmarks bar visibility
- Speed dial layout (rows and slots)
- Interface language

## 🛡️ Privacy & Security

- **No Telemetry** - Zero data collection
- **Local Storage** - All data stored locally
- **Encrypted Passwords** - Using Electron safeStorage
- **Ad Blocker** - Built-in EasyList support
- **Incognito Mode** - Private browsing

## 📦 Tech Stack

- **Framework:** Electron 41.0.0
- **Rendering:** Chromium webview
- **Ad Blocker:** @cliqz/adblocker-electron
- **Storage:** localStorage + encrypted vault

## 🎯 Performance

- **RAM Usage:** ~350 MB base + tabs
- **Startup Time:** < 2 seconds
- **Language Switch:** < 10ms
- **i18n Overhead:** +2 MB

## 📁 Project Structure

```
Browser/
├── main.js              # Electron main process
├── renderer.js          # Browser UI & logic
├── index.html           # Main window
├── package.json         # Dependencies
└── Assets/              # Icons and images
```

## 🔐 Password Manager

### Import Passwords

1. Export passwords from Chrome/Edge as CSV
2. Go to **Settings** → **Password Manager**
3. Click **🔑 Import (CSV)**
4. Select your CSV file

Passwords are encrypted and stored locally - never sent to any server.

## 🌐 Search Engines

- **Google** (default)
- **DuckDuckGo** (privacy-focused)
- **Bing**

## 🐛 Troubleshooting

### High RAM usage
- Close unused tabs
- Check Task Manager for memory usage
- Expected: ~350 MB for browser + tabs

### Language not changing
- Open Settings → Language
- Select desired language
- Interface updates instantly

### Browser won't start
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

## 🤝 Contributing

Contributions welcome! Areas for improvement:
- Add more languages
- Improve performance
- Add new features
- Fix bugs

## 📄 License

ISC

## 🎉 Credits

Built with ❤️ for lightweight, privacy-focused browsing.

**Target achieved:** < 400 MB RAM usage ✅

---

**Version:** 1.0.0  
**Last Updated:** 2026-03-31  
**Status:** Production Ready ✅

---

**LilS Browser** - Lightweight & Simple

# Icon made by Neuro Rich Youtuber
