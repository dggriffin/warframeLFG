import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

class RegionSelect extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        regions: props.regions,
        value: null,
        onChange: props.onChange
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        regions: nextProps.regions,
        onChange: nextProps.onChange
    });
  }

  handleChange (event, index, value) {
    this.setState({value});
    this.state.onChange(value);
  }

  renderMenuItems(){
    return this.state.regions.map((region) => {
      return <MenuItem key={region} value={region} primaryText={region} />
    });
  }

  render() {
    return (
      <SelectField
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
        floatingLabelText="region"
        floatingLabelStyle={{fontSize: "1.2em"}}
      >
        {this.renderMenuItems()}
      </SelectField>
    );
  }
}

module.exports = RegionSelect;
