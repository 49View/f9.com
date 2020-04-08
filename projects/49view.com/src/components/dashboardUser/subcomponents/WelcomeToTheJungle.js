import React, {withGlobal} from "reactn";
import {getAuthUserName} from "../../../futuremodules/auth/authAccessors";
import {
  LightColorTextSpan,
  SecondaryAltColorTextSpanBold
} from "../../../futuremodules/reactComponentStyles/reactCommon.styled";

const WelcomeToTheJungle = (props) => {

  const name = getAuthUserName(props.auth);

  return (
    <div>
      <LightColorTextSpan fontSize={"var(--font-size-medium)"}>Hello, </LightColorTextSpan>{" "}
      <SecondaryAltColorTextSpanBold fontSize={"var(--font-size-large)"}>
          {name}
      </SecondaryAltColorTextSpanBold>
    </div>
  )
}

export default withGlobal(
  global => ({
    auth: global.auth,
  }),
)(WelcomeToTheJungle);
