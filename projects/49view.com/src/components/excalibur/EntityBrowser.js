import {
  ButtonDiv,
  Div,
  DivBorder,
  Flex,
  Img100,
  My1,
  My25
} from "../../futuremodules/reactComponentStyles/reactCommon.styled";
import {Badge, Button, FormControl, InputGroup} from "react-bootstrap";
import React, {useState} from "react";
import {useQLEntityMeta} from "./ExcaliburLogic";

export const EntityBrowser = ({width, dispatch, refreshToken}) => {

  const [searchQuery, setSearchQuery] = useState(null);
  const {entityMeta} = useQLEntityMeta(searchQuery, refreshToken);

  return <>
    <Flex width={width}>
      <InputGroup>
        <FormControl
          onChange={e => {
            e.preventDefault();
            setSearchQuery(e.target.value);
          }}
        />
      </InputGroup>
      <Div margin={"0 0 0 10px"}>
        <Button onClick={() => setSearchQuery(searchQuery)}>Geoms</Button>
      </Div>
      <Div margin={"0 0 0 10px"}>
        <Button>Materials</Button>
      </Div>
      <Div margin={"0 0 0 10px"}>
        <Button>Images</Button>
      </Div>
      <Div margin={"0 0 0 10px"}>
        <Button>Profiles</Button>
      </Div>
    </Flex>
    <My1/>
    <Flex flexDirection={"column"} flexWrap={"wrap"} height={"500px"} margin={"5px 0"}
          alignItems={"flex-start"} alignContent={"flex-start"} justifyContent={"flex-start"}>
      {entityMeta && entityMeta.map(elem =>
          <DivBorder variant={"info"} background={"var(--dark)"} padding={"4px"} width={`calc((${width} - 20px) / 3 )`}
                     margin={"10px 10px 0 0"}>
            <ButtonDiv onClick={() => {
              window.Module.addScriptLine(`rr.addSceneObject("${elem.hash}", "geom", false)`);
              dispatch(['loadEntity', elem]);
            }
            }>
              <Img100
                src={`https://${process.env.REACT_APP_EH_CLOUD_HOST}/media/entities/${elem.group}/${elem.thumb}`}></Img100>
            </ButtonDiv>
            <My25/>
            {elem.tags.map(tag => <Badge variant={"secondary"} className={"m-1"}>{tag}</Badge>)}
            <My25/>
          </DivBorder>
      )}
    </Flex>
  </>
}
