import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

class OpenSpotsSelect extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        value: props.defaultValue,
        onChangeCallback: props.onChangeCallback
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //       regions: nextProps.regions
  //   });
  // }

  handleChange (event, index, value) {
    this.setState({value});
    this.state.onChangeCallback(value);
  }

  renderMenuItems(){
    return this.state.regions.map((region) => {
      return <MenuItem key={region} value={region} primaryText={region} />
    });
  }

  render() {
    return (
      <SelectField
        autoWidth={true}
        style={{ fontSize: '1em', width: '90%', overflow: 'hidden', display: 'inline-block'}}
        value={this.state.value}
        maxHeight={250}
        onChange={this.handleChange.bind(this)}
        floatingLabelText='open spots'
        floatingLabelStyle={{fontSize: '1.2em'}}
      >
        <MenuItem key={1} value={1} primaryText={1} />
        <MenuItem key={2} value={2} primaryText={2} />
        <MenuItem key={3} value={3} primaryText={3} />
      </SelectField>
    );
  }
}

module.exports = OpenSpotsSelect;
