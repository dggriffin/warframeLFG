require('styles/App.css');
import React from 'react';
import AppBar from 'material-ui/lib/app-bar';

class AppComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      appData: []
    }
  }

  render(){
    return (
      <div>
        <AppBar
          title='WarframeLFG.io'
          titleStyle={{color: '#00bcd4', fontWeight: 100}}
          />
        {this.props.children}
      </div>
    )
  }
}

module.exports = AppComponent;
