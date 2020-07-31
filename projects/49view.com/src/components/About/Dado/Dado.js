import React from 'react';
import {
  Div,
  Flex,
  FlexVertical,
  H2,
  H3,
  HR,
  Img100Round,
  ImgRoundedCardH,
  InfoTextSpanBold,
  LightColorTextSpanBold,
  LightTextSpan,
  Logo1TextSpanBold,
  Mx1,
  My05,
  My2,
  My25,
  SecondaryAltColorTextSpan,
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
import OculusLogo from "./oculus_horizontal.svg"
import {OverlayTrigger, Popover} from "react-bootstrap";
import { Timeline, TimelineItem }  from 'vertical-timeline-component-for-react';

const popoverParadiseRemastered = (
  <Popover id="popover-basic">
    <Popover.Title as="h2">Burnout Paradise Remastered (2018)</Popover.Title>
    <Popover.Content>
      <InfoTextSpanBold>Electronic Arts, Guildford (UK)</InfoTextSpanBold>
      <p>
        <strong>Senior/Lead Graphics Programmer</strong>
      </p>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Rendering Material code architecture
      <br/>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Lighting and color grading
      <br/>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Special effects and Camera tech
      <br/>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; In-game data management platform
      <br/>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Lead graphics, core team
    </Popover.Content>
  </Popover>
);

const popoverParadise = (
  <Popover id="popover-basic">
    <Popover.Title as="h2">Burnout Paradise (2008)</Popover.Title>
    <Popover.Content>
      <InfoTextSpanBold>Electronic Arts, Guildford (UK)</InfoTextSpanBold>
      <p>
        <strong>Senior/Lead Graphics Programmer</strong>
      </p>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Rendering Material code architecture
      <br/>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Lighting and color grading
      <br/>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Special effects and Camera tech
      <br/>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Lead graphics, core team
      <br/>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; In-game data management platform
    </Popover.Content>
  </Popover>
);

const popoverBlack = (
  <Popover id="popover-basic">
    <Popover.Title as="h2">Black (2006)</Popover.Title>
    <Popover.Content>
      <InfoTextSpanBold>Electronic Arts, Guildford (UK)</InfoTextSpanBold>
      <p>
        <strong>Senior Graphics Programmer</strong>
      </p>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Rendering code architecture
      <br/>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Lighting and color grading
      <br/>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Special effects code
      <br/>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; In-game data management platform
    </Popover.Content>
  </Popover>
);

const popoverNFS = (
  <Popover id="popover-basic">
    <Popover.Title as="h2">Need for Speed Hot Pursuit (2010)</Popover.Title>
    <Popover.Content>
      <InfoTextSpanBold>Electronic Arts, Guildford (UK)</InfoTextSpanBold>
      <p>
        <strong>Senior Graphics Programmer</strong>
      </p>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Rendering code architecture
      <br/>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; In-project management tech
      <br/>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Special effects code
      <br/>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Camera/Photo mode tech
      <br/>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; In-game data management platform
    </Popover.Content>
  </Popover>
);

const popoverWipeoutOmega = (
  <Popover id="popover-basic">
    <Popover.Title as="h2">WipEout Omega Collection (2017)</Popover.Title>
    <Popover.Content>
      <InfoTextSpanBold>Sony Playstation Europe, Liverpool (UK)</InfoTextSpanBold>
      <p>
        <strong>Senior Graphics Programmer</strong>
      </p>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Rendering code architecture
      <br/>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Lighting and color grading
      <br/>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Special effects programming
    </Popover.Content>
  </Popover>
);

const popoverWipEoutFusion = (
  <Popover id="popover-basic">
    <Popover.Title as="h2">WipEout Fusion (2001)</Popover.Title>
    <Popover.Content>
      <InfoTextSpanBold>Sony Playstation Europe, Liverpool (UK)</InfoTextSpanBold>
      <p>
        <strong>Graphics Programmer</strong>
      </p>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Rendering code architecture
      <br/>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Lighting and color grading
      <br/>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Special effects programming
    </Popover.Content>
  </Popover>
);

const popoverF12002 = (
  <Popover id="popover-basic">
    <Popover.Title as="h2">F1 2002 (2002)</Popover.Title>
    <Popover.Content>
      <InfoTextSpanBold>Sony Playstation Europe, Liverpool (UK)</InfoTextSpanBold>
      <p>
        <strong>Additional Graphics Programmer</strong>
      </p>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Special effects programming
    </Popover.Content>
  </Popover>
);

const popoverRailSimulator = (
  <Popover id="popover-basic">
    <Popover.Title as="h2">Rail Simulator (2004)</Popover.Title>
    <Popover.Content>
      <InfoTextSpanBold>Kuju, Godalming (UK)</InfoTextSpanBold>
      <p>
        <strong>Contractor Graphics Programmer</strong>
      </p>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Rendering code architecture
      <br/>
    </Popover.Content>
  </Popover>
);

const popoverPaperCamera = (
  <Popover id="popover-basic">
    <Popover.Title as="h2">Paper Camera (2011)</Popover.Title>
    <Popover.Content>
      <InfoTextSpanBold>JFDP Labs, London (UK)</InfoTextSpanBold>
      <p>
        <strong>Company Owner</strong>
      </p>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Concept, development and marketing
      <br/>
    </Popover.Content>
  </Popover>
);

const popoverPaperArist = (
  <Popover id="popover-basic">
    <Popover.Title as="h2">Paper Artist (2012)</Popover.Title>
    <Popover.Content>
      <InfoTextSpanBold>JFDP Labs, London (UK)</InfoTextSpanBold>
      <p>
        <strong>Company Owner</strong>
      </p>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Concept, development and marketing
      <br/>
    </Popover.Content>
  </Popover>
);

const popoverCamera2 = (
  <Popover id="popover-basic">
    <Popover.Title as="h2">Camera2 (2013)</Popover.Title>
    <Popover.Content>
      <InfoTextSpanBold>JFDP Labs, London (UK)</InfoTextSpanBold>
      <p>
        <strong>Company Owner</strong>
      </p>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Development and marketing
      <br/>
    </Popover.Content>
  </Popover>
);

const popoverStarChart = (
  <Popover id="popover-basic">
    <Popover.Title as="h2">Star Chart (2019)</Popover.Title>
    <Popover.Content>
      <InfoTextSpanBold>Escapist Games, Guildford (UK)</InfoTextSpanBold>
      <p>
        <strong>Code contract provided by JFDP Labs</strong>
      </p>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Development of VR Orrery system, Unity
      <br/>
    </Popover.Content>
  </Popover>
);

const popoverNuclear = (
  <Popover id="popover-basic">
    <Popover.Title as="h2">Nuclear (2019)</Popover.Title>
    <Popover.Content>
      <InfoTextSpanBold>Escapist Games, Guildford (UK)</InfoTextSpanBold>
      <p>
        <strong>Code contract provided by JFDP Labs</strong>
      </p>
      <i className="fas fa-dot-circle fa-fw text-success"/>
      &nbsp; Development of VR port, Unity
      <br/>
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
          <OverlayTrigger trigger="hover" placement="right" overlay={popoverParadiseRemastered}>
            <ImgRoundedCardH margin={"0 20px 0 0"} height={"256px"} src={BurnoutParadiseRemastered}
                             alt="Burnout Paradise Remastered"/>
          </OverlayTrigger>
          <OverlayTrigger trigger="hover" placement="right" overlay={popoverWipeoutOmega}>
            <ImgRoundedCardH margin={"0 20px 0 0"} height={"256px"} src={WipeoutOmegaCollection}
                             alt="Wipeout Omega Collection"/>
          </OverlayTrigger>
          <OverlayTrigger trigger="hover" placement="right" overlay={popoverNFS}>
            <ImgRoundedCardH margin={"0 20px 0 0"} height={"256px"} src={NFSHotPursuit}
                             alt="Need for Speed Hot Pursuit"/>
          </OverlayTrigger>
          <OverlayTrigger trigger="hover" overlay={popoverBlack} placement={'left'}>
            <ImgRoundedCardH margin={"0 20px 0 0"} height={"256px"} src={BlackPlaystation}
                             alt="BlackPlaystation"/>
          </OverlayTrigger>
        </Flex>
        <My2/>
        <Flex width={"100%"} justifyContent={"space-around"}>
          <OverlayTrigger trigger="hover" placement="right" overlay={popoverWipEoutFusion}>
            <ImgRoundedCardH margin={"0 20px 0 0"} height={"256px"} src={WipeoutFusion} alt="WipeoutFusion"/>
          </OverlayTrigger>
          <OverlayTrigger trigger="hover" placement="right" overlay={popoverParadise}>
            <ImgRoundedCardH margin={"0 20px 0 0"} height={"256px"} src={BurnoutParadiseOriginal}
                             alt="BurnoutParadiseOriginal"/>
          </OverlayTrigger>
          <OverlayTrigger trigger="hover" placement="right" overlay={popoverF12002}>
            <ImgRoundedCardH margin={"0 20px 0 0"} height={"256px"} src={F12002} alt="F12002"/>
          </OverlayTrigger>
          <OverlayTrigger trigger="hover" overlay={popoverRailSimulator} placement={'left'}>
            <ImgRoundedCardH margin={"0 20px 0 0"} height={"256px"} src={RailSimulator} alt="RailSimulator"/>
          </OverlayTrigger>
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
          <OverlayTrigger trigger="hover" placement="right" overlay={popoverPaperCamera}>
          <ImgRoundedCardH margin={"0 20px 0 0"} height={"128px"} src={PaperCamera} alt="Paper Camera"/>
          </OverlayTrigger>
          <OverlayTrigger trigger="hover" placement="right" overlay={popoverPaperArist}>
          <ImgRoundedCardH margin={"0 20px 0 0"} height={"128px"} src={PaperArtist} alt="Paper Artist"/>
          </OverlayTrigger>
          <OverlayTrigger trigger="hover" placement="left" overlay={popoverCamera2}>
          <ImgRoundedCardH margin={"0 20px 0 0"} height={"128px"} src={Camera2} alt="Camera2"/>
          </OverlayTrigger>
        </Flex>
        <My2/>
        <Flex>
          <Div>
          <InfoTextSpanBold>Partnerships with other amazing developers:</InfoTextSpanBold>
          </Div>
          <Div>
          <img height={"48px"} src={OculusLogo} alt={"Oculus VR"}/>
          </Div>
        </Flex>
        <My2/>
        <Flex width={"100%"} justifyContent={"space-around"}>
          <OverlayTrigger trigger="hover" placement="right" overlay={popoverStarChart}>
          <ImgRoundedCardH margin={"0 20px 0 0"} height={"128px"} src={StarChart} alt="Star Chart"/>
          </OverlayTrigger>
          <OverlayTrigger trigger="hover" placement="left" overlay={popoverNuclear}>
          <ImgRoundedCardH margin={"0 20px 0 0"} height={"128px"} src={Nuclear} alt="Nuclear"/>
          </OverlayTrigger>
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
          <ImgRoundedCardH margin={"0 20px 0 0"} height={"128px"} src={PlaystationLogo}
                           alt="Need for Speed Hot Pursuit"/>
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
          <Mx1/>
          <Div height={"32px"}>
            <a href={"https://github.com/ziocleto"}>
            <img width="32px" src={GitHubLogo} alt={"githubLogo"}/>
            </a>
          </Div>
        </Flex>
      </FlexVertical>

      <Timeline lineColor={'var(--light)'}>
        <TimelineItem
          key="001"
          dateText="11/2010 – Present"
          style={{ color: 'var()' }}
        >
          <h3>Title, Company</h3>
          <h4>Subtitle</h4>
          <p>
            Est incididunt sint eu minim dolore mollit velit velit commodo ex nulla
            exercitation. Veniam velit adipisicing anim excepteur nostrud magna
            nostrud aliqua dolor. Sunt aute est duis ut nulla officia irure
            reprehenderit laborum fugiat dolore in elit. Adipisicing do qui duis Lorem
            est.
          </p>
          <p>
            Est incididunt sint eu minim dolore mollit velit velit commodo ex nulla
            exercitation. Veniam velit adipisicing anim excepteur nostrud magna
            nostrud aliqua dolor. Sunt aute est duis ut nulla officia irure
            reprehenderit laborum fugiat dolore in elit. Adipisicing do qui duis Lorem
            est.
          </p>
          <p>
            Est incididunt sint eu minim dolore mollit velit velit commodo ex nulla
            exercitation. Veniam velit adipisicing anim excepteur nostrud magna
            nostrud aliqua dolor. Sunt aute est duis ut nulla officia irure
            reprehenderit laborum fugiat dolore in elit. Adipisicing do qui duis Lorem
            est.
          </p>
        </TimelineItem>
        <TimelineItem
          key="002"
          dateText="04/2009 – 11/2010"
          dateInnerStyle={{ background: '#61b8ff', color: '#000' }}
          bodyContainerStyle={{
            background: '#ddd',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)',
          }}
        >
          <h3 style={{ color: '#61b8ff' }}>Title, Company</h3>
          <h4 style={{ color: '#61b8ff' }}>Subtitle</h4>
          <p>
            Est incididunt sint eu minim dolore mollit velit velit commodo ex nulla
            exercitation. Veniam velit adipisicing anim excepteur nostrud magna
            nostrud aliqua dolor. Sunt aute est duis ut nulla officia irure
            reprehenderit laborum fugiat dolore in elit. Adipisicing do qui duis Lorem
            est.
          </p>
          <p>
            Est incididunt sint eu minim dolore mollit velit velit commodo ex nulla
            exercitation. Veniam velit adipisicing anim excepteur nostrud magna
            nostrud aliqua dolor. Sunt aute est duis ut nulla officia irure
            reprehenderit laborum fugiat dolore in elit. Adipisicing do qui duis Lorem
            est.
          </p>
        </TimelineItem>
        <TimelineItem
          key="003"
          dateComponent={(
            <div
              style={{
                display: 'block',
                float: 'left',
                padding: '10px',
                background: 'rgb(150, 150, 150)',
                color: '#fff',
              }}
            >
              11/2008 – 04/2009
            </div>
          )}
        >
          <h3>Title, Company</h3>
          <h4>Subtitle</h4>
          <p>
            Est incididunt sint eu minim dolore mollit velit velit commodo ex nulla
            exercitation. Veniam velit adipisicing anim excepteur nostrud magna
            nostrud aliqua dolor. Sunt aute est duis ut nulla officia irure
            reprehenderit laborum fugiat dolore in elit. Adipisicing do qui duis Lorem
            est.
          </p>
          <p>
            Est incididunt sint eu minim dolore mollit velit velit commodo ex nulla
            exercitation. Veniam velit adipisicing anim excepteur nostrud magna
            nostrud aliqua dolor. Sunt aute est duis ut nulla officia irure
            reprehenderit laborum fugiat dolore in elit. Adipisicing do qui duis Lorem
            est.
          </p>
          <p>
            Est incididunt sint eu minim dolore mollit velit velit commodo ex nulla
            exercitation. Veniam velit adipisicing anim excepteur nostrud magna
            nostrud aliqua dolor. Sunt aute est duis ut nulla officia irure
            reprehenderit laborum fugiat dolore in elit. Adipisicing do qui duis Lorem
            est.
          </p>
        </TimelineItem>
        <TimelineItem
          key="004"
          dateText="08/2008 – 11/2008"
          dateInnerStyle={{ background: '#76bb7f' }}
        >
          <h3>Title, Company</h3>
          <h4>Subtitle</h4>
          <p>
            Est incididunt sint eu minim dolore mollit velit velit commodo ex nulla
            exercitation. Veniam velit adipisicing anim excepteur nostrud magna
            nostrud aliqua dolor. Sunt aute est duis ut nulla officia irure
            reprehenderit laborum fugiat dolore in elit. Adipisicing do qui duis Lorem
            est.
          </p>
          <p>
            Est incididunt sint eu minim dolore mollit velit velit commodo ex nulla
            exercitation. Veniam velit adipisicing anim excepteur nostrud magna
            nostrud aliqua dolor. Sunt aute est duis ut nulla officia irure
            reprehenderit laborum fugiat dolore in elit. Adipisicing do qui duis Lorem
            est.
          </p>
        </TimelineItem>
      </Timeline>

    </AboutNominalContainer>
  )
}

const Dado = () => {
  return <>
    <AboutMainIncipit/>
    <CareerHighlightsVideoGames/>
    <CareerHighlightsApps/>
    <CompaniesAndBusiness/>
    <Personal/>
  </>;
}

export default Dado;
