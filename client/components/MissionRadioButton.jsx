MissionRadioButton = React.createClass({
  propTypes: {
    mission: React.PropTypes.object.isRequired
  },
  render() {
    return (
        <p>
          <input name="group1" type="radio" />
          <label>{this.mission.name}</label>
        </p>
    );
  }
});
