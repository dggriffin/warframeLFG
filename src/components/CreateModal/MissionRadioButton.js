var React = require('react');

class MissionRadioButton extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        mission: props.mission
    };
  }

  handleChange(event) {
    this.setState({checked: event.target.value});
  }

  render() {
    return (
        <p>
          <input
		      checked={this.state.checked}
		      name="group1"
		      type="radio"
		      id={this.state.mission.name}
		      onChange={this.handleChange}
          />
          <label
          	htmlFor={this.state.mission.name}
          >
      		{this.state.mission.name}
          </label>
        </p>
    );
  }
};

MissionRadioButton.propTypes = {
    mission: React.PropTypes.object.isRequired
};

module.exports = MissionRadioButton;
