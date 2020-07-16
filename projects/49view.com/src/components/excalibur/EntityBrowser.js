import {
  ButtonDiv,
  DivBorder,
  Flex,
  Img100,
  My05,
  My075,
  My25
} from "../../futuremodules/reactComponentStyles/reactCommon.styled";
import {Badge, FormControl, InputGroup, Tab, Tabs} from "react-bootstrap";
import React, {useState} from "react";
import {useQLEntityMeta} from "./ExcaliburLogic";
import {PaginationResults} from "../../futuremodules/pagination/Pagination";

export const EntityBrowser = ({width, dispatch, refreshToken}) => {

  const [searchQuery, setSearchQuery] = useState(null);
  const [page, setPage] = useState(0);
  const [pageLimit,] = useState(8);
  const [group, setGroup] = useState("geom");
  const {entities, pageInfo} = useQLEntityMeta(searchQuery, group, page, pageLimit, refreshToken);

  console.log(pageInfo);

  return <>
    <Flex width={width}>
      <Tabs defaultActiveKey={group} id="entity-browser-toolbar-tab" onSelect={k => {
        setGroup(k);
      }}>
        <Tab eventKey="geom" title="Objects">
        </Tab>
        <Tab eventKey="material" title="Materials">
        </Tab>
        <Tab eventKey="image" title="Images">
        </Tab>
        <Tab eventKey="profile" title="Profiles">
        </Tab>
      </Tabs>
    </Flex>
    <My05/>
    <Flex width={width}>
      <InputGroup>
        <FormControl
          onChange={e => {
            e.preventDefault();
            setPage(0);
            setSearchQuery(e.target.value);
          }}
        />
      </InputGroup>
    </Flex>
    <My075/>

    <Flex width={width}>
      <PaginationResults searchQuery={searchQuery} pageInfo={pageInfo} setPage={setPage}/>
    </Flex>

    <Flex flexDirection={"column"} flexWrap={"wrap"} height={"600px"} margin={"0"}
          alignItems={"flex-start"} alignContent={"flex-start"} justifyContent={"flex-start"}>
      {entities && entities.map(elem =>
        <DivBorder key={elem._id} variant={"info"} background={"var(--dark)"} padding={"4px"}
                   width={`calc((${width} - 30px) / 4 )`}
                   margin={"10px 10px 0 0"}>
          <ButtonDiv onClick={() => {
            window.Module.addScriptLine(`rr.addSceneObject("${elem.hash}", "${group}", false)`);
            dispatch(['loadEntity', elem]);
          }}>
            <Img100 src={`https://${process.env.REACT_APP_EH_CLOUD_HOST}/media/entities/${elem.group}/${elem.thumb}`}/>
          </ButtonDiv>
          <My25/>
          {elem.tags.map(tag => <Badge key={tag} variant={"secondary"} className={"m-1"}>{tag}</Badge>)}
          <My25/>
        </DivBorder>
      )}
    </Flex>
  </>
}
