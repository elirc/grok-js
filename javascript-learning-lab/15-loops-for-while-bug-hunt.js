/*
BUG HUNT: Loops
*/

let arr = [10,20,30];
// classic off by one or mutation during iteration
for (let i = 0; i <= arr.length; i++) {
  console.log(arr[i]);
}

// Infinite loop risk with while(true) without break
console.log("Off-by-one and mutation-during-iteration are top loop bugs");