import React from 'react';
import WarframeSelect from './WarframeSelect/WarframeSelect';
import styles from './WarframeAdder.scss'
import question from 'images/question.png';
import Avatar from 'material-ui/lib/avatar';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import PersonAdd from 'material-ui/lib/svg-icons/social/person-add';
import Popover from 'material-ui/lib/popover/popover';
import MenuItem from 'material-ui/lib/menus/menu-item';


class WarframeAdder extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        appData: props.appData,
        warframes: props.warframes,
        openSpots: props.openSpots,
        warframeList: [{name: 'Any'},{name: 'Any'}, {name: 'Any'}, {name: 'Any'}],
        open: false
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

  renderMenuItems(){
    return Object.keys(this.state.warframes).map((warframe) => {
      return <MenuItem onTouchTap={this.handleMenuTouch.bind(this)} style={{overflowX: 'hidden'}} key={warframe} value={warframe} primaryText={warframe} />
    });
  }

  handleTouchTap(event){
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }

  handleMenuTouch(event){
    debugger;
    console.log(event.currentTarget.textContent);
    console.log(this.state.anchorEl.parentElement.key)
  }

  handleRequestClose(){
    this.setState({
      open: false
    });
  }

  renderHaveWarframes() {
    let haveCount = 4 - this.state.openSpots;
    let haveList = this.state.warframeList.slice(0, haveCount);
    let count = 0;
    return haveList.map((warframe) => {
      if (this.state.appData.warframes[warframe.name]) {
        return <div>
            <Avatar style={{height: '3.2em', width: '3.2em', border: '2.5px solid #4CAF50'}}backgroundColor={'#EDEDED'} className='warframe-img' src={this.state.appData.warframes[warframe.name].image}/>
            <button className={styles.add}>Hey</button>
        </div>
      }
        else {
          return <div key={count}><Avatar style={{height: '3.2em', width: '3.2em', border: '2.5px solid #4CAF50'}}backgroundColor={'#EDEDED'} className='warframe-img' src={question}/>
          <FloatingActionButton onTouchTap={this.handleTouchTap.bind(this)} secondary={true} className={styles.add} mini={true}>
            <PersonAdd />
          </FloatingActionButton>
          </div>
      }
      count++;
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
        return <div><Avatar style={{opacity: .6, height: '3em', width: '3em', border: '2.5px dotted grey'}}backgroundColor={'#EDEDED'} className='warframe-img' src={question}/>
        <FloatingActionButton  onTouchTap={this.handleTouchTap.bind(this)} secondary={true} className={styles.add} mini={true}>
          <PersonAdd />
        </FloatingActionButton>
        </div>
    }
    }, this);
  }

  render() {
    return (
      <div className={styles.wfWrapper}>
        <div style={{display: 'inline-block'}}>
          <div className={styles.label}>group composition</div>
          <div className={styles.wfAll}>
            <div className={styles.wfHave}>
              {this.renderHaveWarframes()}
            </div>
            {this.renderNeedWarframes()}
          </div>
        </div>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose.bind(this)}
          className={styles.popOver}
          animated={false}
        >
          {this.renderMenuItems()}
        </Popover>
      </div>
    );
  }
}

module.exports = WarframeAdder;
