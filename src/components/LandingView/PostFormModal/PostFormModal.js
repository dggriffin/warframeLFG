import React from 'react';
import PostForm from './PostForm/PostForm';
import Dialog from 'material-ui/Dialog';

class PostFormModal extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        appData: props.appData,
        open: false
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      appData: nextProps.appData,
      open: nextProps.open
    });
  }

  handleClose(){
    this.setState({open: false});
  }

  render() {
    return (
      <div>
        <Dialog
          bodyStyle={{padding: 0}}
          modal={false}
          open={this.state.open}
          actionsContainerClassName={""}
          contentStyle={{width: '100%'}}
          onRequestClose={this.handleClose.bind(this)}
          autoScrollBodyContent={true}
        >
          <PostForm appData={this.state.appData} handleClose={this.handleClose.bind(this)}/>
        </Dialog>
      </div>
    );
  }
}


module.exports = PostFormModal;
