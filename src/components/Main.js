require('normalize.css');
require('styles/App.css');
require('styles/css/materialize.css');
import Rebase from 're-base';
import GroupPostings from './GroupPostings/GroupPostings';
import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import CircularProgress from 'material-ui/lib/circular-progress';

const base = Rebase.createClass('https://vivid-fire-8661.firebaseio.com/');

class AppComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      appData: [],
      loading: true
    }
  }

  componentDidMount(){
    this.ref = base.syncState('/', {
      context: this,
      state: 'appData',
      asArray: false,
      then(){
        this.setState({loading: false})
      }
    });
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  render(){
    return (
      <div>
        <AppBar
          title="WarframeLFG"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
        <div className="container">
          <div className="row center">
            <h3 className="center thinnest">WarframeLFG</h3>
          </div>
        </div>
        <div className="center">
          {this.state.loading ? <CircularProgress size={2} /> : <GroupPostings appData={this.state.appData} />}
        </div>
      </div>
    )
  }
}

AppComponent.defaultProps = {
};

module.exports = AppComponent;
