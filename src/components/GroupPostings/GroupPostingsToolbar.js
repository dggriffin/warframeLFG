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

const Rebase = require('re-base');
const base = Rebase.createClass('https://vivid-fire-8661.firebaseio.com/');

class GroupPostingsToolbar extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
      missions: [],
      onCreatePost: props.onCreatePost,
      missionFilter: "1"
    };
  }

  componentDidMount(){
    this.ref = base.syncState('missions', {
      context: this,
      state: 'missions',
      asArray: true,
      queries: {
        orderByKey: 'name'
      },
      then(){
        this.setState({loading: false})
      }
    });
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      onCreatePost: nextProps.onCreatePost
    });
  }

  renderMenuItems(){
    return this.state.missions.map((mission) => {
      return <MenuItem key={mission.name} value={mission.name} primaryText={mission.name} />
    });
  }

  handleChange(event, index, value){
    this.setState({missionFilter: value});
  }

  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true} float="left">
          <DropDownMenu value={this.state.missionFilter} onChange={this.handleChange.bind(this)}>
            <MenuItem value="1" primaryText="All Missions" />
            {this.renderMenuItems()}
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup float="right">
          <ToolbarTitle text="Options" />
          <FontIcon className="muidocs-icon-custom-sort" />
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Download" />
            <MenuItem primaryText="More Info" />
          </IconMenu>
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
