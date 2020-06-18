"use strict";

import {propertyModel} from "../../models/property";
import {estateAgentModel} from "../../models/estate_agent";
import {trimLeft} from "csvtojson/v2/util";
import {saveImageFromUrl, writeImageFromData} from "./fsController";
import {getFileNameOnlyNoExt} from "eh_helpers";

const fetch = require('node-fetch');
const cheerio = require('cheerio');
const db = require('eh_db');
const md5 = require("md5");

const regexMatch = (regex, text, requiredMatches, matchIndex) => {

  //console.log("Search for "+matchIndex+" required "+requiredMatches, regex);
  let result = null;
  const matches = regex.exec(text);

  if (matches !== null && matches.length === requiredMatches) {
    console.log("FOUND");
    result = matches[matchIndex];
  } else {
    console.log("NOT FOUND");
  }
  return result;
};

const regExMatch101 = (regex, str) => {
  let m;
  let res = [];

  while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      res.push(match);
      // console.log(`Found match, group ${groupIndex}: ${match}`);
    });
  }

  return res;
};

const cleanString = (source) => {
  if (source !== null) {
    return source.replace(/\x0d/g, '').replace(/\x0a/g, '').replace(/\x09/g, '').replace(/[^\x00-\x7f]/g, "").trim();
  } else {
    return null;
  }
}

export const propertyAddressSplit = (address) => {
  const splitBy = ",";
  return address.split(splitBy).map(elem => trimLeft(elem));
}

const forSale = "for sale";
const toRent = "to rent";

const searchForSaleInString = name => {
  return name.toLowerCase().indexOf(forSale);
}

const searchToRentInString = name => {
  return name.toLowerCase().indexOf(toRent);
}

export const propertyNameSanitize = (name) => {
  const sale = searchForSaleInString(name);
  if (sale > 1) {
    return name.substring(0, sale - 1);
  }
  const rent = searchForSaleInString(name);
  if (rent > 1) {
    return name.substring(0, rent - 1);
  }
}

export const propertyForSaleOrToRent = (name) => {
  const sale = searchForSaleInString(name);
  if (sale >= 0) {
    return forSale;
  }
  const rent = searchToRentInString(name);
  if (rent >= 0) {
    return toRent;
  }

  return forSale;
}

const mainPropertyPath = () => {
  return "property";
}

const floorPlanUrlNameRule = (propertyId) => `${propertyId}_floorplan`;

const updatePropertyBinaries = async (result, propertyId) => {
  const mp = mainPropertyPath();
  const floorplanUrl = await saveImageFromUrl(result.floorplanUrl, mp, floorPlanUrlNameRule(propertyId));
  const thumbs = [];
  const images = [];
  let inc = 0;
  for (const elem of result.images) {
    const thumbUrl =
      await saveImageFromUrl(elem.thumbnailUrl, mp,
        () => `${propertyId}${elem.caption}_thumb_${inc}`);

    const imageUrl =
      await saveImageFromUrl(elem.masterUrl, mp,
        () => `${propertyId}${elem.caption}_image_${inc}`);
    inc++;
    thumbs.push(thumbUrl);
    images.push(imageUrl);
  }
  return {
    floorplanUrl,
    thumbs,
    images
  }
}

const updateEstateAgentFromExcalibur = async (result) => {
  const query = {
    address: result.estateAgentAddress,
    branch: result.estateAgentBranch,
    name: result.estateAgentName,
  };
  const checkExist = await estateAgentModel.findOne(query);
  if (!checkExist) {
    const ret = await db.upsert(estateAgentModel, query, query);

    // Save estate agent logo
    const filename = await saveImageFromUrl(result.estateAgentLogo, "estate_agent", () => `${ret._id}_logo`);

    // add logo link to estate agent
    await db.upsert(estateAgentModel, query, {logo: filename});

    return ret;
  }
  return checkExist.toObject();
}

export const scrapeExcaliburFloorplan = async (htmlUrl, userId, upsert) => {

  const origin = Buffer.from(htmlUrl).toString('base64');

  if (!(upsert === true) && await propertyModel.findOne({origin})) {
    return null;
  }
  const response = await fetch(htmlUrl);
  const htmlSource = await response.text();
  // const htmlSource = testHtml;


  let floorplansString;
  let floorplansArray;
  let imagesString;
  let imagesArray;
  let regex;
  let latitude, longitude;
  const result = {
    userId,
    origin: origin,
    status: "staging",
    estateAgentId: null,
    name: null,
    buyOrLet: forSale,
    addressLine1: null,
    addressLine2: null,
    addressLine3: null,
    description: null,
    price: [],
    priceReadable: null,
    priceUnity: null,
    location: null,
    keyFeatures: []
  };
  const estateAgent = {
    estateAgentName: null,
    estateAgentBranch: null,
    estateAgentAddress: null,
    estateAgentLogo: null
  };
  const binaries = {
    floorplanUrl: null,
    images: null
  };

  // console.log(htmlSource);
  const html = cheerio.load(htmlSource);

  //
  // ESTATE AGENT DETAILS
  //
  console.log("Estate Agent SEARCH");
  const estateAgemtScriptNode = html('script').map((i, x) => x.children[0]).filter((i, x) => x && x.data.match(/}\('branch',/)).get(0);
  const ea = regExMatch101(/(?=["])"(?:[^"\\]*(?:\\[\s\S][^"\\]*)*"|'[^'\\]*(?:\\[\s\S][^'\\]*)*')/gm, estateAgemtScriptNode.data);
  for (let t = 0; t < ea.length; t++) {
    if (ea[t].includes("brandName") && t + 1 < ea.length) {
      estateAgent.estateAgentName = ea[t + 1].slice(1, -1);
    }
    if (ea[t].includes("branchName") && t + 1 < ea.length) {
      estateAgent.estateAgentBranch = ea[t + 1].slice(1, -1);
    }
    if (ea[t].includes("displayAddress") && t + 1 < ea.length) {
      estateAgent.estateAgentAddress = ea[t + 1].slice(1, -1);
    }
  }
  // Logo
  estateAgent.estateAgentLogo = html('a[class=agent-details-agent-logo]').find('img').attr('src');

  //
  // TITLE
  //
  console.log("TITLE SEARCH");
  const propertyName = cleanString(html('h1[class=fs-22]').text());
  result.buyOrLet = propertyForSaleOrToRent(propertyName);
  result.name = propertyNameSanitize(propertyName);

  //
  // ADDRESS
  //
  console.log("ADDRESS SEARCH");
  const address = cleanString(html('h1[class=fs-22]').parent().find('address[itemprop=address]').text());
  const addressSplit = propertyAddressSplit(address);
  if (addressSplit.length >= 3) {
    [result.addressLine1, result.addressLine2, result.addressLine3] = addressSplit;
  }
  if (addressSplit.length === 2) {
    [result.addressLine1, result.addressLine2] = addressSplit;
  }
  if (addressSplit.length === 1) {
    [result.addressLine1] = addressSplit;
  }

  //
  // DESCRIPTION
  //
  console.log("DESCRIPTION SEARCH");
  result.description = html('p[itemprop=description]').html();

  //
  // PRICE
  //
  console.log("PRICE SEARCH");
  let price = cleanString(html('p[id=propertyHeaderPrice]').find('strong').text());
  result.priceReadable = price;
  result.priceUnity = "pound";
  price = price.replace(/,/g, "").replace(/£/g, "").trim();
  if (isNaN(price)) {
    result.price.push(-1);
  } else {
    result.price.push(Number(price));
  }

  //
  //KEY FEATURES
  //
  console.log("KEY FEATURES");
  const kfElements = html("div[class='sect key-features'] > ul li");
  for (let i = 0; i < kfElements.length; i++) {
    result.keyFeatures.push(cleanString(html(kfElements[i]).text()));
  }

  //
  // LATITUDE
  //
  //Extract string array from images:
  console.log("LATITUDE SEARCH");
  regex = /"latitude":(\-?\d*\.?\d*)/mg
  latitude = regexMatch(regex, htmlSource, 2, 1);

  //
  // LONGITUDE
  //
  //Extract string array from images:
  console.log("LONGITUDE SEARCH");
  regex = /"longitude":(\-?\d*\.?\d*)/mg
  longitude = regexMatch(regex, htmlSource, 2, 1);

  if (latitude !== null && longitude !== null) {
    result.location = {
      type: "Point",
      coordinates: [+longitude, +latitude]
    };
  }

  //
  // IMAGES
  //
  //Extract string array from images:
  console.log("IMAGES SEARCH");
  regex = /images[\s]*\:[\s]*(\[[^\]]+\])/mg
  imagesString = regexMatch(regex, htmlSource, 2, 1);
  if (imagesString !== null) {
    imagesArray = JSON.parse(imagesString);
    if (imagesArray != null && imagesArray.constructor === Array) {
      binaries.images = imagesArray;
    }
  }

  //
  // FLOORPLAN
  //
  //Extract string array from zoomUrls
  console.log("FLOORPLAN TYPE 1 SEARCH");
  regex = /zoomUrls\:\s*(\[[^\]]+\])/mg
  floorplansString = regexMatch(regex, htmlSource, 2, 1);
  if (floorplansString !== null) {
    floorplansArray = JSON.parse(floorplansString);
    if (floorplansArray != null && floorplansArray.constructor === Array) {
      binaries.floorplanUrl = floorplansArray[floorplansArray.length - 1];
    }
  }
  if (binaries.floorplanUrl === null) {
    console.log("FLOORPLAN TYPE 2 SEARCH");
    regex = /<img[^>]+src="([^">]+)"[^>]*class="site-plan"/mg
    binaries.floorplanUrl = regexMatch(regex, htmlSource, 2, 1);
  }

  // Save to DB
  const estateAgentDoc = await updateEstateAgentFromExcalibur(estateAgent);
  result.estateAgentId = estateAgentDoc._id;
  const propertyDoc = await upsert2(propertyModel, {origin: result.origin}, result);

  // Update property binaries
  const binaryDoc = await updatePropertyBinaries(binaries, propertyDoc._id);
  await propertyModel.updateOne({_id: propertyDoc._id}, binaryDoc);

  // Upsert the estate agent with the new property in its list
  await estateAgentModel.updateOne({_id: estateAgentDoc._id}, {$addToSet: {properties: propertyDoc._id}});

  return propertyDoc;
};

const upsert2 = async (model, query, data) => {
  try {
    return await model.findOneAndUpdate(query, data, {new: true, upsert: true});
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const upsertProperty = async (data) => {
  try {
    return await db.upsert(propertyModel, {_id: data._id}, data );
  } catch (e) {
    console.error(e);
    return null;
  }
}

export const createNewPropertyFromImage = async (data, filename, userId) => {
  const ea = await estateAgentModel.find().limit(1);
  const defaultProperty = new propertyModel({
    name: getFileNameOnlyNoExt(filename),
    status: "defaults",
    origin: filename + md5(data),
    buyOrLet: "for sale",
    addressLine1: "49",
    addressLine2: "View",
    addressLine3: "London",
    description: "A new property on the market",
    keyFeatures: ["Great location"],
    location: {type: "point", coordinates: [50.8, 0.08]},
    price: [437000],
    priceReadable: "437,000",
    priceUnity: "pound",
    floorplanUrl: "",
    thumbs: [""],
    images: [""],

    userId: userId,
    estateAgentId: ea[0].id,
  });
  const property = await propertyModel.create(defaultProperty);
  const floorplanUrl = await writeImageFromData(filename, mainPropertyPath(), data, floorPlanUrlNameRule(property._id) );
  const finalProperty = await db.upsert(propertyModel, {_id: property._id}, {floorplanUrl});

  return finalProperty.toObject();
}

export const listProperties = async (query, page, pageLimit) => {
  try {
    return await propertyModel.find(query).skip(Number(page * pageLimit)).limit(Number(pageLimit));
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getProperty = async id => {
  try {
    const propO = await propertyModel.findById(id);
    return propO.toObject();
  } catch (e) {
    console.error(e);
    return null;
  }
};
