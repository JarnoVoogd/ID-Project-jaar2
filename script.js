// import fetch from "node-fetch";
// import data from "./data3.json";



function getData (code) {
  code = "A03a"
  const url = `https://api.data.amsterdam.nl/v1/bbga/kerncijfers/?jaar=2021&gebiedcode15=${code}&_count=true&_format=json`
  const data = fetch(url)
  data
    .then(response => response.json())
    .then(data => {
      let number = data.page.totalElements
      return number
    })
    .then(number => {
      console.log(number)
      const allData = fetch(url + `&_pageSize=${number}`)
      allData
        .then(response => response.json())
        .then(allData => {
          console.log(allData)
          const items = allData._embedded.kerncijfers
          const filteredObjects = items.filter(obj => obj.indicatorDefinitieId === 'WCORHUUR'  | obj.indicatorDefinitieId === 'WKOOP' | obj.indicatorDefinitieId === 'WPARTHUUR' )
          console.log(filteredObjects)
        })
    })
}
const leaflet = []
function getStadsdelen(){
  const stadsdelen = fetch(`https://api.data.amsterdam.nl/v1/gebieden/stadsdelen/?_format=geojson`)
  // const stadsdelen = fetch(`https://api.data.amsterdam.nl/v1/gebieden/stadsdelen/`)
  stadsdelen
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const stadsdelen = data.features
      
      stadsdelen.map((obj) => leaflet.push(obj.properties))
      console.log(leaflet)
    })
}

function getWijken(stadsdeel){
  stadsdeel = "03630000000018"
  const wijken = fetch(`https://api.data.amsterdam.nl/v1/gebieden/wijken/?_format=geojson&ligtInStadsdeel.identificatie=${stadsdeel}`)
  // const stadsdelen = fetch(`https://api.data.amsterdam.nl/v1/gebieden/stadsdelen/`)
  wijken
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const wijken = data.features
      const namen = []
      wijken.map((obj) => namen.push(obj.properties))
      console.log(namen)
    })
}

function getBuurten(wijk){
  wijk = "03630012052034"
  const buurten = fetch(`https://api.data.amsterdam.nl/v1/gebieden/buurten/?_format=geojson&ligtInWijk.identificatie=${wijk}`)
  // const stadsdelen = fetch(`https://api.data.amsterdam.nl/v1/gebieden/stadsdelen/`)
  buurten
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const buurten = data.features
      const namen = []
      buurten.map((obj) => namen.push(obj.properties))
      console.log(namen)
    })
}

function getGeojson(wijk){
  wijk = "03630012052034"
  const buurten = fetch(`https://api.data.amsterdam.nl/v1/gebieden/buurten/?_format=geojson&ligtInWijk.identificatie=${wijk}`)
  // const stadsdelen = fetch(`https://api.data.amsterdam.nl/v1/gebieden/stadsdelen/`)
  buurten
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const buurten = data.features
      const namen = []
      buurten.map((obj) => namen.push(obj.geometry))
      console.log(buurten);
      const coordinaten = [];
      namen.map((obj) => coordinaten.push(obj.coordinates))
      console.log(namen)
      coordinaten.forEach(function(item){

      console.log(item)
      
    })
}
    )}
getStadsdelen()
// getWijken()
// getBuurten()
// getData()
// getGeojson()

console.log(leaflet);

// Inladen van de openstreetmap kaart + centreren boven amsterdam
var map = L.map("kaart").setView([52.3546,4.9039], 12);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 15,
    minZoom: 11,
    id: 'voegdoe/ckyln76g82hnw15ql1m059kqh',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoidm9lZ2RvZSIsImEiOiJja3lrOHNkOWgyYzg5Mm5xaGUyZzNjaTBrIn0.ks4WYqbTFNJOrr8TQj8shw'
}).addTo(map);


// geoJSON toevoegen aan de kaart
L.geoJSON(adamdata).addTo(map)


/*=========================================

STYLING 

=========================================*/

// Variabele die gebruikt gaat worden voor de styling 
let geojson;

// Schaal voor de kleur adhv data
function getColor(d) {
  return d > 600000 ? '#003330' : //'#800026' :
         d > 500000  ? '#008f83' : //'#BD0026' :
         d > 400000  ? '#00d1c0' : //'#E31A1C' :
         d > 300000  ? '#14ffeb' : //'#FC4E2A' :
         d > 200000   ? '#57fff1' : //'#FD8D3C' : 
         d > 100000   ? '#99fff7' : //'#FEB24C' : hahaha
         d > 50000   ? '#dbfffc' : //'#FED976' :
                    '#ffffff';
}

// Functie die de stijl van de kaart definieert
function style(feature) {
  return {
      fillColor: getColor(feature.properties.Oppervlakte_m2),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.5
  };
}

// De nieuwe styling toevoegen aan de geoJSON
L.geoJSON(adamdata, {style: style}).addTo(map);

// Functie voor "mouseOver", er wordt een border gecreerd rondom de buurt waarover je hovered
// De border wordt naar voren gebracht zodat het beter te zien is, behalve in verouderde browsers
function createBorder(e) {
  var layer = e.target;

  layer.setStyle({
      weight: 5,
      color: '#FEC813',
      dashArray: '',
      fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
  }

  info.update(layer.feature.properties);
}

// In deze functie wordt de border gereset, deze functie zal voor "mouseOut" gebruikt worden
function removeBorder(e) {
  geojson.resetStyle(e.target);
  info.update();
}

// Deze functie zorgt ervoor dat er ingezoomd wordt op het target, deze zal voor "click" gebruikt worden
function zoomToClick(e) {
  map.fitBounds(e.target.getBounds());
}

// Hier koppelen we de vorige functies aan eventListeners zodat elke functie uitgevoerd wordt wanneer nodig
function onEachFeature(feature, layer) {
  layer.on({
      mouseover: createBorder,
      mouseout: removeBorder,
      click: zoomToClick
  });
}

// Hier wordt de benodigde styling daadwerkelijk toegevoegd aan de data
geojson = L.geoJSON(adamdata, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(map);



var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Bevolkingsdichtheid per wijk</h4>' +  (props ?
        '<b>' + props.Buurtnaam + '</b><br />' + props.Oppervlakte_m2 + ' people / mi<sup>2</sup>'
        : 'Hover over een buurt');
};

info.addTo(map);


/*=========================================

LEGENDA

=========================================*/


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [50000, 100000, 200000, 300000, 400000, 600000]
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);








var map1 = L.map("kaart1").setView([52.3546,4.9039], 12);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 15,
    minZoom: 11,
    id: 'voegdoe/ckyln76g82hnw15ql1m059kqh',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoidm9lZ2RvZSIsImEiOiJja3lrOHNkOWgyYzg5Mm5xaGUyZzNjaTBrIn0.ks4WYqbTFNJOrr8TQj8shw'
}).addTo(map1);


// geoJSON toevoegen aan de kaart
L.geoJSON(adamdata1).addTo(map1)


/*=========================================

STYLING 

=========================================*/

// Variabele die gebruikt gaat worden voor de styling 
let geojson1;

// Schaal voor de kleur adhv data
function getColor1(d1) {
  return d1 > 600000 ? '#003330' : //'#800026' :
         d1 > 500000  ? '#008f83' : //'#BD0026' :
         d1 > 400000  ? '#00d1c0' : //'#E31A1C' :
         d1 > 300000  ? '#14ffeb' : //'#FC4E2A' :
         d1 > 200000   ? '#57fff1' : //'#FD8D3C' : 
         d1 > 100000   ? '#99fff7' : //'#FEB24C' : hahaha
         d1 > 50000   ? '#dbfffc' : //'#FED976' :
                    '#ffffff';
}

// Functie die de stijl van de kaart definieert
function style1(feature1) {
  return {
      fillColor: getColor1(feature1.properties.Oppervlakte_m2),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.5
  };
}

// De nieuwe styling toevoegen aan de geoJSON
L.geoJSON(adamdata1, {style: style1}).addTo(map1);

// Functie voor "mouseOver", er wordt een border gecreerd rondom de buurt waarover je hovered
// De border wordt naar voren gebracht zodat het beter te zien is, behalve in verouderde browsers
function createBorder1(e) {
  var layer1 = e.target;

  layer1.setStyle({
      weight: 5,
      color: '#FEC813',
      dashArray: '',
      fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer1.bringToFront();
  }

  info1.update(layer1.feature.properties);
}

// In deze functie wordt de border gereset, deze functie zal voor "mouseOut" gebruikt worden
function removeBorder1(e) {
  geojson1.resetStyle(e.target);
  info1.update();
}

// Deze functie zorgt ervoor dat er ingezoomd wordt op het target, deze zal voor "click" gebruikt worden
function zoomToClick1(e) {
  map1.fitBounds(e.target.getBounds());
}

// Hier koppelen we de vorige functies aan eventListeners zodat elke functie uitgevoerd wordt wanneer nodig
function onEachFeature1(feature, layer1) {
  layer1.on({
      mouseover: createBorder1,
      mouseout: removeBorder1,
      click: zoomToClick1
  });
}

// Hier wordt de benodigde styling daadwerkelijk toegevoegd aan de data
geojson1 = L.geoJSON(adamdata1, {
  style: style,
  onEachFeature: onEachFeature1
}).addTo(map1);



var info1 = L.control();

info1.onAdd = function (map1) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info1.update = function (props1) {
    this._div.innerHTML = '<h4>Bevolkingsdichtheid per wijk</h4>' +  (props1 ?
        '<b>' + props1.Buurtnaam + '</b><br />' + props1.Oppervlakte_m2 + ' people / mi<sup>2</sup>'
        : 'Hover over een buurt');
};

info1.addTo(map1);


/*=========================================

LEGENDA

=========================================*/


var legend1 = L.control({position: 'bottomright'});

legend1.onAdd = function (map1) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades1  = [50000, 100000, 200000, 300000, 400000, 600000]
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades1[i] + (grades1[i + 1] ? '&ndash;' + grades1[i + 1] + '<br>' : '+');
    }

    return div;
};

legend1.addTo(map1);




