import React from 'react';
import Divider from 'material-ui/lib/divider';
import MissionFields from './MissionFields/MissionFields';
import PlayerFields from './PlayerFields/PlayerFields';
import RequirementFields from './RequirementFields/RequirementFields';
import Stepper from 'material-ui/lib/Stepper/Stepper';
import Step from 'material-ui/lib/Stepper/HorizontalStep';
import FontIcon from 'material-ui/lib/font-icon';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

class PostForm extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        appData: props.appData,
        selectedMission: null,
        open: false,
        handleClose: () => {},
        activeStep: -1,
        lastActiveStep: 0
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      appData: nextProps.appData
    });
  }

  componentDidMount(){
    this.setState({activeStep: 0});
  }

  selectStep(currentStep) {
    const {
      lastActiveStep,
      activeStep,

    } = this.state;

    if (currentStep > lastActiveStep) {
      return;
    }

    this.setState({
      activeStep: currentStep,
      lastActiveStep: Math.max(lastActiveStep, activeStep),
    });
  }

  updateCompletedSteps(currentStep) {
    return currentStep < this.state.lastActiveStep;
  }

  createIcon(step) {
    if (step.props.isCompleted) {
      return (
        <FontIcon className="material-icons" style={{fontSize: 14}}>
          done
        </FontIcon>
      );
    }

    return <span>{step.props.orderStepLabel}</span>;
  }

  continue() {
    const {
      activeStep,
      lastActiveStep,
    } = this.state;

    this.setState({
      activeStep: activeStep + 1,
      lastActiveStep: Math.max(lastActiveStep, activeStep + 1),
    });
  }

  render() {
    return (
      <Stepper
        horizontal={true}
        activeStep={this.state.activeStep}
        onStepHeaderTouch={this.selectStep.bind(this)}
        updateCompletedStatus={this.updateCompletedSteps.bind(this)}
        createIcon={this.createIcon}
        containerStyle={{padding: 24, height: 'auto'}}
      >
        <Step
          orderStepLabel="1"
          stepLabel="user details"
        >
          <PlayerFields
            appData={this.state.appData}
          />
        </Step>
        <Step
          orderStepLabel="2"
          stepLabel="mission details"
          actions={[
            <RaisedButton
              key={0}
              label="Continue"
              primary={true}
              onClick={this.continue.bind(this)}
            />,
            <FlatButton key={1} label="Cancel" />,
          ]}
        >
          <MissionFields
            missions={this.state.appData.missions}
          />
        </Step>
        <Step
          orderStepLabel="3"
          stepLabel="party details"
          actions={[
            <RaisedButton
              key={0}
              label="Finish"
              primary={true}
              onClick={this.continue.bind(this)}
            />,
            <FlatButton key={1} label="Cancel" />,
          ]}
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
