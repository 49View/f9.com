import React from "reactn";
import "./Property.css";
import {PropertyLayout} from "./PropertyLayout";
import {
  EstateAgentRep,
  EstateAgentRepAssistingText,
  EstateAgentRepIcon,
  EstateAgentRepMainNameTitle,
  PropertyCanvas,
  PropertyContainer,
  PropertyManagingEstateAgent,
  PropertyMarketedBy,
  PropertyRightMenu,
  PropertyStarOfTheShow,
  PropertyVirtualBooking,
  PropertyVirtualBookingCharCallVideo
} from "./Property.styled";
import {
  AvatarRound,
  InfoTextSpan,
  LightColorTextSpanBold
} from "../../futuremodules/reactComponentStyles/reactCommon.styled";
import WasmCanvas from "../../futuremodules/reactwasmcanvas/localreacwasmcanvas";
import VideoPhoneChat from "../../futuremodules/webrtc/components/VideoPhoneChat";
import {useQLProperty} from "./PropertyLogic";
import {SpinnerTopMiddle} from "../../futuremodules/spinner/Spinner";

export const Property = (props) => {
  let canvasContainer = React.useRef(null);
  const wasmDispatcher = null;//useGlobal(ReactWasm);
  const wwwPrefixToAvoidSSLMadness = process.env.REACT_APP_EH_CLOUD_HOST === 'localhost' ? "" : "www.";
  let wasmArgumentList = [`hostname=${wwwPrefixToAvoidSSLMadness}${process.env.REACT_APP_EH_CLOUD_HOST}`];
  const { match: { params } } = props;

  const {property} = useQLProperty(params.pid);

  if ( !property ) {
    return <SpinnerTopMiddle/>
  }

  console.log("Property:", property);

  return (
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
            <PropertyManagingEstateAgent src={"/andrew-scott-robertson-logo.png"} width={"244"} height={"72"}/>
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
          </PropertyMarketedBy>
        </PropertyRightMenu>
      </PropertyStarOfTheShow>
    </PropertyContainer>
  );
};
