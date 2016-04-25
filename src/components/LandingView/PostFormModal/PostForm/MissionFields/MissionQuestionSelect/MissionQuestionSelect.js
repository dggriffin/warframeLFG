import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class MissionQuestionSelect extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        keyName: props.keyName,
        valueList: props.valueList,
        value: null,
        onChange: props.onChange,
        errorText: props.errorText
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        mission: nextProps.mission,
        errorText: nextProps.errorText
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
        style={{ fontSize: '1em', width: '90%', overflow: 'hidden', display: 'inline-block', overflow: 'visible'}}
        autoWidth={true}
        value={this.state.value}
        disabled={!this.state.valueList}
        onChange={this.handleChange.bind(this)}
        floatingLabelText={this.state.keyName}
        floatingLabelStyle={{fontSize: '1.2em'}}
        errorText={this.state.errorText}
      >
        {this.renderMenuItems()}
      </SelectField>
    );
  }
}

module.exports = MissionQuestionSelect;
