import React from 'react';
import PostFormModal from '../PostFormModal/PostFormModal';
import GroupPostingsToolbar from './GroupPostingsToolbar';
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';
import GroupPost from './GroupPost';

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
      return <GroupPost post={post}/>
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
