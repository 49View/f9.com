import globalConfig  from "eh_config";
import fs from "fs";

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

export const writeFile = (filename, data) => {
  fs.writeFile(`${globalConfig.FileRoot}media/media/${filename}`, data, (err) => {
    if (err) return console.log(err);
  });
}

export const mkdir = (dirpath) => {
  fs.mkdirSync(`${globalConfig.FileRoot}media/media/${dirpath}`, {recursive:true});
}

