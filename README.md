# 正念靜心服務 (Mindful Journey)

一個全方位的正念引導平台，提供正念呼吸練習、6 分鐘感恩日記撰寫以及每日情緒追蹤功能。

## 核心功能

- **正念呼吸**：4-4-4 呼吸練習，釋放壓力與焦慮。
- **感恩日記**：每日 6 分鐘書寫，培養專注於美好的習慣。
- **情緒追蹤**：觀察心情波動，更了解自我的狀態。

## 如何直接上傳到 GitHub (網頁操作版)

如果您不想使用終端機（Command Line），可以按照以下方式操作：

### 1. 在 GitHub 建立倉庫
在 GitHub 點擊 **"New"** 建立一個新倉庫，名稱建議為 `mindful-journey`。

### 2. 使用網頁上傳
1. 在新倉庫的頁面，點擊 **"uploading an existing file"**。
2. 將剛才從 AI Studio 下載並**解壓縮後**的所有檔案（除了 `node_modules` 如果有的話）拖拽進去。
3. 點擊 **"Commit changes"**。

### 3. 自動部署網頁 (GitHub Actions)
我已經幫您配置好了 **GitHub Actions**。當您將檔案上傳到 `main` 分支後：
1. 前往倉庫的 **Actions** 頁籤，您會看到一個名為 "Deploy to GitHub Pages" 的工作正在運行。
2. 等待它變為綠色。
3. 前往 **Settings > Pages**，將 **Build and deployment > Source** 設置為 `Deploy from a branch`。
4. 在 **Branch** 選擇 `gh-pages` 分支。
5. 您的網頁就會在大約 1 分鐘後透過該網址自動上線！

---

## 如果您習慣使用指令 (CLI)...

- React 19
- Vite
- Tailwind CSS 4
- Motion (動畫庫)
- Lucide React (圖標庫)

---

由 AI Studio 驅動開發。
