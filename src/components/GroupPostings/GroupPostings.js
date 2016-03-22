import React from 'react';
import PostFormModal from '../PostFormModal/PostFormModal';
import GroupPostingsToolbar from './GroupPostingsToolbar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Paper from 'material-ui/lib/paper';

class GroupPostings extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      appData: props.appData,
      postFormOpen: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      appData : nextProps.appData
    });
  }

  handleCreate(){
    this.setState({postFormOpen: true});
  }

  handleClose(){
    this.setState({postFormOpen: false});
  }

  renderPosts(){
    return this.state.appData.postings.map((post) => {
      return <Paper>
        <ListItem>
          <div className="post-title-div">
            <p className="post-title">{post.mission.name}</p>
            {post.mission.type}
          </div>
        </ListItem>
      </Paper>
    });
  }

  render() {
    return (
      <div className="group-posting container">
        <GroupPostingsToolbar appData={this.state.appData} onCreatePost={this.handleCreate.bind(this)}/>
        <Divider/>
        <List>
          {this.renderPosts()}
        </List>
      <PostFormModal
          appData={this.state.appData}
          open={this.state.postFormOpen}
          handleClose={this.handleClose.bind(this)}/>
      </div>
    );
  }
}

module.exports = GroupPostings;
