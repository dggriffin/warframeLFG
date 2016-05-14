import React from 'react';

import MissionQuestionSelect from 'components/MissionQuestionSelect';
import styles from 'styles/AdvancedFilters.scss';

class AdvancedFilters extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
      appData: props.appData,
      selectedMission: null,
      onChangeCallback: props.onChangeCallback
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedMission: nextProps.selectedMission,
      onChangeCallback: nextProps.onChangeCallback
    });
  }

  handleOnChange(key, value){
    this.state.onChangeCallback(key, value);
  }

  renderMissionDetail() {
    if (!this.state.selectedMission) {
      return null;
    }
    //Reverse for non-alphabetic order..
    let keys = Object.keys(this.state.selectedMission).reverse();
    return keys.map((key) => {
      //handle the 'what' key separately, because it's dependent on the 'type' question
      if (this.state.selectedMission[key] instanceof Array && key !== 'what') {
        return <MissionQuestionSelect
          onChange={this.handleOnChange.bind(this, key)}
          key={key + this.state.selectedMission['name']}
          keyName={key}
          errorText={!this.state.validation || this.state.validation[key] ? '' : 'This field is required'}
          valueList={this.state.selectedMission[key]}/>
      }
    });
  }

  render() {
    return (
      <div>
        {this.renderMissionDetail()}
      </div>
    );
  }
}

module.exports = AdvancedFilters;
