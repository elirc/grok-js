/*
THINK-PREDICT: Callbacks
*/
function doLater(cb) { cb("done"); }
doLater(msg => console.log(msg));
/* Predict order, when cb runs */
