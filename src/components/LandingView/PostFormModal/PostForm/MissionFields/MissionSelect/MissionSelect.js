import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class MissionSelect extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        missions: props.missions,
        selectHandler: props.selectHandler,
        value: null,
        errorText: props.errorText
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      errorText: nextProps.errorText
    });
  }

  handleChange (event, index, value) {
    this.setState({value});
    this.state.selectHandler(value);
  }

  renderMenuItems(){
    return Object.keys(this.state.missions).reverse().map((mission) => {
      return <MenuItem key={mission} value={this.state.missions[mission]} primaryText={mission} />
    });
  }

  render() {
    return (
      <SelectField
        autoWidth={true}
        style={{ fontSize: '1em', width: '90%', overflow: 'hidden', display: 'inline-block', overflow: 'visible'}}
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
        floatingLabelText='mission'
        floatingLabelStyle={{fontSize: '1.2em'}}
        errorText={this.state.errorText}
      >
        {this.renderMenuItems()}
      </SelectField>
    );
  }
}

module.exports = MissionSelect;
