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
        value={this.state.value}
        disabled={!this.state.valueList}
        onChange={this.handleChange.bind(this)}
        floatingLabelText={this.state.keyName}
        floatingLabelStyle={{fontSize: "1.2em"}}
        style={this.state.valueList ? {opacity: 1} : {opacity: .3}}
      >
        {this.renderMenuItems()}
      </SelectField>
    );
  }
}

module.exports = MissionQuestionSelect;
