import {SpanV} from "../../futuremodules/reactComponentStyles/reactCommon";
import {PHeader, PropertyCarouselDiv} from "./Property.styled";
import {Div, DivInlineFlex, Img100} from "../../futuremodules/reactComponentStyles/reactCommon.styled";
import React from "reactn";
import {useState} from "react";
import {Carousel} from "react-bootstrap";

const ControlledCarousel = ({property}) =>{
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

export const PropertyPhotographs = ({property}) => {
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
