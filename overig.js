const chartWidth = 600;
const chartHeight = 600;
const backgroundColor = "#EAF2FA";
const landColor = "#09A573";
const landStroke = "#FCF5E9";
const markerColor = "#E26F99";

const projection = d3.geoMercator()
                    .scale([180])
                    .center([
                      4.865570068359375,
                      52.36553758871974
                    ])
                    .translate([chartWidth / 3, chartHeight / 3]);

const pathGenerator = d3.geoPath(projection);

const svg = d3.create('svg')
              .attr("title", "Map")
              .attr('width', chartWidth)
              .attr('height', chartHeight)

svg.append("rect")
  .attr("width", chartWidth)
  .attr("height", chartHeight)
  .attr('fill', backgroundColor);

svg.selectAll('path')
      .data(item)
      .join('path')
      .attr('d', pathGenerator)
      .attr('fill', landColor)
      .attr('stroke', landStroke)
      .attr('stroke-width', 1);
    

// getStadsdelen()
// getWijken()
// getBuurten()
// getData()
getGeojson()


// getAreas()
// getData('DX16')
let amsterdam = fetch("./custom.geo.json");

// let markers = [
//   {
//     "type": "FeatureCollection",
//     "features": [
//       {
//         "type": "Feature",
//         "properties": {},
//         "geometry": {
//           "type": "Point",
//           "coordinates": [
//             4.865570068359375,
//             52.36553758871974
//           ]
//         }
//       }
//     ]
//   }
// ]

// const chartWidth = 600;
// const chartHeight = 600;
// const backgroundColor = "#EAF2FA";
// const landColor = "#09A573";
// const landStroke = "#FCF5E9";
// const markerColor = "#E26F99";

// const projection = d3.geoMercator()
//                     .scale([180])
//                     .center([
//                       4.865570068359375,
//                       52.36553758871974
//                     ])
//                     .translate([chartWidth / 3, chartHeight / 3]);

// const pathGenerator = d3.geoPath(projection);

// const svg = d3.create('svg')
//               .attr("title", "Map")
//               .attr('width', chartWidth)
//               .attr('height', chartHeight)

// svg.append("rect")
//   .attr("width", chartWidth)
//   .attr("height", chartHeight)
//   .attr('fill', backgroundColor);

// svg.selectAll('path')
//       .data(coo)
//       .join('path')
//       .attr('d', pathGenerator)
//       .attr('fill', landColor)
//       .attr('stroke', landStroke)
//       .attr('stroke-width', 1);

// svg.selectAll("circle")
//   .data(markers)
//   .join("circle")
//   .attr("cx", d => projection(d.geometry.coordinates)[0])
//   .attr("cy", d => projection(d.geometry.coordinates)[1])
//   .attr("r", 4)
//   .attr("fill-opacity", 0.5)
//   .attr("fill", markerColor)
//   .attr("stroke", markerColor);


































// let allFetches = [];
// let d3data = [];
// let kaartData = [];

// function fetchData(wijk) {
//   const url = `https://api.data.amsterdam.nl/v1/gebieden/buurten/?_format=geojson&ligtInWijk.identificatie=${wijk}`;
//   return fetch(url).then(response => response.json());
// }

// let endFetch = 0;

// for(let i = 0; endFetch < 0; i++){
//   await fetchData(i).then(obj => {
//     if (!obj.detail) {
//       allFetches.push(obj);
//     } else {
//       endFetch++
//     }
//   })
// }

// Promise.all(allFetches).then(alleData => {
//   for (let i = 0; i < alleData.length; i++) {
//     d3data.push(alleData[i]);
  
//   }
//   // Here I use a ForEach to run through somPerSoort and add up each type of eye color.

//   // Here I use Object.keys to select all keys in my array somPerSoort
//   // with the keys selected I can map them and name them key for now.
//   // After this I make "test" return an object, in this object I
//   // use the name "key" to call for the saved keys
//   const buurten = data.features
//   const namen = []
//   buurten.map((obj) => namen.push(obj.geometry))
//   const coordinaten = [];
//   namen.map((obj) => coordinaten.push(obj.coordinates))
//   testF(coordinaten);
// });

// function testF(data) {
//   kaartData = data;
//   update(kaartData);
//   console.log(kaartData)
// }






















// let correcteWijk = [];
// // Creating an array to push data to 
// let allFetches = [];
// let somPerSoort = [];
// let personenData = [];

// // This function fetches data from SWAPI and seperates the .json part
// function fetchPeople(id) {
//   const url = `https://api.data.amsterdam.nl/v1/gebieden/stadsdelen/?_format=geojson`;
//   return fetch(url)
//     .then(response => response.json())
//     .then(data => data);

// }

// // Variable I use to count the amount of errors in the data
// // This was necessary because of 0 < 5 amount of errors in the API data
// let endFetch = 0;

// // for loop that loops through the data collected by 'fetchPeople' as long as 
// // it encounters less than 5 errors
// for (let i = 0; i < 5; i++) {
//   await fetchPeople(i).then(persoon => {
//     if (!persoon.detail) {
//       allFetches.push(persoon);
//     } else {
//       endFetch++;
//     }
//   });
// }


// var geoData = `https://api.data.amsterdam.nl/v1/gebieden/wijken/?_format=geojson`

// var verwerkGeoData = function (data) {
//   let correcteWijk = data;
//   console.log(correcteWijk)
// }
// fetch(geoData).then(function(response) { return response.json() }).then(verwerkGeoData)

