import React from 'react';
import PostForm from 'components/PostForm';
import Dialog from 'material-ui/Dialog';

class PostFormModal extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        appData: props.appData,
        open: false,
        handleClose: props.handleClose
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      appData: nextProps.appData,
      open: nextProps.open,
      handleClose: nextProps.handleClose
    });
  }

  handleClose(){
    this.setState({open: false});
    this.state.handleClose();
  }

  render() {
    return (
      <div>
        <Dialog
          bodyStyle={{padding: '0px'}}
          modal={false}
          open={this.state.open}
          contentStyle={{width: '100%', padding: 0}}
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
