# 正念靜心服務 (Mindful Journey)

一個全方位的正念引導平台，提供正念呼吸練習、6 分鐘感恩日記撰寫以及每日情緒追蹤功能。

## 核心功能

- **正念呼吸**：4-4-4 呼吸練習，釋放壓力與焦慮。
- **感恩日記**：每日 6 分鐘書寫，培養專注於美好的習慣。
- **情緒追蹤**：觀察心情波動，更了解自我的狀態。

## 如何在 GitHub 上發布與部署

### 1. 初始化 Git 倉庫

在您的本地終端中輸入：

```bash
git init
git add .
git commit -m "Initial commit"
```

### 2. 推送到 GitHub

在 GitHub 上創建一個新的倉庫，然後執行：

```bash
git remote add origin https://github.com/您的用戶名/您的倉庫名.git
git branch -M main
git push -u origin main --force
```

### 3. 部署到 GitHub Pages

我們已經在 `package.json` 中配置了 `gh-pages`。只需執行：

```bash
npm run deploy
```

這會自動構建您的專案並將 `dist` 資料夾的內容推送到 `gh-pages` 分支。

接著，前往 GitHub 倉庫的 **Settings > Pages**，確保來源設置為 `gh-pages` 分支，您的網站就會在大約幾分鐘後部署完成。

## 技術棧

- React 19
- Vite
- Tailwind CSS 4
- Motion (動畫庫)
- Lucide React (圖標庫)

---

由 AI Studio 驅動開發。
