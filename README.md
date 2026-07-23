# 🎉 NUA Landing Page — Hello!

Welcome! This is your **NUA** website. It's the front door of your business on the internet.
It's where people learn about NUA, watch your demo video, and ask to book a demo or start a free trial.

This guide is written like you're 5. No tech words. No scary stuff. Promise.

---

## 🍎 What's in the box?

Think of your website like a layered cake:

| Layer | What it does | Where it lives |
|---|---|---|
| **🎨 Frontend** (the pretty pages) | What people see — the colors, the buttons, the text | `/app/frontend` |
| **🧠 Backend** (the brain) | Saves the names of people who fill the form | `/app/backend` |
| **📒 Database** (the notebook) | Stores everyone who asked for a demo | MongoDB |

You **don't have to touch the brain or the notebook** unless you want to.
Most edits live in the **🎨 Frontend** layer.

---

## ✏️ Part 1 — How to edit the text and pictures

Almost everything you see on the website is in this folder:

```
/app/frontend/src/components/sections/
```

Each part of the page is one file:

| Section on the page | File to open |
|---|---|
| The very top menu | `Navbar.jsx` |
| The big headline "AI-Powered Operating System…" | `Hero.jsx` |
| The 10 little cards (POS, Reservations, etc.) | `Modules.jsx` |
| "Meet NUA" — the AI agent | `MeetNua.jsx` |
| The voice-typing animation | `Voice.jsx` |
| The floor plan with tables | `Reservations.jsx` |
| The pink loyalty card | `Loyalty.jsx` |
| The inventory recommendation cards | `Inventory.jsx` |
| The staff roster table | `Staff.jsx` |
| The world map with dots | `MultiLocation.jsx` |
| The KPI charts | `Analytics.jsx` |
| The scrolling logos | `Integrations.jsx` |
| The NUA vs Traditional POS table | `WhyNua.jsx` |
| The 3 price cards | `Pricing.jsx` |
| The last big "Book a Demo" section | `FinalCta.jsx` |
| The footer at the bottom | `Footer.jsx` |
| The "Book Demo" pop-up form | `dialogs/LeadDialog.jsx` |
| The "Watch Product Tour" video pop-up | `dialogs/VideoDialog.jsx` |

### 🧁 Tiny example: change the big headline

1. Open `/app/frontend/src/components/sections/Hero.jsx`
2. Find this line (around line 47):
   ```
   AI-Powered Operating
   ```
3. Replace it with whatever you want, like:
   ```
   The Future of Restaurants
   ```
4. Save the file. The website will refresh by itself. ✨

### 🎨 Tiny example: change the orange brand color

The brand colors live in **one** file: `/app/frontend/tailwind.config.js`

Find this block:
```js
nua: {
  orange: '#f58c14',  // change this to any color you like
  purple: '#8b5cf6',
  pink: '#ec4899',
  ...
}
```

Pick a color from [coolors.co](https://coolors.co) and paste the new code (the thing starting with `#`).

### 🎬 Change the product tour video

1. Open `/app/frontend/src/components/dialogs/VideoDialog.jsx`
2. Find the line near the top that says:
   ```
   const VIDEO_URL = "https://www.youtube.com/embed/..."
   ```
3. Get your own YouTube/Vimeo/Loom **embed** link and paste it inside the quotes.
   - For YouTube: grab the video ID and use `https://www.youtube.com/embed/YOUR_ID?autoplay=1`
   - For Loom: click "Share" → "Embed" and copy the `src` URL.

---

## 📬 Part 2 — Where do the form sign-ups go?

When someone clicks **Book Demo** or **Start Free Trial**, a pop-up appears.
They fill in their name, email, and a few details.
Then we save them in your **notebook** (the database).

### To see all the leads:

You can ask the brain to show you the list. Open a terminal and type:

```bash
curl https://YOUR-WEBSITE/api/leads
```

You'll get back a JSON list of every person who signed up. Easy peasy.

> 💡 Later, you can ask your developer to build a tiny admin page so you can see them in your browser, sort them, and export them.

---

## 🌍 Part 3 — How to go LIVE with a GoDaddy domain

This part has two pieces and they confuse a lot of people. Let me make it crystal clear.

### 🤔 GoDaddy is a "name shop", not a "home" for your app

GoDaddy is mostly for **buying a domain name** like `nua.com` or `mynua.app`.
GoDaddy's basic hosting is for simple, old-style websites (PHP / static HTML).
**Our app uses React + Python + MongoDB, which GoDaddy basic hosting cannot run.**

So we'll do this in **2 simple steps**:

1. **Step A — Buy the name** on GoDaddy (the "address")
2. **Step B — Park your app somewhere it can actually live**, then point the name at it

---

### 🅰️ Step A — Buy your domain on GoDaddy

1. Go to **[godaddy.com](https://godaddy.com)** and sign in (or make an account).
2. In the big search bar at the top, type the name you want (e.g. `mynua.app`).
3. Pick one available, click **Add to Cart**, then **Checkout**.
4. Pay. You now **own** the name. 🎉

That's all you need from GoDaddy. The name is yours.

---

### 🅱️ Step B — Put your app somewhere it can live

There are 3 easy ways to host this app. **Pick one.**

#### Option 1 (easiest) — Use Emergent's built-in deploy 🚀

You're already on Emergent. Just click the **Deploy** button at the top of your screen.
Emergent takes care of everything — frontend, backend, database, https. You get a public URL like:

```
https://your-app-name.emergent.host
```

Now jump to **Step C** below to point your GoDaddy domain at it.

#### Option 2 (free) — Vercel (frontend) + Railway (backend + DB)

1. Push your code to GitHub (from Emergent, click "Save to GitHub").
2. Go to **[vercel.com](https://vercel.com)**, sign in with GitHub, click "Import Project", select your repo. Deploy the `frontend` folder.
3. Go to **[railway.app](https://railway.app)**, click "New Project" → "Deploy from GitHub". Select your repo, pick the `backend` folder. Add a MongoDB service from Railway's marketplace.
4. On Vercel, set the environment variable `REACT_APP_BACKEND_URL` to your Railway backend URL.
5. Done.

#### Option 3 — Upload to GoDaddy hosting (cPanel) 📤

> ⚠️ **Important first:** GoDaddy's basic shared hosting (the cheap one) can serve your **frontend** (the pretty pages) but **cannot run the brain (Python backend) or the notebook (MongoDB)**. You have **two sub-options:**
>
> - **3a. Frontend on GoDaddy + brain hosted elsewhere** (cheapest, recommended) → see steps below
> - **3b. Everything on GoDaddy VPS hosting** (more expensive, needs technical know-how) → notes at the end

---

##### 🅓🅐 Option 3a — Upload the frontend to GoDaddy cPanel

###### Step 1 — Park the brain (backend) somewhere it can live

The Python backend + MongoDB **must** live elsewhere. Use Railway, Render, or Emergent (any of them, takes ~5 minutes). You'll get a URL like:

```
https://nua-backend.up.railway.app
```

Keep this URL handy. We need it in step 2.

###### Step 2 — Build the frontend on your computer

Open a terminal inside the `frontend` folder and run these commands one by one:

```bash
cd frontend

# Tell the build where the brain lives
echo "REACT_APP_BACKEND_URL=https://nua-backend.up.railway.app" > .env

# Install ingredients (only first time, takes a few minutes)
yarn install

# Bake the website
yarn build
```

When it finishes, you'll have a brand new folder called `frontend/build/`.
Inside `build/` there's an `index.html`, a `static/` folder, some pictures, etc. **That whole folder is your website.**

###### Step 3 — Log in to GoDaddy cPanel

1. Go to **[godaddy.com](https://godaddy.com)** and log in.
2. Top-right → **My Products**.
3. Find your **Web Hosting** plan → click **Manage**.
4. Click **cPanel Admin** (a big button).

You're now in cPanel. It looks like a wall of icons. Don't be scared — we only need two.

###### Step 4 — Open File Manager and find `public_html`

1. In cPanel, click the **File Manager** icon.
2. On the left, click the folder named `public_html`.
3. This is the **front door** of your website. Anything you put here shows up on `yourdomain.com`.

> 💡 If `public_html` already has files like `index.html` or a `cgi-bin`, those are GoDaddy defaults. Select them all → right-click → **Delete** (move to trash). You want this folder empty before the next step.

###### Step 5 — Upload the build folder

1. Click the **Upload** button at the top.
2. A new tab opens. Click **Select File** and pick **EVERYTHING inside** the `frontend/build/` folder (not the folder itself — the contents).
   - On Mac/Windows, open `frontend/build/`, press `Cmd+A` / `Ctrl+A`, then drag everything into the upload window.
3. Wait until each file shows "Complete".
4. Close the upload tab.

###### Step 6 — Add the React routing fix

React websites have a quirk: if a visitor types `yourdomain.com/somepage` directly, the server says "404 — that page doesn't exist." We fix this with a tiny file.

1. In File Manager, still inside `public_html`, click **+ File** at the top.
2. Name it exactly: `.htaccess` (yes, with the dot at the front).
3. Click **Create New File**.
4. Right-click `.htaccess` → **Edit** → click **Edit** again on the popup.
5. Paste **exactly** this:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

6. Click **Save Changes** (top-right). Close the editor.

###### Step 7 — Set up HTTPS (free, takes 2 clicks)

1. Back in cPanel home, search for **SSL/TLS Status** or **Let's Encrypt SSL**.
2. Click it → check your domain → click **Run AutoSSL** (or **Issue**).
3. Wait 5–10 minutes. Your site is now `https://`. 🔒

###### Step 8 — Visit your site!

Open a new tab and type your domain (e.g. `https://mynua.app`). Tadaa! 🎉
The form, the video, everything should work — because the brain is talking to your Railway/Render backend.

###### How to update later

Whenever you change something:

1. On your computer: `yarn build` again.
2. In cPanel File Manager: delete everything in `public_html` (except `.htaccess`).
3. Re-upload the new `build/` contents.

Or use FTP for a faster workflow — ask your developer.

---

##### 🅓🅑 Option 3b — Everything on GoDaddy VPS (advanced)

GoDaddy also sells **VPS hosting** (about \$10–\$25/month). It's a tiny Linux computer in the cloud where you can install **anything**, including Node, Python, and MongoDB.

If you really want everything on GoDaddy, you'd:

1. Buy a **VPS** plan (not "Web Hosting").
2. SSH into it (a developer thing — like remote-controlling the server from your laptop).
3. Install Node 18+, Python 3.11+, MongoDB 6+.
4. Copy the `frontend/` and `backend/` folders onto the server.
5. Use **PM2** to keep the backend running, **nginx** to serve the frontend build, and **Let's Encrypt** for free HTTPS.

This is doable but quite techy. We strongly recommend **Option 3a** (frontend on GoDaddy + brain on Railway/Render) or **Option 1** (Emergent deploy). Same result, way less pain.

---

### 🅲 Step C — Point your GoDaddy domain at your live app

> 👉 **Skip this step if you chose Option 3 (GoDaddy hosting).** Your domain is already connected. This step is only for Emergent / Vercel+Railway / Render deployments.

Wherever you deployed (Emergent / Vercel / Railway), they'll give you **either**:

- An **IP address** (looks like `76.76.21.21`), OR
- A **CNAME target** (looks like `cname.vercel-dns.com`)

You'll get this from your hosting provider's dashboard, in a section called "Domains" or "Custom Domain".

Now go to GoDaddy and connect them:

1. Log in to **[godaddy.com](https://godaddy.com)**.
2. Click your name (top-right) → **My Products**.
3. Find your domain → click **DNS** (or **Manage DNS**).
4. You'll see a table of "records". Add a record like this:

   **If your host gave you an IP address:**
   | Type | Name | Value | TTL |
   |---|---|---|---|
   | `A` | `@` | (paste the IP) | 1 hour |

   **If your host gave you a CNAME target:**
   | Type | Name | Value | TTL |
   |---|---|---|---|
   | `CNAME` | `www` | (paste the cname target) | 1 hour |
   | `A` | `@` | (use forward to www, or follow host instructions) | 1 hour |

5. Hit **Save**.
6. Wait. ⏰ DNS can take **anywhere from 5 minutes to 24 hours** to spread around the world. Be patient. Make tea.

After it works, your shiny new website lives at `https://mynua.app` (or whatever you bought).

---

## 🔄 Part 4 — Edit → Save → See Changes

While you're working:

- The website **refreshes by itself** when you save a file. Don't restart anything.
- If something breaks, just **undo** in your editor (Ctrl+Z / Cmd+Z).

When you're ready to share your changes with the world:

- **On Emergent**: click **Deploy** again. Done.
- **On Vercel/Railway**: push to GitHub. They redeploy on their own.

---

## 🆘 Help! Something broke!

Don't panic. Try these in order:

1. **Refresh the page** (Ctrl+R / Cmd+R). 80% of bugs vanish.
2. **Hard refresh** (Ctrl+Shift+R / Cmd+Shift+R) to throw away cached files.
3. **Undo** your last edit. (Ctrl+Z / Cmd+Z)
4. Open Emergent again and ask the assistant: "I broke something — please look at `Hero.jsx` and tell me what's wrong."

---

## 🧰 Cheat sheet (keep this handy)

| I want to… | Open this file |
|---|---|
| Change the big headline | `frontend/src/components/sections/Hero.jsx` |
| Change a brand color | `frontend/tailwind.config.js` |
| Change prices | `frontend/src/components/sections/Pricing.jsx` |
| Change the product video | `frontend/src/components/dialogs/VideoDialog.jsx` |
| Change footer links | `frontend/src/components/sections/Footer.jsx` |
| Change the form fields | `frontend/src/components/dialogs/LeadDialog.jsx` |
| See who signed up | `curl https://YOUR-SITE/api/leads` |

---

## 🐣 Final words

You've got this. The website is yours now.
Edit boldly, save often, and remember: every bug is just a tiny puzzle.

Made with 🧡 (orange = NUA)
