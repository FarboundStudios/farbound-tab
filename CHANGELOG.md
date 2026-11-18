# Changelog

Format: [Keep a Changelog](https://keepachangelog.com/) · Versioning: [Semantic Versioning](https://semver.org/).
Each release (tag `vX.Y.Z`) takes its notes from the matching section below.

## [Unreleased]

## [1.0.0-beta]
### Added
- Farbound Tab S1 tablet (Farbound OS): Navigation, Radio, web apps (YouTube Music, Deezer, Spotify…), Settings.
- Farbound Drive instrument cluster with per-brand variants.
- Farbound Store with one-click app install, wallpapers, free icon placement.
- Native overlay window (Insert) with real mouse and keyboard.

### Known issues (beta)
- Truck coverage: Renault and Volvo are supported; other brands (e.g. Mercedes-Benz) are being added.
- DRM-protected playback (Deezer, Spotify) and Google sign-in are untested.
- Rare game crashes in `fmod.dll` / the GPU driver were observed during development; the plugin writes `crash-*.dmp` next to its log when it happens.
