import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

class NeedWarframesSelect extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        warframes: props.warframes,
        value: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        warframes: nextProps.warframes
    });
  }

  handleChange (event, index, value) {
    this.setState({value});
    //this.state.selectHandler(value);
  }

  renderMenuItems(){
    return Object.keys(this.state.warframes).map((warframe) => {
      return <MenuItem key={warframe} value={warframe} primaryText={warframe} />
    });
  }

  render() {
    return (
      <SelectField
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
        floatingLabelText="have warframes"
        floatingLabelStyle={{fontSize: "1.2em"}}
      >
        {this.renderMenuItems()}
      </SelectField>
    );
  }
}

module.exports = NeedWarframesSelect;
