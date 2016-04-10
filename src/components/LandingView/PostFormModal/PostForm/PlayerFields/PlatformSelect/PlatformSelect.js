import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

class PlatformSelect extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        platforms: props.platforms,
        value: null,
        onChange: props.onChange,
        errorText: props.errorText
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        regions: nextProps.platforms,
        onChange: nextProps.onChange,
        errorText: nextProps.errorText
    });
  }

  handleChange (event, index, value) {
    this.setState({value});
    this.state.onChange(value);
  }

  renderMenuItems(){
    return this.state.platforms.map((platform) => {
      return <MenuItem key={platform} value={platform} primaryText={platform} />
    });
  }

  render() {
    return (
      <SelectField
        autoWidth={true}
        value={this.state.value}
        style={{ fontSize: '1em', width: '90%', overflow: 'hidden', display: 'inline-block', overflow: 'visible'}}
        onChange={this.handleChange.bind(this)}
        floatingLabelText='platform'
        floatingLabelStyle={{fontSize: '1.2em'}}
        errorText={this.state.errorText}
      >
        {this.renderMenuItems()}
      </SelectField>
    );
  }
}

module.exports = PlatformSelect;
