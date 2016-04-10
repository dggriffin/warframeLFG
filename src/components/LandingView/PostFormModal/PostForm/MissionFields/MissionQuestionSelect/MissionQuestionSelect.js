import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

class MissionQuestionSelect extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        keyName: props.keyName,
        valueList: props.valueList,
        value: null,
        onChange: props.onChange
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        mission: nextProps.mission
    });
  }

  handleChange (event, index, value) {
    this.setState({value});
    this.state.onChange(value);
  }

  renderMenuItems() {
    if (!this.state.valueList) {
      return null;
    }
    return this.state.valueList.map((value) => {
      return <MenuItem key={value} value={value} primaryText={value} />
    });
  }

  render() {
    return (
      <SelectField
        style={{ fontSize: '1em', width: '90%', overflow: 'hidden', display: 'inline-block'}}
        autoWidth={true}
        value={this.state.value}
        disabled={!this.state.valueList}
        onChange={this.handleChange.bind(this)}
        floatingLabelText={this.state.keyName}
        floatingLabelStyle={{fontSize: '1.2em'}}
      >
        {this.renderMenuItems()}
      </SelectField>
    );
  }
}

module.exports = MissionQuestionSelect;
