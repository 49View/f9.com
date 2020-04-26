import React from "reactn";
import "./Property.css";
import {PropertyNameAndPriceHeader} from "./PropertyNameAndPriceHeader";
import {
  EstateAgentRepAssistingText,
  EstateAgentRepDiv,
  EstateAgentRepIcon,
  EstateAgentRepMainNameTitle,
  PropertyCanvas,
  PropertyCarouselDiv,
  PropertyContainer,
  PropertyDescriptionDiv,
  PropertyHCaption,
  PropertyManagingEstateAgent,
  PropertyMarketedBy,
  PropertyRightMenu,
  PropertyStarOfTheShowDiv,
  PropertyTitleType,
  PropertyVirtualBooking
} from "./Property.styled";
import {
  AvatarRound,
  BadgeGroupVertical,
  Div,
  DivInlineFlex,
  DivRightBorder,
  Flex,
  HR,
  Img100,
  InfoTextSpanBold,
  LightColorTextSpan,
  LightColorTextSpanBold,
  My1,
  My2,
  Text,
  ULUnstyled
} from "../../futuremodules/reactComponentStyles/reactCommon.styled";
import WasmCanvas from "../../futuremodules/reactwasmcanvas/localreacwasmcanvas";
import VideoPhoneChat from "../../futuremodules/webrtc/components/VideoPhoneChat";
import {useQLProperty} from "./PropertyLogic";
import {SpinnerTopMiddle} from "../../futuremodules/spinner/Spinner";
import {useState} from "react";
import {Carousel} from "react-bootstrap";
import {FAIcon, SpanV} from "../../futuremodules/reactComponentStyles/reactCommon";

const PHeader = (props) => {
  return (
    <>
      <My2/>
      <HR/>
      <My1/>
      <PropertyHCaption>
        <PropertyTitleType>{props.children}</PropertyTitleType>
      </PropertyHCaption>
      <My1/>
    </>
  )
}

function ControlledCarousel({property}) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} fade interval={20000}>
      {property.images.map(elem => {
          return (
            <Carousel.Item>
              <img
                className="d-block w-100 rounded border border-dark"
                src={`https://localhost/media/${elem}`}
                alt={elem}
              />
            </Carousel.Item>
          )
        }
      )}
    </Carousel>
  );
}

const PropertyGeneralInformation = ({property}) => {
  return (
    <>
      <PHeader>
        General information:
      </PHeader>
      <PropertyDescriptionDiv>
        <DivRightBorder variant={"info"} padding={"5px 20px"}>
          <Text color={"var(--warning)"}><h3>In a nutshell</h3></Text>
          <My1/>
          <ULUnstyled>
            {property.keyFeatures.map(elem => {
              return (
                <>
                  <li key={elem}><strong>
                    <FAIcon icon={"dot-circle"} variant={"logo-color-1"}/>{" "}
                    {elem}
                  </strong>
                  </li>
                  <My1/>
                </>
              )
            })}
          </ULUnstyled>
        </DivRightBorder>
        <Div padding={"5px 20px"} margin={"10px 0"}>
          <Text color={"var(--warning)"}><h3>A few words...</h3></Text>
          <My1/>
          <Div fontSize={"var(--font-size-onemedium)"}
               dangerouslySetInnerHTML={{__html: property.description}}/>
        </Div>
      </PropertyDescriptionDiv>
    </>
  )
}

const PropertyPhotographs = ({property}) => {
  return (
    <>
      <PHeader>
        Photographs: (<SpanV variant={"logo-color-1"} text={property.thumbs.length}/>)
      </PHeader>
      <PropertyCarouselDiv>
        <ControlledCarousel property={property}/>
        <Div justifyContent={"flex-start"} overflowY={"scroll"} overflowX={"hide"} className={"shadow"}>
          {property.thumbs.map(thumb => {
              return (
                <DivInlineFlex width={"48%"} margin={"1%"}>
                  <Img100
                    className="d-block w-100 rounded border border-dark"
                    src={`https://localhost/media/${thumb}`}
                    alt={thumb}
                  />
                </DivInlineFlex>
              )
            }
          )}
        </Div>
      </PropertyCarouselDiv>
    </>
  )
}

export const EstateAgentRep = ({property}) => {
  return (
    <EstateAgentRepDiv>
      <EstateAgentRepIcon>
        <AvatarRound src={"/dado3.png"}/>
      </EstateAgentRepIcon>
      <EstateAgentRepMainNameTitle>
        <LightColorTextSpanBold>
          Dado,
        </LightColorTextSpanBold>
        <InfoTextSpanBold fontSize={"smaller"}>
          {" "}the big cheese
        </InfoTextSpanBold>
      </EstateAgentRepMainNameTitle>
      <EstateAgentRepAssistingText fontSize={"0.75rem"}>
        is looking after this property
      </EstateAgentRepAssistingText>
    </EstateAgentRepDiv>
    )
}

const PropertyStartOfTheShow = ({property}) => {
  let canvasContainer = React.useRef(null);
  const wasmDispatcher = null;//useGlobal(ReactWasm);
  const wwwPrefixToAvoidSSLMadness = process.env.REACT_APP_EH_CLOUD_HOST === 'localhost' ? "" : "www.";
  let wasmArgumentList = [`hostname=${wwwPrefixToAvoidSSLMadness}${process.env.REACT_APP_EH_CLOUD_HOST}`];

  return (
    <PropertyStarOfTheShowDiv>
      <PropertyCanvas ref={canvasContainer}>
        <WasmCanvas
          wasmName='../editor'
          dispatcher={wasmDispatcher}
          canvasContainer={canvasContainer.current}
          initialRect={{top: 0, left: 0, width: 0, height: 0}}
          initialVisibility={false}
          borderRadius={"5px"}
          border={"1px solid var(--middle-grey-color)"}
          argumentList={wasmArgumentList}
          mandatoryWebGLVersionSupporNumber="webgl2"
        />
      </PropertyCanvas>
      <PropertyRightMenu>
        <PropertyMarketedBy>
          <Flex justifyContent={"center"}>
            <div>
              <PropertyManagingEstateAgent src={`https://localhost/media/${property.estateAgent.logo}`}/>
            </div>
          </Flex>
        </PropertyMarketedBy>
        <BadgeGroupVertical alignItems={"center"} padding={"10px 0"} lineHeight={"1.2"} margin={"5px"}>
          <LightColorTextSpan fontSize={"var(--font-size-onemedium)"}>{property.estateAgent.name}</LightColorTextSpan>
          <Text bold color={"var(--logo-color-1)"} fontSize={"var(--font-size-normal)"}>{property.estateAgent.branch}</Text>
          <Text color={"var(--warning)"} fontSize={"var(--font-size-small)"}>{property.estateAgent.address}</Text>
        </BadgeGroupVertical>
        <PropertyVirtualBooking>
          {/*<EstateAgentRep/>*/}
            <VideoPhoneChat/>
        </PropertyVirtualBooking>
      </PropertyRightMenu>
    </PropertyStarOfTheShowDiv>
  )
}

export const Property = (props) => {
  const {match: {params}} = props;
  const {property} = useQLProperty(params.pid);

  if (!property) {
    return <SpinnerTopMiddle/>
  }

  return (
    <>
      <PropertyContainer>
        <PropertyNameAndPriceHeader property={property}/>
        <PropertyStartOfTheShow property={property}/>
        <PropertyGeneralInformation property={property}/>
        <PropertyPhotographs property={property}/>
      </PropertyContainer>
      <My2/>
    </>
  );
};
