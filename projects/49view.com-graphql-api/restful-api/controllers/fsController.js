import globalConfig  from "eh_config";
import fs from "fs";
import md5 from "md5"
import {getFileNameExt, getFileNameOnlyNoExt} from "eh_helpers";
import fetch from "node-fetch";

exports.writeResFile = (res, entity, data) => {
  res
    .status(200)
    .set({
      "Content-Type": entity.contentType,
      "Content-Last-Modified": entity.lastUpdatedDate,
      "ETag": entity.hash,
      "Content-Length": data.length
    })
    .send(data);
};

export const readFile = (mainPath, filename) => {
  return fs.readFileSync(`${globalConfig.FileRoot}media/media/${mainPath}/${filename}`);
}

export const writeFile = (filename, data) => {
  fs.writeFileSync(`${globalConfig.FileRoot}media/media/${filename}`, data);
}

export const mkdir = (dirpath) => {
  fs.mkdirSync(`${globalConfig.FileRoot}media/media/${dirpath}`, {recursive:true});
}

export const existsFile = (filename) => {
  return fs.existsSync(`${globalConfig.FileRoot}media/media/${filename}`);
}

export const saveImageFromUrl = async (sourceUrl, mainPath, fileNameRule) => {
  const fext = getFileNameExt(sourceUrl);
  const fres = await fetch(sourceUrl);
  const data = await fres.buffer();
  const filename = `${mainPath}/${fileNameRule()}.${fext}`;
  mkdir(mainPath);
  writeFile(filename, data);
  return filename;
}

export const writeFileComplete = async (data, mainPath, filename) => {
  const filenamepath = `${mainPath}/${filename}`;
  if ( mainPath.length > 0 ) mkdir(mainPath);
  writeFile(filenamepath, data);
  return filenamepath;
}

export const writeFileCompleteInsertNewNameIfExists = async (data, mainPath, filename) => {
  let filenamepath = `${mainPath}/${filename}`;
  const fnameOnly = getFileNameOnlyNoExt(filename);
  let fext = getFileNameExt(filename);
  if ( fext ) fext = "."+fext;
  mkdir(mainPath);

  // Check if file exists _and_ it's the same file (hash)
  if ( existsFile(filenamepath) ) {
    const filedata = await readFile(mainPath, filename);
    if ( md5(data) === md5(filedata) ) {
      console.log("Files are exactly the same, proceeded with passthrough");
      return filenamepath;
    }
  }

  let numCopies = 0;
  while ( existsFile(filenamepath) ) {

    numCopies++;
    const appends="_copy"+numCopies.toString();
    filenamepath = `${mainPath}/${fnameOnly}${appends}${fext}`;
  }
  writeFile(filenamepath, data);
  return filenamepath;
}
