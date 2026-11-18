# Versioning

Two independent things are versioned, both with [semver](https://semver.org/) (`MAJOR.MINOR.PATCH`).

## 1. The tablet (plugin + Farbound OS)
- Published as **GitHub Releases** of this repository: tag `vX.Y.Z`, notes from [`CHANGELOG.md`](../CHANGELOG.md), plugin files attached as assets.
- The tablet knows its own version (`TABLET_VERSION` in `dashboard/tablet/index.html`, shown in **Settings → About**).
- It checks `https://api.github.com/repos/FarboundStudios/farbound-tab/releases/latest` at most every 12 h (and on **Check for updates**). If the latest tag is newer, **Settings → About** shows the new version, its notes and where to download it. The tablet never updates itself: the player installs the new release manually.

### Releasing a tablet version
1. Update `TABLET_VERSION` in `dashboard/tablet/index.html`, rebuild the plugin.
2. Move the `[Unreleased]` notes of `CHANGELOG.md` under a new `## [X.Y.Z]` heading.
3. Commit, then tag and push: `git tag vX.Y.Z && git push --tags`.
4. The **Release** workflow validates the catalog and creates a **draft** release with the changelog section as notes.
5. Open the draft on GitHub, attach the built files (a zip of the `plugin/` folder (`farbound-tab.dll`, `farbound-tab.ini`, `farbound-tab\dashboard\`, licenses)), then **Publish**.

Rules: PATCH = fixes, MINOR = new features/apps compatible with older tablets, MAJOR = breaking change in the app protocol.

## 2. The apps (Farbound Store)
- Every app in [`apps/index.json`](../apps/index.json) has a `version`. Bump it whenever you change the app: players who installed it see **Update** in the Store.
- Optional `minTablet` (e.g. `"1.2.0"`): the Store disables **Install** on tablets older than that and shows `Tablet ≥ 1.2.0`.
- Apps stay compatible with the app protocol (`hello`, `telemetry`, `prefs`…). New protocol messages are only added in MINOR tablet versions; apps that need them set `minTablet`.

```json
{ "id": "my-app", "version": "1.3.0", "minTablet": "1.2.0", "…": "…" }
```

`node scripts/validate.js` checks that every `version` / `minTablet` is valid semver.
