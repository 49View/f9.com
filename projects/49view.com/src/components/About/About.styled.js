import styled from "styled-components";

export const AboutNominalContainer = styled.div`{
  position:relative;
  width: ${props => props.width || "auto"} ;
  height: ${props => props.height || "auto"} ;
  margin: ${props => props.margin || "0"};
  padding: ${props => props.padding || "0"};
  text-align: left;
  font-size: 1rem;
  font-weight: bold;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid var(--dark);
  background-image: linear-gradient(var(--logo-color-2), var(--dark-color-transparent-text-readable) );
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.9), 0 4px 10px 0 rgba(0, 0, 0, 0.99);
    :hover {
    border: 1px solid var(--warning);
    box-shadow: 0 0 1px 1px var(--dark);
  }
  
  //:active {
  //  border: 1px solid var(--primary-color);
  //  border-radius: 8px;
  //  box-shadow: 0 0 2px 2px var(--info);
  //  background-color: var(--dark-color);
  //}
}`;
