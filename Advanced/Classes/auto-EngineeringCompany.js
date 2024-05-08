// You are tasked to create a register for a company that produces cars. You need to store how many cars have been produced from a specific model of a specific brand.
// Input
// The input comes as array of strings. Each element holds information in the following format:
// "{carBrand} | {carModel} | {producedCars}"
// The carBrand and carModel are strings, the producedCars are numbers. If the carBrand you’ve received already exists, just add the new carModel to it with the produced cars as its value. If even the carModel exists, just add the given value to the current one.
// Output
// As output, you need to print - for every car brand, the car models, and a number of cars produced from that model. The output format is:
// `{carBrand}
//   ###{carModel} -> {producedCars}
//   ###{carModel2} -> {producedCars}
//   ...`
// The order of printing is the order in which the brands and models first appear in the input. The first brand in the input should be the first printed and so on. For each brand, the first model received from that brand, should be the first printed and so on.


function factory(arr) {
    let brands = []
    for (let car of arr) {
        let [carBrand, carModel, qty] = car.split(" | ");
        qty = Number(qty);
        if (!brands.hasOwnProperty(carBrand)) {
            brands[carBrand] = {}
        }
        if (!brands[carBrand].hasOwnProperty(carModel)) {
            brands[carBrand][carModel] = 0
        }
        brands[carBrand][carModel] += qty
    }

    for (let brand of Object.keys(brands)) {
        console.log(brand);
        for (let [model, qty] of Object.entries(brands[brand])) {
            console.log(`###${model} -> ${qty}`);
        }
    }
}

factory(['Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10'])