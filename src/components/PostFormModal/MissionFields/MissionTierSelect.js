import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

class MissionTierSelect extends React.Component{
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
    return this.state.mission.tier.map((type) => {
      return <MenuItem key={type} value={type} primaryText={type} />
    });
  }

  render() {
    return (
      <SelectField
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
        floatingLabelText="mission tier"
        floatingLabelStyle={{fontSize: "1.2em"}}
      >
        {this.renderMenuItems()}
      </SelectField>
    );
  }
}

module.exports = MissionTierSelect;
