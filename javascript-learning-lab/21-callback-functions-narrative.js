/*
NARRATIVE Callbacks
*/
function saveToServer(data, onDone) {
  setTimeout(() => onDone("saved " + data), 0);
}
saveToServer("chips", msg => console.log(msg));
console.log("Callbacks power async parts of the SnackTrack story.");
