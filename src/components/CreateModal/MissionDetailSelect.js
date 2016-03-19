var React = require('react');

class MissionDetailSelect extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        mission: props.mission
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      mission: nextProps.mission
    });
  }

  render() {
    return (
      <div>
        <p className="grey-text">
          {this.state.mission.name}
        </p>
      </div>
    );
  }
}

module.exports = MissionDetailSelect;
