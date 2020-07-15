import {Div, Flex} from "../../futuremodules/reactComponentStyles/reactCommon.styled";
import {Button, Card, CardDeck, FormControl, InputGroup} from "react-bootstrap";
import React, {useState} from "react";
import {useQLEntityMeta} from "./ExcaliburLogic";

export const EntityBrowser = ({width}) => {

  const [searchQuery, setSearchQuery] = useState(null);
  const {entityMeta} = useQLEntityMeta(searchQuery);

  return <>
    <Flex width={width}>
      <InputGroup>
        <FormControl
          onChange={e => setSearchQuery(e.target.value)}
          // onKeyUp={(evt) => {
          //   if ((evt.keyCode === 13 || evt.keyCode === 14)) {
          //     setSearchQuery(evt.target.value);
          //   }
          // }}
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
    <Flex flexWrap={"wrap"}>
      <CardDeck>
      {entityMeta && entityMeta.map(elem =>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" width={"128px"} src={`https://${process.env.REACT_APP_EH_CLOUD_HOST}/media/entities/${elem.group}/${elem.thumb}`} />
          <Card.Body>
            <Card.Title>{elem.name}</Card.Title>
            <Card.Text>
              {elem.hash}
            </Card.Text>
            <Button onClick={ () =>
              window.Module.addScriptLine(`rr.addSceneObject("${elem.hash}", "geom", false)`)
            }>Open</Button>
          </Card.Body>
        </Card>
      )}
      </CardDeck>
    </Flex>
  </>
}
