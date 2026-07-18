/*
NARRATIVE: When the network fails
*/
try {
  await fetchData();
} catch (e) {
  showFriendlyMessage("Could not load history. Using cache.");
}
console.log("Error handling keeps SnackTrack usable when real life intervenes.");
