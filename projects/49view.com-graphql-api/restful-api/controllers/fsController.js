import globalConfig  from "eh_config";
import fs from "fs";
import {getFileNameExt} from "eh_helpers";

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
  mkdir(mainPath);
  writeFile(filenamepath, data);
  return filenamepath;
}
