import {Div, Flex} from "../../futuremodules/reactComponentStyles/reactCommon.styled";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import React, {useState} from "react";
import {useQLEntityMeta} from "./ExcaliburLogic";

export const EntityBrowser = ({width}) => {

  const [searchQuery, setSearchQuery] = useState(null);
  const {entityMeta} = useQLEntityMeta(searchQuery);

  return <>
    <Flex width={width}>
      <InputGroup>
        <FormControl
          onKeyUp={(evt) => {
            if ((evt.keyCode === 13 || evt.keyCode === 14)) {
              setSearchQuery(evt.target.value);
            }
          }}
        />
      </InputGroup>
      <Div margin={"0 0 0 10px"}>
        <Button>Geoms</Button>
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
    <Flex>
      {entityMeta && entityMeta.map( elem=> {
        return elem.name;
      })}
    </Flex>
  </>
}
