import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RegionSelect from './RegionSelect/RegionSelect';
import PlatformSelect from './PlatformSelect/PlatformSelect';
import styles from './PlayerFields.scss';

class PlayerFields extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        appData: props.appData,
        userName: null,
        region: null,
        platform: null,
        onChange: props.onChange,
        validation: props.validation
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        appData: nextProps.appData,
        onChange: nextProps.onChange,
        validation: nextProps.validation
    });
  }

  onChangeUsername(event) {
    this.setState({userName: event.currentTarget.value});
    this.state.onChange({userName: event.currentTarget.value, region: this.state.region, platform: this.state.platform});
  }

  onChangeRegion(value) {
    this.setState({region: value});
    this.state.onChange({userName: this.state.userName, region: value, platform: this.state.platform});
  }

  onChangePlatform(value) {
    this.setState({platform: value});
    this.state.onChange({userName: this.state.userName, region: this.state.region, platform: value});
  }

  render() {
    return (
      <div>
        <div className={styles.row}>
          <div className={styles.colHalf}>
            <TextField
              floatingLabelText='username'
              style={{ fontSize: '1em', width: '90%', overflow: 'hidden', display: 'inline-block', overflow: 'visible'}}
              floatingLabelStyle={{fontSize: '1.2em'}}
              multiLine={true}
              onBlur={this.onChangeUsername.bind(this)}
              errorText={this.state.validation.userName ? '' : 'This field is required'}
            />
          </div>
          <div className={styles.colHalf}>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.colHalf}>
            <PlatformSelect
              platforms={this.state.appData.platforms}
              onChange={this.onChangePlatform.bind(this)}
              errorText={this.state.validation.platform ? '' : 'This field is required'}
            />
          </div>
          <div className={styles.colHalf}>
            <RegionSelect
              regions={this.state.appData.regions}
              onChange={this.onChangeRegion.bind(this)}
              errorText={this.state.validation.region ? '' : 'This field is required'}
            />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = PlayerFields;
