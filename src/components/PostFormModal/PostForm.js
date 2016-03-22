import React from 'react';
import MissionFields from './MissionFields';

class PostForm extends React.Component{
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
      appData: nextProps.appData
    });
  }

  render() {
    return (
      <div>
        <MissionFields
          missions={this.state.appData.missions}
        />
      </div>
    );
  }
}

module.exports = PostForm;
