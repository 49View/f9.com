import {SpanV} from "../../futuremodules/reactComponentStyles/reactCommon";
import {carouselHeight, PHeader, PropertyCarouselDiv} from "./Property.styled";
import {Div, DivInlineFlex, ImgCover} from "../../futuremodules/reactComponentStyles/reactCommon.styled";
import React from "reactn";
import {useState} from "react";
import {Carousel} from "react-bootstrap";
import {mapEntries} from "../../futuremodules/utils/utils";

const ControlledCarousel = ({property, index, setIndex}) =>{

  return (
    <Carousel activeIndex={index} onSelect={(e) => setIndex(e)} fade interval={20000}>
      {property.images.map(elem => {
          return (
            <Carousel.Item key={elem}>
              <ImgCover height={carouselHeight}
                className="rounded border border-dark"
                src={`https://${process.env.REACT_APP_EH_CLOUD_HOST}/media/${elem}`}
                alt={elem}
              />
            </Carousel.Item>
          )
        }
      )}
    </Carousel>
  );
}

export const PropertyPhotographs = ({property}) => {
  const [index, setIndex] = useState(0);

  return (
    <>
      <PHeader>
        Photographs: (<SpanV variant={"logo-color-1"} text={property.thumbs.length}/>)
      </PHeader>
      <PropertyCarouselDiv>
        <ControlledCarousel property={property} index={index} setIndex={setIndex}/>
        <Div justifyContent={"flex-start"} overflowY={"scroll"} overflowX={"hide"} className={"shadow"}>
          {mapEntries(property.thumbs, (k, thumb) => {
              return (
                <DivInlineFlex key={thumb} width={"48%"} margin={"1%"} cursor={"pointer"}
                onClick={() => setIndex(parseInt(k))}>
                  <ImgCover
                    className="d-block w-100 rounded border border-dark"
                    src={`https://${process.env.REACT_APP_EH_CLOUD_HOST}/media/${thumb}`}
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
