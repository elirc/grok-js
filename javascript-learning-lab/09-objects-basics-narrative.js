/*
NARRATIVE: Profile object in SnackTrack
*/
let profile = {
  name: "Alex",
  goals: ["less sugar", "track spending"],
  stats: { totalSnacks: 14, avgCost: 2.1 }
};
profile.stats.totalSnacks += 1;
console.log(profile.name + " has logged " + profile.stats.totalSnacks);
console.log("Objects group related state in the story.");