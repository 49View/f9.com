import React, {Fragment, useState, withGlobal} from "reactn";
import {Button} from "react-bootstrap";
import {Redirect} from "react-router-dom";

// const YourAssetsTitle = () => {
//   return (
//     <DashboardUserInnerMargins>
//       <i className="fas fa-rocket"/> Your Trends:
//     </DashboardUserInnerMargins>
//   );
// }
//
// const ProjectManagement = ({name}) => {
//
//   const projectApi = useApi('project');
//   const [, , , alertStore] = projectApi;
//   let inviteNameRef = React.useRef(null);
//   const [currentManagedProject, setCurrentManagedProject] = useState(null);
//
//   if (!currentManagedProject) return <Fragment/>
//
//   const invite = async () => {
//     const invited = inviteNameRef.current.value;
//     const res = await api(projectApi, sendInvitationToProject, name, currentManagedProject, invited);
//     alertIfSuccessful(res, alertStore, "Great stuff!", invited + " has been invited, give them a shout!");
//   }
//
//   const closeProjectManagement = () => {
//     setCurrentManagedProject(null);
//   };
//
//   return (
//     <div className="projectManagementContainer">
//       <div className="projectInvitationGrid">
//         <div className="lead text-secondary-alt">{currentManagedProject}</div>
//         <div className="closeButton-a">
//           <Button
//             variant="outline-dark"
//             onClick={e => closeProjectManagement()}
//           >
//             <i className="fas fa-times-circle"/>
//           </Button>
//         </div>
//       </div>
//       <div className="width100">Send invitation to join:</div>
//       <InputGroup className="mb-3" onKeyPress={(target) => {
//         if (target.charCode === 13) {
//           invite()
//         }
//       }}
//       >
//         <InputGroup.Prepend>
//           <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
//         </InputGroup.Prepend>
//         <FormControl
//           placeholder="Username or email address"
//           aria-label="Username"
//           aria-describedby="basic-addon1"
//           ref={inviteNameRef}
//         />
//         <InputGroup.Append>
//           <Button variant="info" onClick={() => invite()}>
//             Invite
//           </Button>
//         </InputGroup.Append>
//       </InputGroup>
//     </div>
//   );
// };

const UserAssets = (props) => {

  // const auth = props.auth;
  const [propertyId, gotoProperty] = useState(null);

  if ( propertyId ) {
    return (
      <Redirect to={`/property/${propertyId}`}/>
    )
  }

  // const name = getAuthUserName(auth);
  // const [, setEditingUserTrend] = useGlobal(EditingUserTrend);
  // const {data, loading} = useQuery(getUserTrends(), {variables: {name}});

  // const onManageProject = name => {
  //   // setCurrentManagedProject(name);
  // };
  //
  // const onRemoveProject = name => {
  // };

  // let userProjects = (
  //   <span className="normal text-primary">
  //     It feels quite lonely in here!
  //   </span>
  // );

  // if (data && loading === false) {
  //   const trends = data.user.trends;
  //   userProjects = (
  //     <div className="project-login">
  //       {trends.map(elem => {
  //           const trendId = elem.trendId;
  //           const projectLink = "/dashboardproject/" + trendId;
  //           return (
  //             <div key={`fragment-${trendId}`} className="inliner-block my-1">
  //               <LinkContainer to={projectLink} onClick={ () => {}}>
  //                 <SplitButton
  //                   title={trendId}
  //                   variant="primary"
  //                   id={`dropdown-split-variants-${trendId}`}
  //                   key={trendId}
  //                 >
  //                   <LinkContainer to={projectLink}>
  //                     <Dropdown.Item
  //                       eventKey="1"
  //                     >
  //                       Open
  //                     </Dropdown.Item>
  //                   </LinkContainer>
  //                   <Dropdown.Item
  //                     eventKey="2"
  //                     onClick={e => onManageProject(trendId)}
  //                   >
  //                     Invite People
  //                   </Dropdown.Item>
  //                   <Dropdown.Divider/>
  //                   <Dropdown.Item
  //                     eventKey="3"
  //                     variant="danger"
  //                     onClick={e => onRemoveProject(trendId)}
  //                   >
  //                     Delete
  //                   </Dropdown.Item>
  //                 </SplitButton>
  //               </LinkContainer>
  //               <div
  //                 key={`dropdown-split-spacer-${trendId}`}
  //                 className="inliner mx-1"
  //               />
  //             </div>)
  //         }
  //       )}
  //     </div>
  //   );
  // }

  return (
    <Fragment>
      <br/>
      <br/>
      <Button variant={"info"} onClick={ () => gotoProperty(13) }>2 Bedroom flat</Button>
      {/*<YourAssetsTitle/>*/}
      {/*{userProjects}*/}
      {/*<ProjectManagement name={name}/>*/}
    </Fragment>
  )
};

export default withGlobal(
  global => ({
    auth: global.auth,
  }),
)(UserAssets);
