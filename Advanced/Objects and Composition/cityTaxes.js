// You will receive a city’s name (string), population (number), and treasury (number) as arguments, which you will need to set as properties of an object and return it. In addition to the input parameters, the object must have a property taxRate with an initial value of 10, and three methods for managing the city:
// collectTaxes() - Increase treasury by  population * taxRate
// applyGrowth(percentage) - Increase population by given percentage
// applyRecession(percentage) - Decrease treasury by given percentage
// Round down the values after each calculation.
// Input
// Your solution will receive three valid parameters. The methods that expect parameters will be tested with valid input.
// Output
// Return an object as described above. The methods of the object modify the object and don’t return anything.


function cityTaxes(cityName, population, treasury) {
  let currentCity = {
    cityName: cityName,
    population: population,
    treasury: treasury,
    taxRate: 10,
    collectTaxes: function () {
      return (this.treasury += this.population * this.taxRate);
    },
    applyGrowth: function (percentage) {
      return (this.population += this.population * (percentage / 100));
    },
    applyRecession: function (percentage) {
      return (this.treasury -= this.treasury * (percentage / 100));
    },
  };

  return currentCity;
}
const city = cityTaxes("Tortuga", 7000, 15000);
console.log(city);
city.collectTaxes();
city.applyGrowth(5);
city.applyRecession(10);
console.log(city);
