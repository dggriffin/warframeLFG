import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class RegionSelect extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        regions: props.regions,
        value: null,
        onChange: props.onChange,
        errorText: props.errorText
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        regions: nextProps.regions,
        onChange: nextProps.onChange,
        errorText: nextProps.errorText
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
        autoWidth={true}
        style={{ fontSize: '1em', width: '90%', overflow: 'hidden', display: 'inline-block', overflow: 'visible'}}
        onChange={this.handleChange.bind(this)}
        floatingLabelText='region'
        floatingLabelStyle={{fontSize: '1.2em'}}
        errorText= {this.state.errorText}
      >
        {this.renderMenuItems()}
      </SelectField>
    );
  }
}

module.exports = RegionSelect;
