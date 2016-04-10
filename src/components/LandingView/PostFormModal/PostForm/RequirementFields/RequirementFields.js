import React from 'react';
import WarframeAdder from './WarframeAdder/WarframeAdder';
import OpenSpotsSelect from './OpenSpotsSelect/OpenSpotsSelect';
import styles from './RequirementFields.scss';

class RequirementFields extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        appData: props.appData,
        openSpots: 3
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
          />
        </div>
      </div>
    );
  }
}

module.exports = RequirementFields;
