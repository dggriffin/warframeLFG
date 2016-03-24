import React from 'react';
import MissionTypeSelect from './MissionTypeSelect';
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

  renderMissionDetail(){
    return this.state.selectedMission ? <div className="col s6"> <MissionTypeSelect className="col s6" mission={this.state.selectedMission}/></div> : <div></div>
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
          {this.renderMissionDetail()}
        </div>
    );
  }
}

module.exports = MissionFields;
