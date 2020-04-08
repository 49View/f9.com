import styled from 'styled-components'

const mainPadding = "15px";

export const DashboardUserInnerMargins = styled.div` {
  margin: 30px 0px 15px;
}`;

export const DashboardUserFragment = styled.div` {
  padding: 10px ${mainPadding};
  min-height: 640px;
  border-radius: 5px;
  background-image: linear-gradient(var(--dark-color), var(--dark-color-transparent-very) );
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.9), 0 4px 10px 0 rgba(0, 0, 0, 0.99);
  overflow: hidden;
  margin-top: 20px;
}`;
