import {shaderModel} from "../../models/shader";
const db = require("eh_db");

const shaderVersion = "1.0";

export const writeShaderFile = async content => {
  const prev = await shaderModel.findOne({});
  let id = "";
  if ( prev ) {
    const po = prev.toObject();
    id = po._id;
  }
  return await db.upsert(shaderModel, {_id: id}, content);
};

export const readShaderFile = async () => {
  const shaderO = await shaderModel.findOne();
  const shader = shaderO.toObject();
  return shader;
};

