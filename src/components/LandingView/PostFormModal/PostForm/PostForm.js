import React from 'react';
import _ from 'underscore';
import Rebase from 're-base';
const base = Rebase.createClass('https://vivid-fire-8661.firebaseio.com/');

import MissionFields from './MissionFields/MissionFields';
import PlayerFields from './PlayerFields/PlayerFields';
import RequirementFields from './RequirementFields/RequirementFields';

import {
  Stepper,
  Step,
  StepLabel
} from 'material-ui/Stepper';
import {RaisedButton, FlatButton} from 'material-ui';

class PostForm extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
      appData: props.appData,
      open: false,
      handleClose: props.handleClose,
      stepIndex: 0,
      finished: false,
      lastActiveStep: 0,
      playerObject: {},
      missionObject: {},
      requirementObject: {openSpots: 3, haveWarframes: [{build: 'Any', name: 'Any'}], needWarframes: [{build: 'Any', name: 'Any'}, {build: 'Any', name: 'Any'}, {build: 'Any', name: 'Any'}]},
      playerValid: null,
      missionValid: null,
      requirementValid: null
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      appData: nextProps.appData,
      handleClose: nextProps.handleClose
    });
  }

  componentDidMount(){
    this.setState({stepIndex: 0});
  }

  handlePlayerFormChange(playerForm) {
    this.setState({playerObject: playerForm});
  }

  handleMissionFormChange(missionForm) {
    this.setState({missionObject: missionForm});
  }

  handleRequirementFormChange(requirementForm) {
    this.setState({requirementObject: requirementForm});
  }

  validatePlayerFields(){
    const playerObject = this.state.playerObject;
    const playerValid = {userName: !!playerObject.userName, region: !!playerObject.region, platform: !!playerObject.platform};
    this.setState({playerValid});
    return playerObject.userName && playerObject.region && playerObject.platform;
  }

  validateMissionFields(){
    const missionObject = this.state.missionObject;
    let missionValid = {mission: false, comment: true};

    _.each(_.keys(missionObject), (key) => {
      missionValid[key] = !!missionObject[key];
    });
    this.setState({missionValid});

    return _.reduce(_.keys(missionValid), (memo, key) => {
      return memo && missionValid[key];
    }, true);
  }

  triggerNextStep() {
    const {
      stepIndex,
      lastActiveStep
    } = this.state;

    let valid = true;
    switch(stepIndex){
      case 0:
      valid = this.validatePlayerFields();
      break;
      case 1:
      valid = this.validateMissionFields();
      break;
      case 2:
      valid = true;
      this.submitPost();
      break;
    }

    if (valid) {
      this.setState({
        stepIndex: stepIndex + 1,
        lastActiveStep: Math.max(lastActiveStep, stepIndex + 1)
      });
    }
  }

  renderStepActions(stepNumber) {
    return [
      <RaisedButton
        key={0}
        label={stepNumber === 3 ? 'Finish' : 'Continue'}
        primary={true}
        onClick={this.triggerNextStep.bind(this)}
        />
      ,
      <FlatButton
        key={1}
        label='Cancel'
        onClick={this.state.handleClose} />
    ];
  }

  submitPost() {
    let postObject = {};
    postObject.createdOn = new Date().getTime();
    postObject.creator = this.state.playerObject.userName;
    postObject.platform = this.state.playerObject.platform;
    postObject.region = this.state.playerObject.region;
    postObject.mission = this.state.missionObject;
    postObject.mission.name = this.state.missionObject.mission;
    postObject.haveWarframes = this.state.requirementObject.haveWarframes;
    postObject.needWarframes = this.state.requirementObject.needWarframes;
    postObject.spotsLeft = this.state.requirementObject.openSpots;

    //better way to handle scope?
    let me = this;
    base.push('postings', {
      data: postObject,
      then(){
        me.state.handleClose();
      }
    });
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
      return <PlayerFields
        validation={this.state.playerValid}
        appData={this.state.appData}
        onChange={this.handlePlayerFormChange.bind(this)}
        />
      case 1:
      return  <MissionFields
        validation={this.state.missionValid}
        missions={this.state.appData.missions}
        onChange={this.handleMissionFormChange.bind(this)}
        appData ={this.state.appData}
        />
      case 2:
      return  <RequirementFields
        appData={this.state.appData}
        onChange={this.handleRequirementFormChange.bind(this)}
        />
      default :
      return 'Oops';
    }
  }

  render() {
    const {finished, stepIndex} = this.state;
    return (
      <div>
        <Stepper style={{padding: 15, backgroundColor: 'rgb(232, 232, 232)'}}
          activeStep={stepIndex}
          >
          <Step>
            <StepLabel>
              user details
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              mission details
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              party details
            </StepLabel>
          </Step>
        </Stepper>
        <div style={{height: 'auto', width: 'auto', padding: '1em'}}>
          <div>
            {this.getStepContent(stepIndex)}
          </div>
          <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '5em'}}>
            {this.renderStepActions(stepIndex)}
          </div>
        </div>
      </div>
    );
  }
}

module.exports = PostForm;
