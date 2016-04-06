import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RegionSelect from './RegionSelect';
import PlatformSelect from './PlatformSelect';
class PlayerFields extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        appData: props.appData,
        userName: '',
        region: '',
        platform: '',
        onChange: props.onChange
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        appData: nextProps.appData,
        onChange: nextProps.onChange
    });
  }

  onChangeUsername(event) {
    this.setState({userName: event.currentTarget.value});
    this.state.onChange({userName: event.currentTarget.value, region: this.state.region, platform: this.state.platform});
  }

  onChangeRegion(value) {
    this.setState({region: value});
    this.state.onChange({userName: this.state.userName, region: value, platform: this.state.platform});
  }

  onChangePlatform(value) {
    this.setState({platform: value});
    this.state.onChange({userName: this.state.userName, region: this.state.region, platform: value});
  }

  render() {
    return (
        <div className='row'>
          <div className='col s6'>
            <TextField
              floatingLabelText='username'
              style={{ fontSize: '1em', width: '90%', overflow: 'hidden', display: 'inline-block'}}
              floatingLabelStyle={{fontSize: '1.2em'}}
              multiLine={true}
              onBlur={this.onChangeUsername.bind(this)}
            />
            <PlatformSelect
              platforms={this.state.appData.platforms}
              onChange={this.onChangePlatform.bind(this)}
            />
          </div>
          <div className='col s6'>
            <RegionSelect
              regions={this.state.appData.regions}
              onChange={this.onChangeRegion.bind(this)}
            />
          </div>
        </div>
    );
  }
}

module.exports = PlayerFields;