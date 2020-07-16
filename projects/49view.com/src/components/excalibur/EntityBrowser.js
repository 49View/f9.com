import {
  ButtonDiv,
  Div,
  DivBorder,
  Flex,
  Img100,
  Logo1TextSpan,
  Mx05,
  My05,
  My075,
  My25,
  SecondaryAltColorTextSpanBold
} from "../../futuremodules/reactComponentStyles/reactCommon.styled";
import {Badge, FormControl, InputGroup, Pagination, Tab, Tabs} from "react-bootstrap";
import React, {useState} from "react";
import {useQLEntityMeta} from "./ExcaliburLogic";

export const PaginationResultHeader = ({searchQuery, pageInfo, setPage}) => {
  const bNoPages = pageInfo.lastPage === 0;
  const bSinglePage = pageInfo.lastPage !== 0 && pageInfo.lastPage < 3;
  const bComplexPages = pageInfo.lastPage >= 3;
  let complexPageIndex1 = 0;
  let complexPageIndex2 = 0;
  let complexPageIndex3 = 0;
  if ( bComplexPages ) {
    const isFirstPage = pageInfo.page === 0;
    const isLastPage = pageInfo.page === pageInfo.lastPage;
    const lastPageOff = isLastPage ? -2 : -1;
    complexPageIndex1 = isFirstPage ? 1 : pageInfo.page + lastPageOff +1;
    complexPageIndex2 = complexPageIndex1 + 1;
    complexPageIndex3 = complexPageIndex2 + 1;
  }

  return <Flex width={"100%"} background={"var(--dark-color-transparent-text-readable)"}
               padding={bNoPages ? "8px" : "4px"}
               justifyContent={"center"} borderRadius={"4px"}>
    <Div>
      <SecondaryAltColorTextSpanBold>{pageInfo.totalCount}{" "}</SecondaryAltColorTextSpanBold>
      <Logo1TextSpan> {searchQuery}</Logo1TextSpan>
      <SecondaryAltColorTextSpanBold> available</SecondaryAltColorTextSpanBold>
    </Div>
    <Mx05/>
    <Pagination size={"sm"} className={"mb-0"} variant={"info"}>
      {bSinglePage &&
      Array.from(Array(pageInfo.lastPage + 1), (x, index) => index).map(elem =>
        <Pagination.Item key={elem} active={elem===pageInfo.page} onClick={ () => setPage(elem)}>
          {elem + 1}
        </Pagination.Item>)}
      {bComplexPages && <Pagination>
        <Pagination.First disabled={0 === pageInfo.page} onClick={ () => setPage(0)} />
        <Pagination.Prev disabled={!pageInfo.hasPreviousPage} onClick={ () => setPage(pageInfo.page-1)}/>

        <Pagination.Item active={pageInfo.page === complexPageIndex1-1} onClick={ () => setPage(complexPageIndex1-1)}>{complexPageIndex1}</Pagination.Item>
        <Pagination.Item active={pageInfo.page === complexPageIndex2-1} onClick={ () => setPage(complexPageIndex2-1)}>{complexPageIndex2}</Pagination.Item>
        <Pagination.Item active={pageInfo.page === complexPageIndex3-1} onClick={ () => setPage(complexPageIndex3-1)}>{complexPageIndex3}</Pagination.Item>

        <Pagination.Next disabled={!pageInfo.hasNextPage} onClick={ () => setPage(pageInfo.page+1)}/>
        <Pagination.Last disabled={pageInfo.lastPage === pageInfo.page} onClick={ () => setPage(pageInfo.lastPage)}/>
      </Pagination>
      }
    </Pagination>
  </Flex>
}

export const EntityBrowser = ({width, dispatch, refreshToken}) => {

  const [searchQuery, setSearchQuery] = useState(null);
  const [page, setPage] = useState(0);
  const [pageLimit,] = useState(8);
  const [group, setGroup] = useState("geom");
  const {entities, pageInfo} = useQLEntityMeta(searchQuery, group, page, pageLimit, refreshToken);

  console.log(pageInfo);

  return <>
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
      {pageInfo && pageInfo.totalCount > 0 &&
      <PaginationResultHeader searchQuery={searchQuery} pageInfo={pageInfo} setPage={setPage}/>
      }
    </Flex>

    <Flex flexDirection={"column"} flexWrap={"wrap"} height={"500px"} margin={"0"}
          alignItems={"flex-start"} alignContent={"flex-start"} justifyContent={"flex-start"}>
      {entities && entities.map(elem =>
        <DivBorder key={elem._id} variant={"info"} background={"var(--dark)"} padding={"4px"}
                   width={`calc((${width} - 30px) / 4 )`}
                   margin={"10px 10px 0 0"}>
          <ButtonDiv onClick={() => {
            window.Module.addScriptLine(`rr.addSceneObject("${elem.hash}", "${group}", false)`);
            dispatch(['loadEntity', elem]);
          }
          }>
            <Img100
              src={`https://${process.env.REACT_APP_EH_CLOUD_HOST}/media/entities/${elem.group}/${elem.thumb}`}></Img100>
          </ButtonDiv>
          <My25/>
          {elem.tags.map(tag => <Badge key={tag} variant={"secondary"} className={"m-1"}>{tag}</Badge>)}
          <My25/>
        </DivBorder>
      )}
    </Flex>
  </>
}
