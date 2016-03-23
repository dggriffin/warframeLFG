import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import Paper from 'material-ui/lib/paper';

class GroupPost extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      post: props.post
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      post : nextProps.post
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

  render() {
    return (
      <Paper>
        <ListItem>
          <div className="post-title-div">
            <span className="post-title">{this.state.post.mission.name}</span>
            <span className="post-title grey-text">{this.state.post.mission.type}</span>
            <span className="post-title grey-text">{this.state.post.mission.tier}</span>
            <span className="post-time grey-text">{this.getElapsedTime() + " ago"}</span>
          </div>
          <div>
            <span className="grey-text">Posted by: {this.state.post.creator}</span>
          </div>
        </ListItem>
      </Paper>
    );
  }
}

module.exports = GroupPost;
