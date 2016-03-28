import React from 'react';
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import RaisedButton from 'material-ui/lib/raised-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import Toggle from 'material-ui/lib/toggle';

import PlatformSelect from '../PostFormModal/PlayerFields/PlatformSelect';
import RegionSelect from '../PostFormModal/PlayerFields/RegionSelect';

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
    this.setState({advancedToggle: value});
  }

  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true} float="left">
          <DropDownMenu value={this.state.missionFilter} onChange={this.handleMissionChange.bind(this)}>
            <MenuItem value="1" primaryText="Any Missions" />
            {this.renderMissionMenuItems()}
          </DropDownMenu>

          <DropDownMenu value={this.state.platformFilter} onChange={this.handlePlatformChange.bind(this)}>
            <MenuItem value="1" primaryText="Any Platforms" />
            {this.renderPlatformMenuItems()}
          </DropDownMenu>

          <DropDownMenu value={this.state.regionFilter} onChange={this.handleRegionChange.bind(this)}>
            <MenuItem value="1" primaryText="Any Regions" />
            {this.renderRegionMenuItems()}
          </DropDownMenu>

        </ToolbarGroup>
        <ToolbarGroup float="right">
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Toggle
              toggled={this.state.advancedToggle}
              onToggle={this.handleToggle.bind(this)}
              label="Advanced"
            />
          </div>
          <ToolbarSeparator />
          <RaisedButton label="Create Group"
            primary={true}
            onClick={this.state.onCreatePost}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

module.exports = GroupPostingsToolbar;
