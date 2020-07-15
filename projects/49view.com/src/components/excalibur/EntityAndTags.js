import React from "react";
import {DivTags} from "./Excalibur.styled";
import {Div, DivBorder, Img100, Logo1TextSpan, My05} from "../../futuremodules/reactComponentStyles/reactCommon.styled";
import {useAddEntityTags, useRemoveEntityTag} from "./ExcaliburLogic";
import {Button} from "react-bootstrap";
import {useConfirmAlert} from "../../futuremodules/alerts/alerts";
import {api, useApi} from "../../futuremodules/api/apiEntryPoint";
import {deleteEntity} from "../../futuremodules/entities/entitiesApiCalls";
const ReactTags = require("react-tag-autocomplete");

export const EntityAndTags = ({entity, dispatch}) => {

  const addEntityTag = useAddEntityTags();
  const removeEntityTag = useRemoveEntityTag();
  const deleteObject = useConfirmAlert();
  const entityManager = useApi('entities');

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
    suggestionsObject.push({id: i, name: suggestions[i - entity.tags.length]});
  }

  return (
    <Div margin={"10px 0"} overflowX={"hidden"}>
      <Div wordWrap={"break-word"}>
        <Logo1TextSpan>
          {entity.name}
        </Logo1TextSpan>
      </Div>
      <My05/>
      <DivBorder>
        {entity.thumb && <Img100 width={"128px"}
                                 src={`https://${process.env.REACT_APP_EH_CLOUD_HOST}/media/entities/${entity.group}/${entity.thumb}`}/>}
      </DivBorder>
      <My05/>
      <DivTags>
        <i className="fas fa-tags"/> Tags
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
      <My05/>
      <Button variant={"danger"} block onClick={() => deleteObject(entity.name, () => {
        api(entityManager, deleteEntity, entity._id).then(r => {
          dispatch(['reset']);
          window.Module.addScriptLine(`rr.clear()`);
        });
      })}>
        <i className="fa fa-trash fa-fw"/>&nbsp; Delete
      </Button>
    </Div>
  );
};
