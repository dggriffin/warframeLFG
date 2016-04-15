import React from 'react';
import MissionFields from './MissionFields/MissionFields';
import PlayerFields from './PlayerFields/PlayerFields';
import RequirementFields from './RequirementFields/RequirementFields';
import Stepper from 'material-ui/Stepper/Stepper';
import Step from 'material-ui/Stepper/Step';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Done from 'material-ui/svg-icons/action/done';
import _ from 'underscore';

import Rebase from 're-base';
const base = Rebase.createClass('https://vivid-fire-8661.firebaseio.com/');

class PostForm extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        appData: props.appData,
        open: false,
        handleClose: props.handleClose,
        activeStep: -1,
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
    this.setState({activeStep: 0});
  }

  selectStep(currentStep) {
    const {
      lastActiveStep,
      activeStep
    } = this.state;

    if (currentStep > lastActiveStep) {
      return;
    }

    this.setState({
      activeStep: currentStep,
      lastActiveStep: Math.max(lastActiveStep, activeStep)
    });
  }

  updateCompletedSteps(currentStep) {
    return currentStep < this.state.lastActiveStep;
  }

  renderStepIcon(step) {
    if (step.props.isCompleted) {
      return (
        <Done/>
      );
    }
    return <span>{step.props.orderStepLabel}</span>;
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

  continue() {
    const {
      activeStep,
      lastActiveStep
    } = this.state;
    let valid = true;
    switch(activeStep){
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
        activeStep: activeStep + 1,
        lastActiveStep: Math.max(lastActiveStep, activeStep + 1)
      });
    }
  }

  renderStepActions(stepNumber) {
    return [<RaisedButton
                  key={0}
                  label={stepNumber === 3 ? 'Finish' : 'Continue'}
                  primary={true}
                  onClick={this.continue.bind(this)}
                />,
              <FlatButton key={1} label='Cancel' onClick={this.state.handleClose} />];
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

  render() {
    return (
      <Stepper
        horizontal={true}
        activeStep={this.state.activeStep}
        onStepHeaderTouch={this.selectStep.bind(this)}
        updateCompletedStatus={this.updateCompletedSteps.bind(this)}
        createIcon={this.renderStepIcon}
        containerStyle={{paddingTop: 5, height: 'auto', width: 'auto'}}
      >
        <Step
          orderStepLabel='1'
          stepLabel='user details'
          actions={this.renderStepActions(1)}
        >
          <PlayerFields
            validation={this.state.playerValid}
            appData={this.state.appData}
            onChange={this.handlePlayerFormChange.bind(this)}
          />
        </Step>
        <Step
          orderStepLabel='2'
          stepLabel='mission details'
          actions={this.renderStepActions(2)}
        >
          <MissionFields
            validation={this.state.missionValid}
            missions={this.state.appData.missions}
            onChange={this.handleMissionFormChange.bind(this)}
            appData ={this.state.appData}
          />
        </Step>
        <Step
          orderStepLabel='3'
          stepLabel='party details'
          actions={this.renderStepActions(3)}
        >
          <RequirementFields
            appData={this.state.appData}
            onChange={this.handleRequirementFormChange.bind(this)}
          />
        </Step>
      </Stepper>
    );
  }
}

module.exports = PostForm;
