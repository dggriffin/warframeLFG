import React from 'react';
var {
  Image
} = React;
import ListItem from 'material-ui/lib/lists/list-item';
import Paper from 'material-ui/lib/paper';

import Rebase from 're-base';
const base = Rebase.createClass('https://vivid-fire-8661.firebaseio.com/');


class GroupPost extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      post: props.post,
      appData: props.appData
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      post : nextProps.post,
      appData: props.appData
    });
  }

  getElapsedTime(){
    var date = new Date(this.state.post.createdOn);
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  renderHaveWarframes() {
    debugger;
    return this.state.post.haveWarframes.map((warframe) => {
      if (this.state.appData.warframes[warframe.name].image) {
        return <img className="warframe-img" src={this.state.appData.warframes[warframe.name].image}/>
      }
    }, this);
  }

  render() {
    return (
      <Paper>
        <ListItem>
          <div className="post-title-div">
            <span className="post-title cyan-text">{this.state.post.mission.name}</span>
            <span className="post-title grey-text">{this.state.post.mission.type}</span>
            <span className="post-title grey-text">{this.state.post.mission.tier}</span>
            <span className="post-time grey-text">{this.getElapsedTime() + " ago"}</span>
          </div>
          <div className="post-content-div">
            <span className="pink-text">Posted by: {this.state.post.creator}</span>
            <div className="have-warframe-div">
              {this.renderHaveWarframes()}
            </div>
            <div className="need-warframe-div">
              {this.renderHaveWarframes()}
            </div>
          </div>
        </ListItem>
      </Paper>
    );
  }
}

module.exports = GroupPost;
