import {PHeader, PropertyDescriptionDiv} from "./Property.styled";
import {
  Div,
  DivRightBorder,
  My1,
  My2,
  Text,
  ULUnstyled
} from "../../futuremodules/reactComponentStyles/reactCommon.styled";
import {FAIcon} from "../../futuremodules/reactComponentStyles/reactCommon";
import React from "reactn";

export const PropertyGeneralInformation = ({property}) => {
  return (
    <>
      <PHeader>
        General information:
      </PHeader>
      <PropertyDescriptionDiv>
        <DivRightBorder variant={"info"} padding={"5px 20px"}>
          <Text color={"var(--warning)"}><h3>In a nutshell</h3></Text>
          <My2/>
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
          <My2/>
          <Div fontSize={"var(--font-size-onemedium)"}
               dangerouslySetInnerHTML={{__html: property.description}}/>
        </Div>
      </PropertyDescriptionDiv>
    </>
  )
}
