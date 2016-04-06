import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

class MissionTypeSelect extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        mission: props.mission,
        value: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        mission: nextProps.mission
    });
  }

  handleChange (event, index, value) {
    this.setState({value});
    //this.state.selectHandler(value);
  }

  renderMenuItems(){
    if (!this.state.mission) {
      return null;
    }
    return this.state.mission.type.map((type) => {
      return <MenuItem key={type} value={type} primaryText={type} />
    });
  }

  render() {
    return (
      <SelectField
        value={this.state.value}
        disabled={!this.state.mission}
        onChange={this.handleChange.bind(this)}
        floatingLabelText='mission type'
        floatingLabelStyle={{fontSize: '1.2em'}}
        style={this.state.mission ? {opacity: 1} : {opacity: .3}}
      >
        {this.renderMenuItems()}
      </SelectField>
    );
  }
}

module.exports = MissionTypeSelect;
