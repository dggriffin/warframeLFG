var React = require('react');
var MissionTypeSelect = require('./MissionTypeSelect');
var MissionDetailSelect = require('./MissionDetailSelect');

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';


class PostFormModal extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        appData: props.appData,
        selectedMission: null,
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

  handleMissionSelect(mission){
    this.setState({
      list: this.state.selectedMission = mission
    });
  }

  renderMissionDetail(){
    return this.state.selectedMission ? <div className="col s6"> <h5 className="cyan-text">Mission Details:</h5> <MissionDetailSelect className="col s6" mission={this.state.selectedMission}/></div> : <div></div>
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
          title="Dialog With Actions"
          actions={this.getModalActions()}
          modal={false}
          open={this.state.open}
          onRequestClose={this.state.handleClose.bind(this)}
          >
          <div className="row">
            <div className="col s6">
              <h5 className="cyan-text">Mission Type:</h5>
              <MissionTypeSelect missions={this.state.appData.missions} selectHandler={this.handleMissionSelect.bind(this)}/>
            </div>
            {this.renderMissionDetail()}
          </div>
        </Dialog>
      </div>
    );
  }
}


module.exports = PostFormModal;
