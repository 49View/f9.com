import React, {Fragment, useGlobal, useState} from "reactn";
import {alertWarning, NotificationAlert} from "../../../futuremodules/alerts/alerts";
import {DashboardUserInnerMargins} from "../DashboardUser.styled";

export const AssetCreator = ({auth}) => {

  const [,alertStore] = useGlobal(NotificationAlert);
  // const [createTrendM] = useMutation(CREATE_TREND);
  const [newTrendFormInput, setNewTrendFormInput] = useState();
  // const name = getUserName(auth);

  const onCreateProject = e => {
    e.preventDefault();
    if (!newTrendFormInput) {
      alertWarning(alertStore, "I see no trend in here!");
    }
    // createTrendM({
    //   variables: {
    //     trendId: newTrendFormInput,
    //     username: name
    //   }
    // }).then().catch((e) => {
    //   alertWarning(alertStore, "Big problem with this trend");
    // });
  };

  return (
    <Fragment>
      <DashboardUserInnerMargins>
        <i className="fas fa-plus-circle"/> Create New Trend
      </DashboardUserInnerMargins>
      <form className="form" onSubmit={e => onCreateProject(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Trend Name"
            name="projectNew"
            onChange={e => setNewTrendFormInput(e.target.value)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Create"/>
      </form>
    </Fragment>
  );
}
