const DRIVE_ID = "1YYPN_Q6c3BUbRzddSF2aW7c8ESZHxMU6";
const previewUrl = `https://drive.google.com/file/d/${DRIVE_ID}/preview`;
const viewUrl = `https://drive.google.com/file/d/${DRIVE_ID}/view`;

const $ = (id) => document.getElementById(id);
const playerSection = $("playerSection");
const frame = $("movieFrame");
const statusMessage = $("statusMessage");

$("year").textContent = new Date().getFullYear();

$("watchButton").addEventListener("click", () => {
  playerSection.hidden = false;
  playerSection.scrollIntoView({ behavior: "smooth", block: "start" });
});
$("closePlayer").addEventListener("click", () => {
  playerSection.hidden = true;
  frame.src = previewUrl;
});
$("reloadButton").addEventListener("click", () => {
  frame.src = previewUrl;
  statusMessage.textContent = "Player reloaded.";
});

$("copyVideoButton").addEventListener("click", async () => {
  await copyText(viewUrl, "Video link copied.");
});
$("shareButton").addEventListener("click", async () => {
  try {
    if (navigator.share) {
      await navigator.share({ title: "Movie Night", text: "Watch this movie", url: location.href });
    } else {
      await copyText(location.href, "Website link copied.");
    }
  } catch (error) {
    if (error.name !== "AbortError") statusMessage.textContent = "Sharing is not available in this browser.";
  }
});
async function copyText(value, success) {
  try {
    await navigator.clipboard.writeText(value);
    statusMessage.textContent = success;
  } catch {
    statusMessage.textContent = "Clipboard access is blocked. You can use the Open in Drive link.";
  }
}

const saved = localStorage.getItem("movie-night-watchlist") === "true";
const watchlistButton = $("watchlistButton");
watchlistButton.setAttribute("aria-pressed", String(saved));
watchlistButton.textContent = saved ? "✓" : "＋";
watchlistButton.title = saved ? "Remove from watchlist" : "Add to watchlist";
watchlistButton.addEventListener("click", () => {
  const next = watchlistButton.getAttribute("aria-pressed") !== "true";
  watchlistButton.setAttribute("aria-pressed", String(next));
  watchlistButton.textContent = next ? "✓" : "＋";
  watchlistButton.title = next ? "Remove from watchlist" : "Add to watchlist";
  localStorage.setItem("movie-night-watchlist", String(next));
  statusMessage.textContent = next ? "Added to your watchlist on this device." : "Removed from your watchlist.";
});

$("searchInput").addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  const matches = "movie player".includes(query);
  document.querySelector(".movie-card").hidden = !matches;
  $("emptyState").hidden = matches;
  $("movieCount").textContent = matches ? "1 TITLE" : "0 TITLES";
});

$("themeButton").addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("movie-night-light", String(document.body.classList.contains("light")));
});
if (localStorage.getItem("movie-night-light") === "true") document.body.classList.add("light");

// Cache the website shell for repeat visits. The embedded Google Drive video still needs internet.
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(() => {}));
}
