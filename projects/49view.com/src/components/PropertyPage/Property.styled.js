import styled from 'styled-components'

export const PropertyContainer = styled.div`{
  //display: flex;
  width: 100%;
  border: 1px solid #d1d1d110;
  height: 100vh;
  padding: 10px 15px;
  border-radius: 4px;
  background-image: linear-gradient(var(--dark-color), var(--dark-color-transparent-very) );
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.9), 0 4px 10px 0 rgba(0, 0, 0, 0.99);
  //overflow: hidden;
}`;

export const PropertyTitleInfo = styled.div`{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 5px;
}`;

export const PropertyTitleInfoSecondLine = styled.div`{
  width: 100%;
  display: flex;
  justify-content: space-between;
}`;

export const PropertyTitleAddress = styled.div`{
  font-size: var(--font-size-one);
  color: var(--light);
}`;

export const PropertyTitleAddressRoad = styled.span`{
}`;

export const PropertyTitleAddressTown = styled.span`{
  font-weight: bold;
  color: var(--secondary-alt-color);
}`;

export const PropertyTitleAddressPostcode = styled.span`{
  font-weight: bold;
}`;
