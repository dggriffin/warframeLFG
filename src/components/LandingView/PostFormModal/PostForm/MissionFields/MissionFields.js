import React from 'react';
import MissionQuestionSelect from './MissionQuestionSelect/MissionQuestionSelect';
import MissionSelect from './MissionSelect/MissionSelect';
import TextField from 'material-ui/lib/text-field';
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
        validation: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      missions: nextProps.missions
    });
  }

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
  }

  handleOnChange(key, value) {
    let newValue = {};
    //Check if string since we're using this for textfield changes that return an event
    newValue[key] = typeof value === 'string' ? value : value.currentTarget.value;
    let missionObject = _.extend(this.state.missionObject, newValue);
    this.setState({missionObject});
    this.state.onChange(missionObject);
  }

  renderMissionDetail() {
    if (!this.state.selectedMission) {
      return null;
    }
    //Reverse for non-alphabetic order..
    let keys = Object.keys(this.state.selectedMission).reverse();
    return keys.map((key) => {
      if (this.state.selectedMission[key] instanceof Array) {
        return <MissionQuestionSelect  onChange={this.handleOnChange.bind(this, key)} key={key + this.state.selectedMission['name']} keyName={key} valueList={this.state.selectedMission[key]}/>
      }
    });
  }

  render() {
    return (
      <div>
          <div className={styles.row}>
            <div className={styles.colHalf}>
                <MissionSelect
                  missions={this.state.missions}
                  selectHandler={this.handleMissionSelect.bind(this)}
                />
            </div>
            <div className={styles.colHalf}>
              {this.renderMissionDetail()}
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
