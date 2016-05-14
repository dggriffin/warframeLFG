import React from 'react';
import WarframeAdder from 'components/WarframeAdder';
import OpenSpotsSelect from 'components/OpenSpotsSelect';
import styles from 'styles/RequirementFields.scss';
import _ from 'underscore';

class RequirementFields extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        appData: props.appData,
        openSpots: 3,
        onChange: props.onChange,
        requirementObject: {openSpots: 3, haveWarframes: [{build: 'Any', name: 'Any'}], needWarframes: [{build: 'Any', name: 'Any'}, {build: 'Any', name: 'Any'}, {build: 'Any', name: 'Any'}]},
        warframeList: [{name: 'Any', build: 'Any'},{name: 'Any', build: 'Any'}, {name: 'Any', build: 'Any'}, {name: 'Any', build: 'Any'}]
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        appData: nextProps.appData
    });
  }

  openSpotsChangeCallback(openSpots){
    this.setState({
      openSpots
    });
    this.handleOnChange('openSpots', openSpots);
    this.handleWarframeChange(this.state.warframeList, openSpots);
  }

  handleOnChange(key, value) {
    let newValue = {};
    //Check if string since we're using this for textfield changes that return an event
    newValue[key] = typeof value === 'string' || typeof value === 'number' || _.isArray(value) ? value : value.currentTarget.value;
    let requirementObject = _.extend(this.state.requirementObject, newValue);
    this.setState({requirementObject});
    this.state.onChange(requirementObject);
  }

  handleWarframeChange(warframeList, openSpots) {
    let openSpotsUse = openSpots ? openSpots : this.state.openSpots;
    let haveCount = 4 - openSpotsUse;
    this.handleOnChange('haveWarframes', warframeList.slice(0, haveCount));
    this.handleOnChange('needWarframes', warframeList.slice(haveCount));
    this.setState({warframeList});
  }


  render() {
    return (
      <div>
        <div className={styles.row}>
          <div className={styles.colHalf}>
            <OpenSpotsSelect defaultValue={this.state.openSpots} onChangeCallback={this.openSpotsChangeCallback.bind(this)}/>
          </div>
        </div>
        <div className={styles.row}>
          <WarframeAdder
            appData={this.state.appData}
            openSpots={this.state.openSpots}
            warframes={this.state.appData.warframes}
            onChange={this.handleWarframeChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}

module.exports = RequirementFields;
