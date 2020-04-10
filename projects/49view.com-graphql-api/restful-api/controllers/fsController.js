
exports.writeFile = (res, entity, data) => {
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

exports.writeError = (res, number, err, message) => {
  console.log("[ERROR-CAUGHT]");
  console.log(err, err.stack);
  res.status(number).send(message);
};
