import React from 'react';
import PostForm from './PostForm';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';


class PostFormModal extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        appData: props.appData,
        open: false,
        handleClose: () => {}
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      appData: nextProps.appData,
      open: nextProps.open,
      handleClose: nextProps.handleClose
    });
  }

  getModalActions(){
    return [
          <FlatButton
            label="Cancel"
            secondary={true}
            onClick={this.state.handleClose.bind(this)}
            />
          ,
          <FlatButton
            label="Submit"
            primary={true}
            keyboardFocused={true}
            onClick={this.state.handleClose.bind(this)}
            />
        ];
  }

  render() {
    return (
      <div>
        <Dialog
          bodyStyle={{padding: "0 !important"}}
          modal={false}
          actions={this.getModalActions()}
          open={this.state.open}
          actionsContainerClassName={""}
          onRequestClose={this.state.handleClose.bind(this)}
        >
          <PostForm appData={this.state.appData}/>
        </Dialog>
      </div>
    );
  }
}


module.exports = PostFormModal;
