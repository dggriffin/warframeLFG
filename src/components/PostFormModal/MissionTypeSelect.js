import React from 'react';
import MissionRadioButton from './MissionRadioButton';

class MissionTypeSelect extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        missions: props.missions,
        selectHandler: props.selectHandler
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      missions: nextProps.missions
    });
  }

  renderMissionRadios() {
      return this.state.missions.map((mission) => {
        return <MissionRadioButton key={mission.name} mission={mission} selectHandler={this.state.selectHandler.bind(this)} />
      });
  }

  render() {
    return (
        <form action="#">
          {this.renderMissionRadios()}
        </form>
    );
  }
}

module.exports = MissionTypeSelect;
