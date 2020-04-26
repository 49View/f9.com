import React from "reactn";
import "./Property.css";
import {PropertyLayout} from "./PropertyLayout";
import {
  EstateAgentRep,
  EstateAgentRepAssistingText,
  EstateAgentRepIcon,
  EstateAgentRepMainNameTitle,
  PropertyCanvas,
  PropertyCarousel,
  PropertyContainer, PropertyDescription, PropertyHCaption,
  PropertyManagingEstateAgent,
  PropertyMarketedBy,
  PropertyRightMenu,
  PropertyStarOfTheShow, PropertyTitleInfo, PropertyTitlePrice, PropertyTitleType,
  PropertyVirtualBooking,
  PropertyVirtualBookingCharCallVideo
} from "./Property.styled";
import {
  AvatarRound,
  Div,
  Div50, DivInlineFlex,
  Flex,
  HR,
  Img100,
  InfoTextSpan,
  LightColorTextSpanBold,
  My1,
  My2
} from "../../futuremodules/reactComponentStyles/reactCommon.styled";
import WasmCanvas from "../../futuremodules/reactwasmcanvas/localreacwasmcanvas";
import VideoPhoneChat from "../../futuremodules/webrtc/components/VideoPhoneChat";
import {getLocalePropertyPrice, useQLProperty} from "./PropertyLogic";
import {SpinnerTopMiddle} from "../../futuremodules/spinner/Spinner";
import {Fragment, useState} from "react";
import {Carousel} from "react-bootstrap";

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

export const Property = (props) => {
  let canvasContainer = React.useRef(null);
  const wasmDispatcher = null;//useGlobal(ReactWasm);
  const wwwPrefixToAvoidSSLMadness = process.env.REACT_APP_EH_CLOUD_HOST === 'localhost' ? "" : "www.";
  let wasmArgumentList = [`hostname=${wwwPrefixToAvoidSSLMadness}${process.env.REACT_APP_EH_CLOUD_HOST}`];
  const {match: {params}} = props;

  const {property} = useQLProperty(params.pid);

  if (!property) {
    return <SpinnerTopMiddle/>
  }

  console.log("Property:", property);

  return (
    <>
      <PropertyContainer>
        <PropertyLayout property={property}/>
        <PropertyStarOfTheShow>
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
            <PropertyVirtualBooking>
              <EstateAgentRep>
                <EstateAgentRepIcon>
                  <AvatarRound src={"/dado3.png"}/>
                </EstateAgentRepIcon>
                <EstateAgentRepMainNameTitle>
                  <LightColorTextSpanBold>
                    Dado,
                  </LightColorTextSpanBold>
                  <InfoTextSpan fontSize={"smaller"}>
                    {" "}the big cheese
                  </InfoTextSpan>
                </EstateAgentRepMainNameTitle>
                <EstateAgentRepAssistingText fontSize={"0.75rem"}>
                  is looking after this property
                </EstateAgentRepAssistingText>
              </EstateAgentRep>
              <PropertyVirtualBookingCharCallVideo>
                <VideoPhoneChat/>
              </PropertyVirtualBookingCharCallVideo>
            </PropertyVirtualBooking>
          </PropertyRightMenu>
        </PropertyStarOfTheShow>


        <My2/>
        <HR/>
        <My1/>
        <PropertyHCaption>
          <PropertyTitleType>General information:</PropertyTitleType>
        </PropertyHCaption>
        <My2/>
        <PropertyDescription>
          <Div padding={"20px"} fontSize={"var(--font-size-onemedium)"} dangerouslySetInnerHTML={{ __html: property.description }} />
          <Div></Div>
        </PropertyDescription>


        <My2/>
        <HR/>
        <My1/>
        <PropertyHCaption>
          <PropertyTitleType>Photographs: ({property.thumbs.length})</PropertyTitleType>
        </PropertyHCaption>
        <My1/>
        <PropertyCarousel>
          <ControlledCarousel property={property}/>
          <Div justifyContent={"flex-start"}  overflowY={"scroll"} overflowX={"hide"} className={"shadow"}>
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
        </PropertyCarousel>
      </PropertyContainer>
      <My2/>
    </>
  );
};
