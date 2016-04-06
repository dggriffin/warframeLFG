import React from 'react';
import MissionFields from './MissionFields/MissionFields';
import PlayerFields from './PlayerFields/PlayerFields';
import RequirementFields from './RequirementFields/RequirementFields';
import Stepper from 'material-ui/lib/Stepper/Stepper';
import Step from 'material-ui/lib/Stepper/HorizontalStep';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Done from 'material-ui/lib/svg-icons/action/done';

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
        requirementObject: {}
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

  continue() {
    const {
      activeStep,
      lastActiveStep
    } = this.state;

    this.setState({
      activeStep: activeStep + 1,
      lastActiveStep: Math.max(lastActiveStep, activeStep + 1)
    });
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

  render() {
    return (
      <Stepper
        horizontal={true}
        activeStep={this.state.activeStep}
        onStepHeaderTouch={this.selectStep.bind(this)}
        updateCompletedStatus={this.updateCompletedSteps.bind(this)}
        createIcon={this.renderStepIcon}
        containerStyle={{paddingTop: 6, height: 'auto'}}
      >
        <Step
          orderStepLabel='1'
          stepLabel='user details'
          actions={this.renderStepActions(1)}
        >
          <PlayerFields
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
            missions={this.state.appData.missions}
          />
        </Step>
        <Step
          orderStepLabel='3'
          stepLabel='party details'
          actions={this.renderStepActions(3)}
        >
          <RequirementFields
            appData={this.state.appData}
          />
        </Step>
      </Stepper>
    );
  }
}

module.exports = PostForm;
