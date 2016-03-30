import React from 'react';
import MissionTypeSelect from './MissionTypeSelect';
import MissionTierSelect from './MissionTierSelect';
import MissionQuestionSelect from './MissionQuestionSelect';
import MissionSelect from './MissionSelect';

class MissionFields extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        missions: props.missions,
        selectedMission: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      missions: nextProps.missions
    });
  }

  handleMissionSelect(mission){
    this.setState({
      list: this.state.selectedMission = mission
    });
  }

  renderMissionDetail() {
    if (!this.state.selectedMission) {
      return null;
    }
    return Object.keys(this.state.selectedMission).map((key) => {
      if (this.state.selectedMission[key] instanceof Array) {
        return <MissionQuestionSelect  key={key + this.state.selectedMission["name"]} keyName={key} valueList={this.state.selectedMission[key]}/>
      }
    });
  }

  render() {
    return (
        <div className="row">
          <div className="col s6">
              <MissionSelect
                missions={this.state.missions}
                selectHandler={this.handleMissionSelect.bind(this)}
              />
          </div>
          <div className="col s6">
            {this.renderMissionDetail()}
          </div>
        </div>
    );
  }
}

module.exports = MissionFields;
