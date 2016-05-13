import React from 'react';
import MissionQuestionSelect from './MissionQuestionSelect/MissionQuestionSelect';
import MissionSelect from './MissionSelect/MissionSelect';
import TextField from 'material-ui/TextField';
import styles from './MissionFields.scss';
import _ from 'underscore';

class MissionFields extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        missions: props.missions,
        selectedMission: null,
        missionObject: {},
        onChange: props.onChange,
        validation: props.validation,
        farmType: null,
        appData: props.appData
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      missions: nextProps.missions,
      appData: nextProps.appData,
      validation: nextProps.validation
    });
  }

  //handle main mission dropdown
  handleMissionSelect(mission){
    this.setState({
      list: this.state.selectedMission = mission
    });

    let missionObject = {};
    _.each(_.keys(mission), (key) => {
      if(key !== 'name') {
        missionObject[key] = null;
      }
    });
    missionObject.mission = mission.name;
    this.setState({missionObject});
    this.state.onChange(missionObject);
  }

  //onChange callback/postObj handle for all subquestions
  handleOnChange(key, value) {
    //temporary hack to prevent long comments
    if (key === 'comment') {
      value = value.substr(0, 200);
    }
    
    let newValue = {};
    //Check if string since we're using this for textfield changes that return an event
    newValue[key] = typeof value === 'string' ? value : value.currentTarget.value;
    let missionObject = _.extend(this.state.missionObject, newValue);

    //Special case for 'farming' type
    if (key === 'type' && missionObject.mission === 'Farming') {
        this.setState({farmType: value});
        missionObject.what = null;
        this.setState({missionObject});
    }

    this.setState({missionObject});
    this.state.onChange(missionObject);
  }

  //Rendering for subquestions
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

  //Hacky solution to handle farming dropdown..
  renderWhatSelect() {
    if (this.state.selectedMission && this.state.selectedMission.name === 'Farming' && this.state.farmType) {
      let dataList = [];
      let appData = this.state.appData;
      switch(this.state.farmType) {
        case 'Affinity':
          dataList = _.keys(appData.affinity);
          break;
        case 'Resources':
          dataList = appData.resources;
          break;
        case 'Warframe Parts':
          dataList = _.keys(appData.warframes);
          break;
        case 'Archwing Parts':
          dataList = _.keys(appData.archwing);
          break;
        case 'Void Keys':
          dataList = _.keys(appData.void);
          break;
      }
      return <MissionQuestionSelect
        key={this.state.farmType}
        onChange={this.handleOnChange.bind(this, 'what')}
        keyName='what'
        errorText={!this.state.validation || this.state.validation.what ? '' : 'This field is required'}
        valueList={dataList}/>
    }
  }

  render() {
    return (
      <div>
          <div className={styles.row}>
            <div className={styles.colHalf}>
                <MissionSelect
                  missions={this.state.missions}
                  selectHandler={this.handleMissionSelect.bind(this)}
                  errorText={!this.state.validation || this.state.validation.mission ? '' : 'This field is required'}
                />
            </div>
            <div className={styles.colHalf}>
              {this.renderMissionDetail()}
              {this.renderWhatSelect()}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <TextField
                style={{ fontSize: '1em', width: '100%', overflow: 'hidden', display: 'inline-block'}}
                floatingLabelStyle={{fontSize: '1.2em'}}
                floatingLabelText='comment'
                multiLine={true}
                onBlur={this.handleOnChange.bind(this, 'comment')}
              />
            </div>
          </div>
      </div>
    );
  }
}

module.exports = MissionFields;
