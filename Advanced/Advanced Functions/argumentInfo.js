// Write a function that displays information about the arguments which are passed to it (type and value) and a summary about the number of each type in the following format: 
// `{argument type}: {argument value}`
// Print each argument description on a new line. At the end print a tally with counts for each type in descending order, each on a new line in the following format:
// `{type} = {count}`
// If two types have the same count, use order of appearance. 
// Do NOT print anything for types that do not appear in the list of arguments.
// Input
// You will receive a series of arguments passed to your function.
// Output
// Print on the console the type and value of each argument passed into your function.


function getInfo(...data) {
  let types = {};

  for (let el of data) {
    currentEl = el;
    let type = typeof el;
    if (!types[type]) {
      types[type] = 1;
    } else {
      types[type] += 1;
    }
    console.log(`${type}: ${currentEl}`);
  }
  let sortedTypes = [];
  for (let type in types) {
    sortedTypes.push([type, types[type]]);
  }
  sortedTypes.sort(function (a, b) {
    return b[1] - a[1];
  });
  for (let [type, qty] of sortedTypes) {
    console.log(`${type} = ${qty}`);
  }
}

getInfo("cat", 42, 89, function () {
  console.log("Hello world!");
});
