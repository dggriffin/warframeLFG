MissionRadioButton = React.createClass({
  propTypes: {
    mission: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {checked: null};
  },

  handleChange: function(event) {
    this.setState({checked: event.target.value});
    console.log('ay');
  },

  render() {
    return (
        <p>
          <input 
		      checked={this.state.checked}
		      name="group1" 
		      type="radio"
		      id={this.props.mission._id} 
		      onChange={this.handleChange}
          />
          <label
          	htmlFor={this.props.mission._id}
          >
      		{this.props.mission.name}
          </label>
        </p>
    );
  }
});
