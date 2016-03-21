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

  renderDetailDropdowns(){
    return Object.keys(this.state.mission).map((key) => {
      return key !== 'name' && key !== 'key' ?
      <div className="input-field">
        <select ref="select">
          <option value="">Choose your option</option>
          {this.renderDetailDropdownOptions(key)}
        </select>
        <label>{key}</label>
      </div> : <div></div>
    });
  }

  renderDetailDropdownOptions(key){
    return this.state.mission[key].map((key) => {
      return <option value={key}>{key}</option>;
    });
  }

  render() {
    return (
      <div>
        {this.renderDetailDropdowns()}
      </div>
    );
  }
}

module.exports = MissionDetailSelect;
