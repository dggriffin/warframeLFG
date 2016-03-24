import React from 'react';
import TextField from 'material-ui/lib/text-field';
import HaveWarframesList from './HaveWarframesList';
import NeedWarframesList from './NeedWarframesList';
import OpenSpotsSelect from './OpenSpotsSelect';
import Divider from 'material-ui/lib/divider';

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
      <div className="row">
      <div className="col s12">
        <span className='cyan-text'>party details</span>
      </div>
        <div className="col s6">
          <OpenSpotsSelect/>
            <NeedWarframesList
              warframes={this.state.appData.warframes}
            />
        </div>
        <div className="col s6">
          <HaveWarframesList
            warframes={this.state.appData.warframes}
          />
        </div>
      </div>
    );
  }
}

module.exports = RequirementFields;
