require('styles/App.css');
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import {
  cyan500, cyan700,
  grey100, grey300, grey400, grey500,
  pinkA200,
  white, darkBlack, fullBlack
} from 'material-ui/styles/colors';

import AppBar from 'material-ui/AppBar';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: cyan500,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    pickerHeaderColor: cyan500,
    shadowColor: fullBlack
  }
});

//import theme from 'styles/EnergyBeeTheme';
class AppComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      appData: []
    }
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(muiTheme)};
}

  render(){
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <AppBar
            style={{backgroundColor: 'white !important'}}
            title='WarframeLFG.io'
            titleStyle={{color: cyan500, textAlign: 'center', fontWeight: 100}}
            iconElementLeft={<IconButton iconClassName="material-" ></IconButton>}
            />
        </MuiThemeProvider>
        {this.props.children}
      </div>
    )
  }
}

AppComponent.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

module.exports = AppComponent;
