import React from 'react';
import HaveWarframesList from './HaveWarframesList/HaveWarframesList';
import NeedWarframesList from './NeedWarframesList/NeedWarframesList';
import OpenSpotsSelect from './OpenSpotsSelect/OpenSpotsSelect';
import styles from './RequirementFields.scss';

class RequirementFields extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        appData: props.appData
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        appData: nextProps.appData
    });
  }

  render() {
    return (
      <div className={styles.row}>
        <div className={styles.colHalf}>
          <OpenSpotsSelect/>
            <NeedWarframesList
              warframes={this.state.appData.warframes}
            />
        </div>
        <div className={styles.colHalf}>
          <HaveWarframesList
            warframes={this.state.appData.warframes}
          />
        </div>
      </div>
    );
  }
}

module.exports = RequirementFields;
