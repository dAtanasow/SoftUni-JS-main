function solution() {
  let recipes = {
    apple: { carbohydrate: 1, flavour: 2 },
    lemonade: { carbohydrate: 10, flavour: 20 },
    burger: { carbohydrate: 5, fat: 7, flavour: 3 },
    eggs: { protein: 5, fat: 1, flavour: 1 },
    turkey: { protein: 10, carbohydrate: 10, fat: 10, flavour: 10 },
  };

  let inStock = {
    protein: 0,
    carbohydrate: 0,
    fat: 0,
    flavour: 0,
  };
  return function (data) {
    let [command, product, qty] = data.split(" ");
    switch (command) {
      case "restock":
        return restock(product, qty);
      case "prepare":
        return prepare(product, qty);
      case "report":
        return report();
    }
  };
  function restock(product, qty) {
    if (!inStock[product]) {
      inStock[product] = Number(qty);
    } else {
      inStock[product] += Number(qty);
    }
    return `Success`;
  }

  function prepare(product, qty) {
    let prepareRecipe = {};
    for (let [microelement, value] of Object.entries(recipes[product])) {
      let neededElQty = value * qty;
      if (inStock[microelement] < neededElQty) {
        return `Error: not enough ${microelement} in stock `;
      } else {
        prepareRecipe[microelement] = neededElQty;
      }
    }
    for (let [microelement, value] of Object.entries(prepareRecipe)) {
      inStock[microelement] -= value;
    }
    return `Success`;
  }


  function report() {
    return `protein=${inStock.protein} carbohydrate=${inStock.carbohydrate} fat=${inStock.fat} flavour=${inStock.flavour}`;
  }
}
let manager = solution();
console.log(manager("restock flavour 50")); // Success
console.log(manager("prepare lemonade 4")); // Error: not enough carbohydrate in stock
console.log(manager("restock carbohydrate 10"));
console.log(manager("restock flavour 10"));
console.log(manager("prepare apple 1"));
console.log(manager("restock fat 10"));
console.log(manager("prepare burger 1"));
console.log(manager("report"));
