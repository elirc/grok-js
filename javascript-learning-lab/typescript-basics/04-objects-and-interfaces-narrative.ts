/*
NARRATIVE TS: Typed snack model
*/
interface SnackEntry {
  name: string;
  price: number;
  timestamp: Date;
}
const entry: SnackEntry = { name: "apple", price: 0.99, timestamp: new Date() };
console.log("TS makes the data shape of the story explicit and safe.");
