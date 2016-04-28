require('styles/App.css');
import Rebase from 're-base';
import GroupPostings from './GroupPostings/GroupPostings';
import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import styles from './LandingView.scss'

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
        <div className={styles.heroDiv}>
          <div>
            <h1 className={styles.title}>WarframeLFG</h1>
          </div>

          <h5 className={styles.titleSubtext}>
            A simple app to post and search for groups in Warframe.
          </h5>
        </div>
        <Paper zDepth={1} rounded={false}>
          <div className={styles.content}>
            {this.state.loading ? <div className={styles.loader}> <CircularProgress size={2} /> </div> : <GroupPostings appData={this.state.appData} />}
          </div>
        </Paper>
        <div className={styles.footer}>
          <div className={styles.footerHalfColumn}>
            <div>
              Twitter and Stuff
            </div>
          </div>
          <div className={styles.footerHalfColumn}>
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
