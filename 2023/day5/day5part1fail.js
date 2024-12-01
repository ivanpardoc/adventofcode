import { input, inputExample } from './input.js';
let lowestNumber;
let seedsToSoilMapping = [];
let soilToFertilizerMapping = [];
let fertilizerToWaterMapping = [];
let waterToLightMapping = [];
let lightToTemperatureMapping = [];
let temperatureToHumidityMapping = [];
let humidityToLocationMapping = [];

function solveDay5() {
    const { seeds, seedToSoil, soilToFertilizer, fertilizerToWater, waterToLight, lightToTemperature, temperatureToHumidity, humidityToLocation} = inputExample;
    // console.log(data);
    const seedsSplitted = seeds.split(' ');
    console.log('map 1');
    seedsToSoilMapping = mapCoordinates(seedToSoil);
    console.log('map 2', seedsToSoilMapping);
    // soilToFertilizerMapping = mapCoordinates(soilToFertilizer);
    // console.log('map 3');
    // fertilizerToWaterMapping = mapCoordinates(fertilizerToWater);
    // console.log('map 4');
    // waterToLightMapping = mapCoordinates(waterToLight);
    // console.log('map 5');
    // lightToTemperatureMapping = mapCoordinates(lightToTemperature);
    // console.log('map 6');
    // temperatureToHumidityMapping = mapCoordinates(temperatureToHumidity);
    // console.log('map 7');
    // humidityToLocationMapping = mapCoordinates(humidityToLocation);
    // console.log('Seeds');

    // seedsSplitted.forEach((seed) => {
    //     console.log('seed', seed);
    //     const soil = getMapping(parseInt(seed), seedsToSoilMapping);
    //     const fertilizer = getMapping(soil, soilToFertilizerMapping);
    //     const water = getMapping(fertilizer, fertilizerToWaterMapping);
    //     const light = getMapping(water, waterToLightMapping);
    //     const temperature = getMapping(light, lightToTemperatureMapping);
    //     const humidity = getMapping(temperature, temperatureToHumidityMapping);
    //     const location = getMapping(humidity, humidityToLocationMapping);
    //     lowestNumber = lowestNumber > location || !lowestNumber ? location : lowestNumber
    // });
    
    
    console.log('lowestNumber', lowestNumber);


}

function getMapping(og, arr) {
    let filteredValue = arr.filter((item)  => item.og === og);
    filteredValue = filteredValue.length === 0 ? og : filteredValue[0].dest;
    return filteredValue;
}

function mapCoordinates(ogToDest) {
    const mapping = [];
    ogToDest.forEach(seedSoil => {
        const arr = seedSoil.split(' ');
        const og = arr[0];
        const dest = arr[1];
        const range = arr[2];
        mapping.push({og: parseInt(dest), dest: parseInt(og), range: parseInt(range)})
        // for (let index = 0; index < range; index++) {
        //     mapping.push({
        //         og: parseInt(dest) + index,
        //         dest: parseInt(og) + index
        //     });
        // }
    })

    return mapping;
}

solveDay5();
