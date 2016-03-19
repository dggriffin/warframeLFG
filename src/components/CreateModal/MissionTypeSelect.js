var React = require('react');
var MissionRadioButton = require('./MissionRadioButton');

class MissionTypeSelect extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        missions: props.missions
    };
  }

  renderMissionRadios() {
    if(this.state.missions){
      return this.state.missions.map((mission) => {
        return <MissionRadioButton key={mission.name} mission={mission} />
      });
    }
  }

  render() {
    return (
        <form action="#">
          {this.renderMissionRadios()}
        </form>
    );
  }
};

module.exports = MissionTypeSelect;
