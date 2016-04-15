require('styles/App.css');
import React from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

//import theme from 'styles/EnergyBeeTheme';
class AppComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      appData: []
    }
  }

  getChildContext() {
  return {muiTheme: getMuiTheme(baseTheme)};
}

  render(){
    return (
      <div>
        <AppBar
          title='WarframeLFG.io'
          />
        {this.props.children}
      </div>
    )
  }
}

AppComponent.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

module.exports = AppComponent;
