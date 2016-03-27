import React from 'react';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import RaisedButton from 'material-ui/lib/raised-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import Toggle from 'material-ui/lib/toggle';

class GroupPostingsToolbar extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
      appData: props.appData,
      onCreatePost: props.onCreatePost,
      missionFilter: '1',
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

  renderMenuItems(){
    return this.state.appData.missions.map((mission) => {
      return <MenuItem key={mission.name} value={mission.name} primaryText={mission.name} />
    });
  }

  handleChange(event, index, value){
    this.setState({missionFilter: value});
    this.state.onChange({name: value});
  }

  handleToggle(event, index, value){
    this.setState({advancedToggle: value});
  }

  render() {
    const styles = {
      block: {
        maxWidth: 50,
      },
      toggle: {
        marginBottom: 0,
      },
    };
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true} float="left">
          <DropDownMenu value={this.state.missionFilter} onChange={this.handleChange.bind(this)}>
            <MenuItem value="1" primaryText="All Missions" />
            {this.renderMenuItems()}
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
