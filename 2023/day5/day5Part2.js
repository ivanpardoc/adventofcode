import { input, inputExample } from './input.js';

let lowestNumber;
let seedsToSoilMapping = [];
let soilToFertilizerMapping = [];
let fertilizerToWaterMapping = [];
let waterToLightMapping = [];
let lightToTemperatureMapping = [];
let temperatureToHumidityMapping = [];
let humidityToLocationMapping = [];
let seedsRanges = [];

function solveDay5() {
    const { seeds, seedToSoil, soilToFertilizer, fertilizerToWater, waterToLight, lightToTemperature, temperatureToHumidity, humidityToLocation} = input;
    const seedsSplitted = seeds.split(' ');
    // getAllSeeds(seedsSplitted);
    seedsToSoilMapping = mapCoordinates(seedToSoil);
    soilToFertilizerMapping = mapCoordinates(soilToFertilizer);
    fertilizerToWaterMapping = mapCoordinates(fertilizerToWater);
    waterToLightMapping = mapCoordinates(waterToLight);
    lightToTemperatureMapping = mapCoordinates(lightToTemperature);
    temperatureToHumidityMapping = mapCoordinates(temperatureToHumidity);
    humidityToLocationMapping = mapCoordinates(humidityToLocation);
    getAllSeeds(seedsSplitted);
}

function getMapping(numberToCheck, arr) {
    let numberFound = 0;
    arr.forEach(item => {
        if (numberToCheck >= item.og && numberToCheck < item.og + item.range ) {
            return numberFound = numberToCheck + (item.dest - item.og);
        } else {
            return numberFound = numberFound === 0 ? numberToCheck : numberFound;
        }
    });


    return numberFound;
}

function mapCoordinates(ogToDest) {
    const mapping = [];
    ogToDest.forEach(seedSoil => {
        const arr = seedSoil.split(' ');
        const og = arr[0];
        const dest = arr[1];
        const range = arr[2];
        mapping.push({og: parseInt(dest), dest: parseInt(og), range: parseInt(range)})
    })

    return mapping;
}


function getAllSeeds(seeds) {
    for (let index = 0; index < seeds.length; index++) {
        const seed = parseInt(seeds[index]);
        if (index === 0 || index%2 === 0) {
            for (let indext = 0; indext < seeds[index+1]; indext++) {
                const newseed = seed + (indext);
                const soil = getMapping(parseInt(newseed), seedsToSoilMapping);
                const fertilizer = getMapping(soil, soilToFertilizerMapping);
                const water = getMapping(fertilizer, fertilizerToWaterMapping);
                const light = getMapping(water, waterToLightMapping);
                const temperature = getMapping(light, lightToTemperatureMapping);
                const humidity = getMapping(temperature, temperatureToHumidityMapping);
                const location = getMapping(humidity, humidityToLocationMapping);
                lowestNumber = lowestNumber > location || !lowestNumber ? location : lowestNumber
            }
            console.log('seed:', seed, 'lowestNumber:', lowestNumber);
        }
        
    }
}
solveDay5();

// 210388587 - TOO HIGH
// 120063312 - TOO HIGH
// 69841803 - Ok
