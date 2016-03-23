import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RegionSelect from './RegionSelect';
import PlatformSelect from './PlatformSelect';
import Divider from 'material-ui/lib/divider';

class PlayerFields extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        appData: props.appData
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        appData: nextProps.appData
    });
  }

  render() {
    return (
      <div className="row">
      <div className="col s12">
        <span className='cyan-text'>player details</span>
      </div>
        <div className="col s6">
          <TextField
            floatingLabelText="username"
            floatingLabelStyle={{fontSize: "1.2em"}}
            multiLine={true}
          />
          <PlatformSelect
            platforms={this.state.appData.platforms}
          />
        </div>
        <div className="col s6">
          <RegionSelect
            regions={this.state.appData.regions}
          />
        </div>
      </div>
    );
  }
}

module.exports = PlayerFields;
