import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import {Motion, spring} from 'react-motion';

class GroupPostingsToolbar extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
      appData: props.appData,
      onCreatePost: props.onCreatePost,
      missionFilter: '1',
      platformFilter: '1',
      regionFilter: '1',
      advancedToggle: false,
      onChange: props.onChange
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      onCreatePost: nextProps.onCreatePost,
      appData: nextProps.appData,
      onChange: nextProps.onChange
    });
  }

  renderMissionMenuItems(){
    return this.state.appData.missions.map((mission) => {
      return <MenuItem key={mission.name} value={mission.name} primaryText={mission.name} />
    });
  }

  renderPlatformMenuItems(){
    return this.state.appData.platforms.map((platform) => {
      return <MenuItem key={platform} value={platform} primaryText={platform} />
    });
  }

  renderRegionMenuItems(){
    return this.state.appData.regions.map((region) => {
      return <MenuItem key={region} value={region} primaryText={region} />
    });
  }

  handleMissionChange(event, index, value){
    this.setState({missionFilter: value});
    this.state.onChange({mission: value, platform: this.state.platformFilter, region: this.state.regionFilter});
  }

  handlePlatformChange(event, index, value){
    this.setState({platformFilter: value});
    this.state.onChange({mission: this.state.missionFilter, platform: value, region: this.state.regionFilter});
  }

  handleRegionChange(event, index, value){
    this.setState({regionFilter: value});
    this.state.onChange({mission: this.state.missionFilter, platform: this.state.platformFilter, region: value});
  }

  handleToggle(event, index, value){
    debugger;
    this.setState({advancedToggle: index});
  }

  render() {
    return (
      <Motion style={{toolbarHeight: spring(this.state.advancedToggle ? 400 : 70)}}>
        {({toolbarHeight}) =>
          <div className='group-posting-toolbar' style={{height: toolbarHeight}}>
            <div className='group-posting-row'>
              <div className='group-posting-toolbar-left'>
                <SelectField
                  autoWidth={true}
                  style={{maxWidth: 150, fontSize: '1em', width: '33%', overflow: 'hidden', display: 'inline-block'}}
                  value={this.state.missionFilter}
                  onChange={this.handleMissionChange.bind(this)}
                  floatingLabelText='mission'
                  floatingLabelStyle={{fontSize: '1.2em'}}
                  >
                    <MenuItem value='1' primaryText='any mission' />
                    {this.renderMissionMenuItems()}
                </SelectField>

                <SelectField
                  autoWidth={true}
                  style={{maxWidth: 150, fontSize: '1em', width: '33%', overflow: 'hidden', display: 'inline-block'}}
                  value={this.state.platformFilter}
                  onChange={this.handlePlatformChange.bind(this)}
                  floatingLabelText='platform'
                  floatingLabelStyle={{fontSize: '1.2em'}}
                  >
                    <MenuItem value='1' primaryText='any platform' />
                    {this.renderPlatformMenuItems()}
                </SelectField>

                <SelectField
                  autoWidth={true}
                  style={{maxWidth: 150, fontSize: '1em', width: '33%', overflow: 'hidden', display: 'inline-block'}}
                  value={this.state.regionFilter}
                  onChange={this.handleRegionChange.bind(this)}
                  floatingLabelText='region'
                  floatingLabelStyle={{fontSize: '1.2em'}}
                  >
                    <MenuItem value='1' primaryText='any region' />
                    {this.renderRegionMenuItems()}
                </SelectField>
              </div>


              <div className='group-posting-toolbar-right'>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <Toggle
                    toggled={this.state.advancedToggle}
                    onToggle={this.handleToggle.bind(this)}
                    className='grey-text'
                    label='Advanced'
                  />
                </div>

                <ToolbarSeparator style={{top: 0, marginRight: 25, height: 40}}/>

                <RaisedButton label='Post'
                  primary={true}
                  onClick={this.state.onCreatePost}
                />
              </div>
            </div>
          </div>
        }
    </Motion>
    );
  }
}

module.exports = GroupPostingsToolbar;
