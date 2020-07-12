import React from "react";
import {DivTags} from "./Excalibur.styled";
import {
  Div,
  DivBorder,
  Logo1TextSpan,
  Mx05,
  My05,
  My1
} from "../../futuremodules/reactComponentStyles/reactCommon.styled";
import {useAddEntityTags, useRemoveEntityTag} from "./ExcaliburLogic";
import {Button} from "react-bootstrap";
// import {addTagsToEntity} from "../../../actions/entities";
// import {useGetCurrentEntity} from "../../../futuremodules/entities/entitiesAccessors";
const ReactTags = require("react-tag-autocomplete");

export const EntityAndTags = ({entity, dispatch}) => {

  const addEntityTag = useAddEntityTags();
  const removeEntityTag = useRemoveEntityTag();

  const tagsObject = [];
  for (let i = 0; i < entity.tags.length; i++) {
    tagsObject.push({id: i, name: entity.tags[i]});
  }
  const suggestions = [
    'floor',
    'wall',
    'kitchen',
    'bathroom',
    'livingroom',
    'wood',
    'metal',
    'carpet',
    'fabric',
    'concrete',
    'sofa',
    'chair',
    'armchair',
    'modern',
    'futuristic',
    'contemporary',
    'art-deco',
    'antique',
    '60s'
  ]
  const suggestionsObject = [];
  for (let i = entity.tags.length; i < entity.tags.length + suggestions.length; i++) {
    suggestionsObject.push({id: i, name: suggestions[i-entity.tags.length]});
  }

  return (
    <DivBorder margin={"10px 0"} padding={"10px"} overflowX={"hidden"}>
      <Logo1TextSpan>
        {entity.name}
      </Logo1TextSpan>
      <My05/>
      <My1/>
      <DivTags>
        <i className="fas fa-tags"> </i> Tags
        <a className="px-2" onClick={() => addEntityTag(entity._id, entity.name.split(/[\s,._]+/), dispatch)} href="#!">
          <i className="fas fa-redo"/>
        </a>
        <My05/>
        <ReactTags
          tags={tagsObject}
          suggestions={suggestionsObject}
          handleDelete={(i) => removeEntityTag(entity._id, tagsObject[i].name, dispatch)}
          handleAddition={(tag) => addEntityTag(entity._id, [tag.name], dispatch)}
          allowNew={true}
        />
      </DivTags>
      <Div margin={"5px"}>
      {suggestions.map( elem=> {
        return (<><Button onClick={() => addEntityTag(entity._id, [elem], dispatch)}>{elem}</Button><Mx05/></>)
      })}
      </Div>
    </DivBorder>
  );
};
