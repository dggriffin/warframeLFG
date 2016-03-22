import React from 'react';
import MissionDetailSelect from './MissionDetailSelect';
import MissionTypeSelect from './MissionTypeSelect';

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
    return this.state.selectedMission ? <div className="col s6"> <h5 className="cyan-text">Mission Details:</h5> <MissionDetailSelect className="col s6" mission={this.state.selectedMission}/></div> : <div></div>
  }

  render() {
    return (
        <form action="#">
          <div className="row">
            <div className="col s6">
                <MissionTypeSelect
                  missions={this.state.missions}
                  selectHandler={this.handleMissionSelect.bind(this)}
                />
            </div>
            {this.renderMissionDetail()}
          </div>
        </form>
    );
  }
}

module.exports = MissionFields;
