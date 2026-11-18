# Creating apps for Farbound Tab

An app is a small web page (HTML + CSS + JavaScript). No build step, no SDK: if you can make a web page, you can make a tablet app.

There are two kinds of apps:

| Type | What it is | Gets telemetry? |
|---|---|---|
| `local` | Your page, shown inside the tablet (an iframe). | **Yes** — speed, position, fuel, language… |
| `web` | An existing website opened full-screen in a native browser view (like YouTube Music). | No |

---

## 1. Write your first app (5 minutes)

Copy [`apps/_template`](../apps/_template) to `apps/my-app` and edit `index.html`:

```html
<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  html,body{margin:0;height:100%;background:#101826;color:#fff;font-family:"Segoe UI",system-ui,sans-serif}
  ::-webkit-scrollbar{width:8px}::-webkit-scrollbar-thumb{background:#4aa3ff;border-radius:6px}
</style></head>
<body>
  <h1>My app</h1>
  <p>Speed: <b id="spd">0</b> km/h</p>
<script>
const send = m => parent.postMessage({ tablet: 1, ...m }, '*');

addEventListener('message', e => {
  const m = e.data; if (!m || !m.tablet) return;
  if (m.type === 'telemetry') document.getElementById('spd').textContent = Math.round(m.data.speed || 0);
  if (m.type === 'prefs')     document.documentElement.lang = m.lang;   // fr | en | de | it | es
});

send({ type: 'hello' });   // tells the tablet you are ready → it sends the first telemetry/prefs
</script></body></html>
```

### Design guidelines
- The app area is about **1024 × 440 px** on a default tablet but the user can resize the interface (60–130 %): use responsive layouts (flex/grid, `vh`/`vw`, `rem`).
- Big touch-friendly buttons (≥ 44 px). The user may use a mouse, a keyboard pointer or a gamepad.
- Dark backgrounds read best in a truck cab.
- Support the 5 languages when you can: use `prefs.lang` (`fr`, `en`, `de`, `it`, `es`) and fall back to English.
- Don't load heavy scripts; the tablet shares the game's CPU/GPU.

---

## 2. Messages

All messages are `window.postMessage` objects with `tablet: 1`.

### App → tablet (`parent.postMessage({tablet:1, …}, '*')`)

| `type` | Fields | Effect |
|---|---|---|
| `hello` | — | Say you're ready; the tablet answers with `prefs` and `telemetry`. |
| `home` | — | Go to the home screen. |
| `open` | `id` | Open another app (e.g. `'radio'`, `'gps'`). |
| `nowplaying` | `title`, `artist` | Update the "now playing" tile on the home screen. |
| `log` | `msg` | Write a line in the plugin log (`plugins\heavymp-probe\ui-probe.log`). |

### Tablet → app

**`telemetry`** (about 10 per second): `data` contains

| Field | Meaning |
|---|---|
| `speed` | km/h |
| `x`, `y`, `heading` | world position (meters) and heading (° from north) |
| `limit` | speed limit (km/h, 0 if unknown) |
| `fuel`, `fuelCap`, `fuelRange` | liters, tank capacity, range (km) |
| `rpm`, `gear`, `cruise` | engine data |
| `live` | `true` when the game is connected |

**`prefs`**: `{lang, scale}` — language code and the user's interface scale (%).

**`back`**: the user pressed Back; handle it (close a menu…) or ignore it.

---

## 3. Test it on your tablet (no publishing needed)

### Option A — from a local folder (best while developing)
1. Put your files in a folder, e.g. `C:\my-apps\my-app\` with `index.html` **and** a `manifest.json` (see Option B, with `"type": "local"`).
2. Serve the parent folder with CORS enabled: `npx serve --cors C:\my-apps` (it prints a `http://localhost:3000` address).
3. On the tablet: **Settings → Apps**, paste `http://localhost:3000/my-app/manifest.json`, press **Install**.
4. Edit your files, then press **F6** in the game to reload.

> Pasting a plain page address (without a manifest) installs it as a `web` app: a full-screen browser view, without telemetry.

### Option B — with a `manifest.json`
*Settings → Apps* accepts the address of a manifest, so a hosted app can describe itself:

```json
{
  "id": "my-app",
  "name": "My app",
  "start_url": "index.html",
  "color": "linear-gradient(145deg,#4aa3ff,#1d5fd1)",
  "type": "local"
}
```

### Option C — the demo app
Open **Farbound Store → Test App → Install** to see a working example (telemetry, counter, text input, scrolling).

---

## 4. Publish to the Farbound Store

1. Fork this repository.
2. Add your app in `apps/my-app/` (all files must be inside this folder; use relative paths).
3. Add an entry to [`apps/index.json`](../apps/index.json):

```json
{
  "id": "my-app",
  "name": { "en": "My app", "fr": "Mon app" },
  "description": { "en": "What it does, in one sentence.", "fr": "Ce qu'elle fait, en une phrase." },
  "author": "Your name",
  "version": "1.0.0",
  "emoji": "🚛",
  "color": "linear-gradient(145deg,#4aa3ff,#1d5fd1)",
  "type": "local",
  "entry": "apps/my-app/index.html"
}
```

| Field | Notes |
|---|---|
| `id` | unique; lowercase letters, digits and `-` |
| `name`, `description` | a string, or an object per language (`fr en de it es`) |
| `version` | bump it to make the Store offer **Update** to people who installed the app |
| `emoji` | the icon |
| `color` | CSS color or gradient behind the icon |
| `type` | `local` or `web` |
| `entry` | path in this repo, or a full `https://` URL (always a full URL for `web` apps) |

4. Run `node scripts/validate.js` — it must print `OK`.
5. Open a pull request. Once merged, the app appears in the Farbound Store.

> The Store loads the catalog through jsDelivr, which caches `@main` for up to ~12 hours. After a merge, you can force a refresh at `https://purge.jsdelivr.net/gh/FarboundStudios/farbound-tab@main/apps/index.json`.

### Rules
- No data collection, tracking, ads or crypto-mining.
- Only reference third-party code/assets you are allowed to redistribute (keep their licenses).
- An app must not impersonate another brand or service.
- Apps are web pages loaded from the internet: keep them safe and small.

---

## 5. Add a website as an app (no code)

*Settings → Apps*, paste any `https://` address (e.g. `https://www.youtube.com`) and press **Install**: it opens as a native browser view with scrolling, clicks and the on-screen keyboard. To share it with everyone, add it to the catalog with `"type": "web"` and a full `entry` URL.

---

## FAQ

**My app is blank in the Store version but works locally.** Use relative paths (`./style.css`, not `/style.css`) and keep every file inside `apps/<id>/`.

**How do I see errors?** Call `send({type:'log', msg:'…'})` and read `Euro Truck Simulator 2\bin\win_x64\plugins\heavymp-probe\ui-probe.log`; or open your page in a normal browser while developing.

**Can an app control the truck?** No. The tablet is read-only toward the game.
