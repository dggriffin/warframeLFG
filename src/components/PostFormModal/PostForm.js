import React from 'react';
import Divider from 'material-ui/lib/divider';
import MissionFields from './MissionFields/MissionFields';
import PlayerFields from './PlayerFields/PlayerFields';
import RequirementFields from './RequirementFields/RequirementFields';

class PostForm extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        appData: props.appData,
        selectedMission: null,
        open: false,
        handleClose: () => {}
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      appData: nextProps.appData
    });
  }

  render() {
    return (
      <div>
        <PlayerFields
          appData={this.state.appData}
        />
        <MissionFields
          missions={this.state.appData.missions}
        />
        <RequirementFields
          appData={this.state.appData}
        />
      </div>
    );
  }
}

module.exports = PostForm;
