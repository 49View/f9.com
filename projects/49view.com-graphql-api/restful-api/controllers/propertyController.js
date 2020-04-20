// import * as cheerio from "cheerio";
const url = require('url');
const path = require('path');
const cheerio = require('cheerio');

const regexMatch = (regex, text, requiredMatches, matchIndex) => {

  //console.log("Search for "+matchIndex+" required "+requiredMatches, regex);
  let result = null;
  const matches = regex.exec(text);
  //if (matches!==null) console.log("Matches: ", matches.length);
  //console.log(matches);
  // let m;

  // while ((m = regex.exec(text)) !== null) {
  //     // This is necessary to avoid infinite loops with zero-width matches
  //     if (m.index === regex.lastIndex) {
  //         regex.lastIndex++;
  //     }

  //     // The result can be accessed through the `m`-variable.
  //     m.forEach((match, groupIndex) => {
  //         console.log(`Found match, group ${groupIndex}: ${match}`);
  //     });
  // }

  if (matches!==null && matches.length===requiredMatches) {
    console.log("FOUND");
    result = matches[matchIndex];
  } else {
    console.log("NOT FOUND");
  }
  return result;
}

const cleanString = (source) => {
  if (source!==null) {
    return source.replace(/\x0d/g,'').replace(/\x0a/g,'').replace(/\x09/g,'').replace(/[^\x00-\x7f]/g,"").trim();
  } else {
    return null;
  }
}

export const scrapeExcaliburFloorplan = (htmlUrl, htmlSource) => {

  let floorplansString;
  let floorplansArray;
  let imagesString;
  let imagesArray;
  let result;
  let regex;
  let latitude, longitude;

  result={
    name: null,
    addressLine1: null,
    description: null,
    price: null,
    priceReadable: null,
    priceUnity: null,
    floorplanUrl: null,
    images: null,
    location: null,
    keyFeatures: [],
    origin: htmlUrl
  };

  console.log(htmlSource);
  const html = cheerio.load(htmlSource);


  //
  // TITLE
  //
  console.log("TITLE SEARCH");
  result.name=cleanString(html('h1[class=fs-22]').text());

  //
  // ADDRESS
  //
  console.log("ADDRESS SEARCH");
  result.addressLine1=cleanString(html('h1[class=fs-22]').parent().find('address[itemprop=address]').text());

  //
  // DESCRIPTION
  //
  console.log("DESCRIPTION SEARCH");
  result.description=cleanString(html('p[itemprop=description]').text());

  //
  // PRICE
  //
  console.log("PRICE SEARCH");
  let price=cleanString(html('p[id=propertyHeaderPrice]').find('strong').text());
  result.priceReadable=price;
  result.priceUnity="pound";
  price=price.replace(/,/g,"").replace(/£/g,"").trim();
  if (isNaN(price)) {
    result.price=-1;
  } else {
    result.price=Number(price);
  }

  //
  //KEY FEATURES
  //
  console.log("KEY FEATURES");
  const kfElements = html("div[class='sect key-features'] > ul li");
  for (let i=0;i<kfElements.length;i++)
  {
    result.keyFeatures.push(cleanString( html(kfElements[i]).text() ) );
  }

  //
  // LATITUDE
  //
  //Extract string array from images:
  console.log("LATITUDE SEARCH");
  regex = /"latitude":(\-?\d*\.?\d*)/mg
  latitude=regexMatch(regex, htmlSource, 2, 1);

  //
  // LONGITUDE
  //
  //Extract string array from images:
  console.log("LONGITUDE SEARCH");
  regex = /"longitude":(\-?\d*\.?\d*)/mg
  longitude=regexMatch(regex, htmlSource, 2, 1);

  if (latitude!==null && longitude!==null) {
    result.location = {
      type: "Point",
      coordinates: [+longitude,+latitude]
    };
  }

  //
  // IMAGES
  //
  //Extract string array from images:
  console.log("IMAGES SEARCH");
  regex = /images[\s]*\:[\s]*(\[[^\]]+\])/mg
  imagesString = regexMatch(regex, htmlSource, 2, 1);
  if (imagesString!==null) {
    imagesArray = JSON.parse(imagesString);
    if (imagesArray!=null && imagesArray.constructor === Array) {
      result.images = imagesArray;
    }
  }

  //
  // FLOORPLAN
  //
  //Extract string array from zoomUrls
  console.log("FLOORPLAN TYPE 1 SEARCH");
  regex = /zoomUrls\:\s*(\[[^\]]+\])/mg
  floorplansString = regexMatch(regex, htmlSource, 2, 1);
  if (floorplansString!==null) {
    floorplansArray = JSON.parse(floorplansString);
    if (floorplansArray!=null && floorplansArray.constructor === Array) {
      result.floorplanUrl = floorplansArray[floorplansArray.length-1];
    }
  }
  if (result.floorplanUrl===null) {
    console.log("FLOORPLAN TYPE 2 SEARCH");
    regex = /<img[^>]+src="([^">]+)"[^>]*class="site-plan"/mg
    result.floorplanUrl = regexMatch(regex, htmlSource, 2, 1);
  }

  //console.log("Scraping result");
  //console.log(result);

  return result;
};
