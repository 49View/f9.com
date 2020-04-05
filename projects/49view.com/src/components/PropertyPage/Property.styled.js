import styled from 'styled-components'

const mainPadding = "15px";
const wasmCanvasSize = { x: "720px", y: "540px" };

export const PropertyContainer = styled.div`{
  border: 1px solid #d1d1d110;
  height: 100vh;
  padding: 10px ${mainPadding};
  border-radius: 5px;
  background-image: linear-gradient(var(--dark-color), var(--dark-color-transparent-very) );
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.9), 0 4px 10px 0 rgba(0, 0, 0, 0.99);
  overflow: hidden;
}`;

export const PropertyTitleInfo = styled.div`{
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 5px;
}`;

export const PropertyTitleType = styled.div`{
  font-weight: bold;
  font-size: var(--font-size-lead);
}`;

export const PropertyTitlePrice = styled.div`{
  font-weight: bold;
  font-size: var(--font-size-lead);
  color: var(--logo-color-1);
  text-shadow: 0 0 3px #000000, 0 0 5px #202020;
}`;

export const PropertyTitleRentOrBuy = styled.div`{
  font-weight: bold;
  font-size: var(--font-size-medium);
  color: var(--primary-color-light);
  padding: 5px 5px;
  border-radius: 4px;
  border: solid 1px var(--primary-color-light);
  background-image: linear-gradient(
    rgba(23, 22, 24, 0.4),
    rgba(23, 22, 24, 0.2)
  );
}`;

export const PropertyTitleInfoSecondLine = styled.div`{
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--middle-grey-color);
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

export const PropertyStarOfTheShow = styled.div`{
  display: grid;
  margin-top: 20px;
  grid-gap: 10px;
  grid-template-columns: ${wasmCanvasSize.x} calc( var(--body-width) - ${mainPadding}*2 - ${wasmCanvasSize.x} - 10px );
  grid-template-rows: 100%;
}`;

export const PropertyCanvas = styled.div`{
  min-width: 640px;
  height: 480px;
  border-radius: 5px;
  background-image: linear-gradient(var(--dark-color), var(--dark-color-transparent-very) );
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.9), 0 4px 10px 0 rgba(0, 0, 0, 0.99);
}`;

export const PropertyRightMenu = styled.div`{
  display: flex;
  flex-direction: column;
}`;

export const PropertyMarketedBy = styled.div`{
  text-align: center;
  font-weight: bold;
  color: var(--light);
  margin-bottom: 10px;
}`;

export const PropertyManagingEstateAgent = styled.img`{
  background-color: white;
  object-fit: contain;
  padding: 3px;
  border-radius: 4px;
  border: solid 1px var(--info);
  margin-bottom: 10px;
}`;

export const PropertyVirtualBooking = styled.div`{
  display: flex;
  flex-direction: column;
  border-radius:4px;
  padding: 8px;
  border: solid 1px var(--info);
  background-image: linear-gradient(var(--background-color), var(--dark-color-transparent-very) );
}`;

export const PropertyVirtualBookingTitle = styled.div`{
  font-size: var(--font-size-medium);
  text-align: center;
  color: var(--light-color);
  font-weight: bold;
  margin-bottom: 10px;
}`;

export const PropertyVirtualBookingFooter = styled.div`{
  font-size: var(--font-size-normal);
  font-weight: bold;
  color: var(--light);
  margin-bottom: 10px;
  margin-top: 10px;
}`;

export const PropertyVirtualBookingCharCallVideo = styled.div`{
  display: flex;
  flex-direction: column;
}`;
