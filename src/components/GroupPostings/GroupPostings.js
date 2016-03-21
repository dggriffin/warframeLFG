var React = require('react');
const PostFormModal = require('../PostFormModal/PostFormModal');
const GroupPostingsToolbar = require('./GroupPostingsToolbar');

import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';

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
