import React from 'react';
import {
  ButtonBgDiv,
  Div,
  Flex,
  FlexVertical,
  H2,
  H3,
  HR, Img100,
  Img100Round,
  ImgRoundedCardH,
  InfoTextSpanBold,
  LightColorTextSpanBold,
  LightTextSpan,
  Logo1TextSpanBold, Mx1,
  My05, My1,
  My2,
  My25, SecondaryAltColorTextSpan,
  SecondaryAltColorTextSpanBold,
  Text
} from "../../../futuremodules/reactComponentStyles/reactCommon.styled";
import {AboutNominalContainer} from "../About.styled";
import BurnoutParadiseRemastered from "./burnout-paradise-remastered.jpg";
import NFSHotPursuit from "./nfs-hot-pursuit.jpg";
import WipeoutOmegaCollection from "./wipeout-omega-collection.jpg"
import BlackPlaystation from "./black-playstation.jpg"
import BurnoutParadiseOriginal from "./burnout-paradise-original.jpg"
import F12002 from "./f12002.jpg"
import RailSimulator from "./rail-simulator.jpg"
import WipeoutFusion from "./wipeout-fusion.jpg"
import PaperCamera from "./paper-camera-logo.png"
import PaperArtist from "./paper-artist-logo.png"
import Camera2 from "./camera2-logo.png"
import StarChart from "./star-chart.png"
import Nuclear from "./nuclear.jpeg"
import EALogo from "./electronic-arts-png-transparent-images-174937-6689788.png"
import CriterionLogo from "./Criterion_Games_Old_Logo.svg.png"
import PlaystationLogo from "./sony-playstation.jpeg"
import PsygnosisLogo from "./psygnosis.jpeg"
import JFDPLabs from "./jfdplabs-logo.png"
import F9View from "./49view_logo_text.png"
import GitHubLogo from "./github_logo.svg"
import {OverlayTrigger, Popover} from "react-bootstrap";

const popoverParadiseRemastered = (
  <Popover id="popover-basic">
    <Popover.Title as="h2">Burnout Paradise Remastered (2018)</Popover.Title>
    <Popover.Content>
      <InfoTextSpanBold>Electronic Arts, Guildford (UK)</InfoTextSpanBold>
      <p>
        <strong>Senior Graphics Programmer</strong>
      </p>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Rendering, lighting, materials and optimisation code
      <br/>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Lead graphics in core-tech team
    </Popover.Content>
  </Popover>
);

const popoverWipeoutOmega = (
  <Popover id="popover-basic">
    <Popover.Title as="h2">Burnout Paradise Remastered (2018)</Popover.Title>
    <Popover.Content>
      <InfoTextSpanBold>Electronic Arts, Guildford (UK)</InfoTextSpanBold>
      <p>
        <strong>Senior Graphics Programmer</strong>
      </p>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Rendering, lighting, materials and optimisation code
      <br/>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Lead graphics in core-tech team
    </Popover.Content>
  </Popover>
);

const AboutMainIncipit = () => {
  return (
    <AboutNominalContainer width={"65%"} padding={"25px 15px"} margin={"20px auto"}>
      <FlexVertical>
        <Flex height={"120px"} alignItems={"flex-start"} justifyContent={"flex-start"}>
          <Flex width={"100px"}>
            <Img100Round src={`/dado2.png`} alt={""}/>
          </Flex>
          <FlexVertical margin={"0 20px"} width={"100%"}>
            <H2 color={"var(--success)"}>Davide Dado Pirola</H2>
            <Text color={"var(--logo-color-1)"} fontSize={"var(--font-size-medium)"}>Le grand Fromage</Text>
            <My25/>
            <Div>
              <InfoTextSpanBold> Born 1975</InfoTextSpanBold>
              {" "}|{" "}
              <LightColorTextSpanBold>Knows every computer language</LightColorTextSpanBold>
              {" "}|{" "}
              <SecondaryAltColorTextSpanBold>Proud Dad</SecondaryAltColorTextSpanBold>
            </Div>
          </FlexVertical>
        </Flex>
        <Div width={"100%"}>
          <HR margin={"10px"}/>
        </Div>
        <Flex flexWrap={"wrap"}>
          <Text color={"var(--light)"}>
            <i className="fas fa-star fa-fw text-success"/>
            &nbsp; Spent 87.59% of my life programming, <Logo1TextSpanBold> AAA video-games </Logo1TextSpanBold>for the
            most part.
          </Text>
          <My05/>
          <Text color={"var(--light)"}>
            <i className="fas fa-star fa-fw text-success"/>
            &nbsp; Funded and bootstrapped several businesses, top turnover <InfoTextSpanBold>5 million US
            dollars</InfoTextSpanBold>.
          </Text>
          <My05/>
          <Text color={"var(--light)"}>
            <i className="fas fa-star fa-fw text-success"/>
            &nbsp; In-depth knowledge of <SecondaryAltColorTextSpanBold>web
            architectures</SecondaryAltColorTextSpanBold>,
            <SecondaryAltColorTextSpanBold> design
              patters </SecondaryAltColorTextSpanBold>and <SecondaryAltColorTextSpanBold>best
            practices</SecondaryAltColorTextSpanBold>.
          </Text>
        </Flex>
      </FlexVertical>
    </AboutNominalContainer>
  )
}

const CareerHighlightsVideoGames = () => {
  return (
    <AboutNominalContainer padding={"10px 15px 25px 20px"} margin={"30px auto"}>
      <FlexVertical>
        <Div>
          <H3 color={"var(--success)"}>Career Highlights - Videogames</H3>
        </Div>
        <Div width={"100%"}>
          <HR margin={"10px 0 20px 0"}/>
        </Div>
        <Flex>
          <Logo1TextSpanBold>Only major AAA titles listed</Logo1TextSpanBold>&nbsp;|&nbsp;
          <LightTextSpan>Spanning 20 years</LightTextSpan>&nbsp;|&nbsp;
          <SecondaryAltColorTextSpanBold> On every console/PC platform</SecondaryAltColorTextSpanBold>
        </Flex>
        <My2/>
        <Flex width={"100%"} justifyContent={"space-around"}>
          <OverlayTrigger trigger="click" placement="right" overlay={popoverParadiseRemastered}>
          <ImgRoundedCardH margin={"0 20px 0 0"} height={"256px"} src={BurnoutParadiseRemastered}
                           alt="Burnout Paradise Remastered"/>
          </OverlayTrigger>
          <OverlayTrigger trigger="click" placement="right" overlay={popoverWipeoutOmega}>
          <ImgRoundedCardH margin={"0 20px 0 0"} height={"256px"} src={WipeoutOmegaCollection}
                           alt="Wipeout Omega Collection"/>
          </OverlayTrigger>
          <ImgRoundedCardH margin={"0 20px 0 0"} height={"256px"} src={NFSHotPursuit} alt="Need for Speed Hot Pursuit"/>
          <ImgRoundedCardH margin={"0 20px 0 0"} height={"256px"} src={BlackPlaystation}
                           alt="BlackPlaystation"/>
        </Flex>
        <My2/>
        <Flex width={"100%"} justifyContent={"space-around"}>
          <ImgRoundedCardH margin={"0 20px 0 0"} height={"256px"} src={WipeoutFusion} alt="WipeoutFusion"/>
          <ImgRoundedCardH margin={"0 20px 0 0"} height={"256px"} src={BurnoutParadiseOriginal}
                           alt="BurnoutParadiseOriginal"/>
          <ImgRoundedCardH margin={"0 20px 0 0"} height={"256px"} src={F12002} alt="F12002"/>
          <ImgRoundedCardH margin={"0 20px 0 0"} height={"256px"} src={RailSimulator} alt="RailSimulator"/>
        </Flex>
      </FlexVertical>

    </AboutNominalContainer>
  )
}

const CareerHighlightsApps = () => {
  return (
    <AboutNominalContainer padding={"10px 15px 25px 20px"} margin={"30px auto"}>
      <FlexVertical>
        <Div>
          <H3 color={"var(--success)"}>Career Highlights - Apps</H3>
        </Div>
        <Div width={"100%"}>
          <HR margin={"10px 0 20px 0"}/>
        </Div>
        <Flex>
          <Logo1TextSpanBold>Only apps reaching top 3 spot listed</Logo1TextSpanBold>&nbsp;|&nbsp;
          <LightTextSpan>Over 5 million paid downloads</LightTextSpan>&nbsp;|&nbsp;
          <SecondaryAltColorTextSpanBold> Over 120 million app circulation, including
            pre-installs</SecondaryAltColorTextSpanBold>
        </Flex>
        <My2/>
        <Flex width={"100%"} justifyContent={"space-around"}>
          <ImgRoundedCardH margin={"0 20px 0 0"} height={"128px"} src={PaperCamera} alt="Burnout Paradise Remastered"/>
          <ImgRoundedCardH margin={"0 20px 0 0"} height={"128px"} src={PaperArtist} alt="Wipeout Omega Collection"/>
          <ImgRoundedCardH margin={"0 20px 0 0"} height={"128px"} src={Camera2} alt="Need for Speed Hot Pursuit"/>
        </Flex>
        <My2/>
        <Flex>
          <InfoTextSpanBold>Partnerships with other amazing developers:</InfoTextSpanBold>
        </Flex>
        <My2/>
        <Flex width={"100%"} justifyContent={"space-around"}>
          <ImgRoundedCardH margin={"0 20px 0 0"} height={"128px"} src={StarChart} alt="Burnout Paradise Remastered"/>
          <ImgRoundedCardH margin={"0 20px 0 0"} height={"128px"} src={Nuclear} alt="Wipeout Omega Collection"/>
        </Flex>
      </FlexVertical>
    </AboutNominalContainer>
  )
}

const CompaniesAndBusiness = () => {
  return (
    <AboutNominalContainer padding={"10px 15px 25px 20px"} margin={"30px auto"}>
      <FlexVertical>
        <Div>
          <H3 color={"var(--success)"}>Companies and business</H3>
        </Div>
        <Div width={"100%"}>
          <HR margin={"10px 0 20px 0"}/>
        </Div>
        <Flex>
          <Logo1TextSpanBold>Listing companies I've worked for more than 3 years.</Logo1TextSpanBold>
        </Flex>
        <My2/>
        <Flex width={"100%"} justifyContent={"space-around"}>
          <ImgRoundedCardH margin={"0 20px 0 0"} height={"128px"} src={EALogo} alt="Burnout Paradise Remastered"/>
          <ImgRoundedCardH margin={"0 20px 0 0"} height={"128px"} src={CriterionLogo} alt="Wipeout Omega Collection"/>
          <ImgRoundedCardH margin={"0 20px 0 0"} height={"128px"} src={PlaystationLogo} alt="Need for Speed Hot Pursuit"/>
          <ImgRoundedCardH margin={"0 20px 0 0"} height={"128px"} src={PsygnosisLogo} alt="Need for Speed Hot Pursuit"/>
        </Flex>
        <My2/>
        <Flex>
          <InfoTextSpanBold>Companies I've funded and bootstrapped (active)</InfoTextSpanBold>
        </Flex>
        <My2/>
        <Flex width={"100%"} justifyContent={"space-around"}>
          <ImgRoundedCardH margin={"0 20px 0 0"} height={"128px"} src={JFDPLabs} alt="Burnout Paradise Remastered"/>
          <ImgRoundedCardH margin={"0 20px 0 0"} height={"128px"} src={F9View} alt="Wipeout Omega Collection"/>
        </Flex>
      </FlexVertical>
    </AboutNominalContainer>
  )
}

const Personal = () => {
  return (
    <AboutNominalContainer padding={"10px 15px 25px 20px"} margin={"30px auto"}>
      <FlexVertical>
        <Div>
          <H3 color={"var(--success)"}>Personal</H3>
        </Div>
        <Div width={"100%"}>
          <HR margin={"10px 0 20px 0"}/>
        </Div>
        <Flex width={"100%"} justifyContent={"flex-start"}>
          <SecondaryAltColorTextSpan>GitHub account link</SecondaryAltColorTextSpan>
          <Mx1></Mx1>
          <Div height={"32px"}>
          <img width="32px" src={GitHubLogo} alt={"githubLogo"}/>
          </Div>
        </Flex>
      </FlexVertical>
    </AboutNominalContainer>
  )
}

const Dado = () => {
  return <>
    <AboutMainIncipit/>
    <CareerHighlightsVideoGames/>
    <CareerHighlightsApps/>
    <CompaniesAndBusiness/>
    <Personal></Personal>
  </>;
}

export default Dado;
