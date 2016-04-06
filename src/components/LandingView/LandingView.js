require('styles/App.css');
import Rebase from 're-base';
import GroupPostings from './GroupPostings/GroupPostings';
import React from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';
import Paper from 'material-ui/lib/paper';

const base = Rebase.createClass('https://vivid-fire-8661.firebaseio.com/');

class LandingView extends React.Component {
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
        <div className="hero-div">
          <div className="row center container white-text">
            <h1>WarframeLFG</h1>
            <h5 className="thinnest">
              A simple app to post and search for groups in Warframe.
            </h5>
          </div>
        </div>
        <Paper zDepth={1} rounded={false}>
          <div className="content-div">
            {this.state.loading ? <div className="center"> <CircularProgress size={2} /> </div> : <GroupPostings appData={this.state.appData} />}
          </div>
        </Paper>
        <div className="row footer-div">
          <div className="col s6">
            <div className="center">
              Twitter and Stuff
            </div>
          </div>
          <div className="col s6">
              Digital Extreme Ltd, Warframe and the logo Warframe are registered trademarks.
              All rights are reserved worldwide. This site has no official link with Digital Extremes Ltd or Warframe.
              All artwork, screenshots, characters or other recognizable features of the intellectual property relating to these trademarks are likewise the intellectual property of Digital Extreme Ltd.
          </div>
        </div>
      </div>
    )
  }
}

module.exports = LandingView;
