var React = require('react');
var MissionTypeSelect = require('./MissionTypeSelect');
var MissionDetailSelect = require('./MissionDetailSelect');

class PostForm extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        missions: props.missions,
        selectedMission: {}
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

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s6">
            <h5 className="cyan-text">1) Looking For...</h5>
            <MissionTypeSelect missions={this.state.missions} selectHandler={this.handleMissionSelect.bind(this)}/>
          </div>
          <div className="col s6">
            <h5 className="cyan-text">2) Of Type...</h5>
            <MissionDetailSelect className="col s6" mission={this.state.selectedMission}/>
          </div>
        </div>
      </div>
    );
  }
}


module.exports = PostForm;
