import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```
4. Click **"Commit changes"** → **"Commit changes"**

---

**STEP 6 — Move your existing file into `src/`**

1. Click on **`tps-deal-flows.jsx`** in your repo
2. Click the **pencil icon** (top right of the file, says "Edit this file")
3. At the very top, you'll see the filename field showing `tps-deal-flows.jsx`
4. Click into that filename field, go to the **beginning** and type `src/` then change the name to `App.jsx`
   - It should read: `src/App.jsx`
   - ⚠️ Again, typing `src/` moves it into the folder automatically
5. Click **"Commit changes"** → **"Commit changes"**

---

**STEP 7 — Trigger Vercel redeploy**

1. Go to [vercel.com](https://vercel.com) → your project
2. It should **automatically redeploy** within 30 seconds of your last commit
3. If not, click **"Redeploy"** manually

---

**Your repo should end up looking like this:**
```
Deal-Flow-Network/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── README.md
└── src/
    ├── main.jsx
    └── App.jsx
