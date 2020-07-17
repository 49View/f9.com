import React from "react";
import {DivTags} from "./Excalibur.styled";
import {
  Div,
  DivBorder,
  Flex,
  Img100,
  InfoTextSpanBold, LightColorTextSpan,
  Logo1TextSpan,
  My05,
  My1
} from "../../futuremodules/reactComponentStyles/reactCommon.styled";
import {useAddEntityTags, useRemoveEntityTag} from "./ExcaliburLogic";
import {Button} from "react-bootstrap";
import {useConfirmAlert} from "../../futuremodules/alerts/alerts";
import {api, useApi} from "../../futuremodules/api/apiEntryPoint";
import {deleteEntity} from "../../futuremodules/entities/entitiesApiCalls";
import {convertLength} from "../../futuremodules/utils/utils";

const ReactTags = require("react-tag-autocomplete");

export const EntityThumbnail = ({entity, refreshToken}) => {
  const imgLink = ( !entity.thumb || entity.thumb.length === 0 ) ? 'na.jpg' : `media/entities/${entity.group}/${entity.thumb}?${refreshToken}`;
  return <Img100 src={`https://${process.env.REACT_APP_EH_CLOUD_HOST}/${imgLink}`}/>;
}

export const EntityAndTags = ({entity, dispatch, refreshToken}) => {

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
      <Flex flexDirection={"column"} alignItems={"normal"}>
        <DivBorder>
          <EntityThumbnail entity={entity} refreshToken={refreshToken}/>
        </DivBorder>
        <Flex>
        <LightColorTextSpan fontSize={"var(--font-size-normal)"}>#{entity.hash}</LightColorTextSpan>
        </Flex>
        <My05/>
        {entity.group === "geom" && (
          <Div>
            <Flex>
              <Div><InfoTextSpanBold>W: </InfoTextSpanBold>{convertLength(entity.bboxSize[0])}</Div>
              <Div><InfoTextSpanBold>H: </InfoTextSpanBold>{convertLength(entity.bboxSize[1])}</Div>
              <Div><InfoTextSpanBold>D: </InfoTextSpanBold>{convertLength(entity.bboxSize[2])}</Div>
            </Flex>
            <My05/>
            <Button variant={"info"} block onClick={() => {
              dispatch(['refreshToken']);
              window.Module.addScriptLine(`rr.takeScreenShot()`)
            }}><i className="fa fa-camera fa-fw"/>&nbsp; Save Thumbnail</Button>
          </Div>)}
      </Flex>
      <My1/>
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
