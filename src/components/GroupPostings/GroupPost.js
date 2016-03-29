import React from 'react';
var {
  Image
} = React;
import ListItem from 'material-ui/lib/lists/list-item';
import Paper from 'material-ui/lib/paper';

import Rebase from 're-base';
const base = Rebase.createClass('https://vivid-fire-8661.firebaseio.com/');
import Avatar from 'material-ui/lib/avatar';
import Divider from 'material-ui/lib/divider';



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
      appData: nextProps.appData
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
    return this.state.post.haveWarframes.map((warframe) => {
      if (this.state.appData.warframes[warframe.name].image) {
        return <Avatar size={60} backgroundColor={'#EDEDED'} className="warframe-img" src={this.state.appData.warframes[warframe.name].image}/>
      }
    }, this);
  }

  renderNeedWarframes() {
    debugger;
    return this.state.post.needWarframes.map((warframe) => {
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
            <div ><span className="post-title cyan white-text">{this.state.post.creator}</span></div>
            <div>
              <span className="post-creator cyan-text thin">{this.state.post.mission.name +
                  " - " + this.state.post.mission.type + " " + this.state.post.mission.tier}</span>
                <div className="grey-text post-comment thin">{this.state.post.mission.comment}</div>
            </div>
            <span className="grey-text thin">{this.getElapsedTime() + " ago"}</span>
          </div>

          <div className="post-content-div">
            <div className="post-region-div">
              <span className="grey-text thin">{this.state.post.region}</span>
              <span className="grey-text thin">{this.state.post.platform}</span>
            </div>
          </div>

          <div className="post-footer-div">
            <div className="post-spots">
              <span className="grey-text thin">{this.state.post.spotsLeft + " open spots"}</span>
            </div>
            <div className="post-warframes">
              <span className="post-have-warframes-label pink-text thin">have</span>
              <div className="have-warframe-div">
                {this.renderHaveWarframes()}
              </div>
              <span className="post-need-warframes-label pink-text thin">need</span>
              <div className="need-warframe-div">
                {this.renderHaveWarframes()}
              </div>
            </div>
          </div>

        </ListItem>
      </Paper>
    );
  }
}

module.exports = GroupPost;
