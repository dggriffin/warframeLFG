import React from 'react';
import WarframeSelect from './WarframeSelect/WarframeSelect';
import styles from './WarframeAdder.scss'
import question from 'images/question.png';
import Avatar from 'material-ui/lib/avatar';

class WarframeAdder extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        appData: props.appData,
        warframes: props.warframes,
        openSpots: props.openSpots,
        warframeList: [{name: 'Any'},{name: 'Any'}, {name: 'Any'}, {name: 'Any'}]
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        warframes: nextProps.warframes,
        openSpots: nextProps.openSpots
    });
  }

  handleChange (event, index, value) {
    this.setState({value});
    //this.state.selectHandler(value);
  }

  renderHaveWarframes() {
    let haveCount = 4 - this.state.openSpots;
    let haveList = this.state.warframeList.slice(0, haveCount);
    return haveList.map((warframe) => {
      if (this.state.appData.warframes[warframe.name]) {
        return <Avatar style={{height: '3.2em', width: '3.2em', border: '2.5px solid #4CAF50'}}backgroundColor={'#EDEDED'} className='warframe-img' src={this.state.appData.warframes[warframe.name].image}/>
      }
      else {
        return <Avatar style={{height: '3.2em', width: '3.2em', border: '2.5px solid #4CAF50'}}backgroundColor={'#EDEDED'} className='warframe-img' src={question}/>
      }
    }, this);
  }

  renderNeedWarframes() {
    let haveCount = 4 - this.state.openSpots;
    let needList = this.state.warframeList.slice(haveCount);
    return needList.map((warframe) => {
      if (this.state.appData.warframes[warframe.name]) {
        return <Avatar style={{opacity: .6, height: '3em', width: '3em', border: '2.5px dotted grey'}}backgroundColor={'#EDEDED'} className='warframe-img' src={this.state.appData.warframes[warframe.name].image}/>
      }
      else {
        return <Avatar style={{opacity: .6, height: '3em', width: '3em', border: '2.5px dotted grey'}}backgroundColor={'#EDEDED'} className='warframe-img' src={question}/>
      }
    }, this);
  }

  render() {
    return (
      <div className={styles.wfWrapper}>
        <div style={{display: 'inline-block'}}>
          <div className={styles.wfAll}>
            <div className={styles.wfHave}>
              {this.renderHaveWarframes()}
            </div>
            {this.renderNeedWarframes()}
          </div>
        </div>
      </div>
    );
  }
}

module.exports = WarframeAdder;
