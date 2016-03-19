var React = require('react');
var MissionTypeSelect = require('./MissionTypeSelect');
var MissionDetailSelect = require('./MissionTypeSelect');

class PostForm extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    debugger;
    this.state = {
        missions: props.missions
    };
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s6">
            <h5 className="cyan-text">1) Looking For...</h5>
            <MissionTypeSelect missions={this.state.missions}/>
          </div>
          <div className="col s6">
            <h5 className="cyan-text">2) Of Type...</h5>
            <MissionDetailSelect className="col s6"/>
          </div>
        </div>
      </div>
    );
  }
};


module.exports = PostForm;
