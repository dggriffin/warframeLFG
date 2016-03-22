import React from 'react';
import PostFormModal from '../PostFormModal/PostFormModal';
import GroupPostingsToolbar from './GroupPostingsToolbar';

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

  render() {
    return (
      <div className="container">
        <GroupPostingsToolbar appData={this.state.appData} onCreatePost={this.handleCreate.bind(this)}/>
        <PostFormModal
          appData={this.state.appData}
          open={this.state.postFormOpen}
          handleClose={this.handleClose.bind(this)}/>
      </div>
    );
  }
}

module.exports = GroupPostings;
