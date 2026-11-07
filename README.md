# Movie Night — GitHub Pages website

A mobile-friendly, single-title movie website using your Google Drive video.

## Files

- `index.html` — page structure
- `styles.css` — responsive styling and light/dark themes
- `app.js` — player controls, search, watchlist, sharing and theme preference
- `manifest.json` — installable web-app metadata
- `service-worker.js` — caches the website shell for repeat visits
- `assets/icon.svg` — app icon

## Publish on GitHub Pages (Android)

1. Download and extract the ZIP.
2. Open your GitHub repository in a browser.
3. Upload **all files and folders inside** `movie-night-site` to the repository root. Keep the `assets` folder.
4. Commit the changes.
5. Open **Settings → Pages**.
6. Select **Deploy from a branch**, choose `main` and `/(root)`, then Save.
7. Wait for GitHub Pages to publish and open the URL shown on the Pages screen.

Do not upload the ZIP itself as a replacement for the individual website files.

## Google Drive permission

Set the video to **Anyone with the link — Viewer**. The embedded player may still be limited by Google Drive playback quotas, file-size rules or regional availability. This website does not bypass those limits.

## Important limitations

- The movie itself is streamed by Google Drive; it is not stored in this GitHub project.
- The service worker caches the website files only. The video still requires an internet connection.
- The watchlist and theme preference are stored only in the visitor's browser.
- The search currently filters the one configured movie. Add more movie cards and corresponding player entries to create a larger library.
- Share only videos you own or have permission to distribute.
