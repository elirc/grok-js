/*
NARRATIVE: Loading saved snacks from "server"
*/
async function loadHistory() {
  const res = await fetch("/api/history");
  const data = await res.json();
  console.log("Loaded", data.length, "entries into the story");
}
console.log("Async makes SnackTrack able to talk to the world without blocking UI.");
