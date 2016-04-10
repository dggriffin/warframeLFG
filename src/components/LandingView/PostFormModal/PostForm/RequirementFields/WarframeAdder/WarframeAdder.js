import React from 'react';
import styles from './WarframeAdder.scss'
import question from 'images/question.png';
import Avatar from 'material-ui/lib/avatar';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import PersonAddIcon from 'material-ui/lib/svg-icons/social/person-add';
import EditIcon from 'material-ui/lib/svg-icons/image/edit';
import Popover from 'material-ui/lib/popover/popover';
import MenuItem from 'material-ui/lib/menus/menu-item';
import _ from 'underscore';


class WarframeAdder extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        appData: props.appData,
        warframes: props.warframes,
        openSpots: props.openSpots,
        warframeList: [{name: 'Any', build: 'Any'},{name: 'Any', build: 'Any'}, {name: 'Any', build: 'Any'}, {name: 'Any', build: 'Any'}],
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
    var warframeList = _.clone(this.state.warframeList);
    warframeList[this.state.anchorEl.id].name = event.currentTarget.textContent;
    this.setState({warframeList, open: false});
  }

  handleRequestClose(){
    this.setState({
      open: false
    });
  }

  renderHaveWarframes() {
    let haveCount = 4 - this.state.openSpots;
    let haveList = this.state.warframeList.slice(0, haveCount);
    return haveList.map((warframe, index) => {
      if (this.state.appData.warframes[warframe.name]) {
        return <div key={index}><Avatar style={{height: '3.2em', width: '3.2em', border: '2.5px solid #4CAF50'}}backgroundColor={'#EDEDED'} className='warframe-img' src={this.state.appData.warframes[warframe.name].image}/>
        <FloatingActionButton id={index} onTouchTap={this.handleTouchTap.bind(this)} secondary={true} className={styles.add} mini={true}>
          <EditIcon />
        </FloatingActionButton>
        </div>
      }
        else {
          return <div key={index}><Avatar style={{height: '3.2em', width: '3.2em', border: '2.5px solid #4CAF50'}}backgroundColor={'#EDEDED'} className='warframe-img' src={question}/>
          <FloatingActionButton id={index} onTouchTap={this.handleTouchTap.bind(this)} secondary={true} className={styles.add} mini={true}>
            <PersonAddIcon />
          </FloatingActionButton>
          </div>
      }
    }, this);
  }

  renderNeedWarframes() {
    let haveCount = 4 - this.state.openSpots;
    let needList = this.state.warframeList.slice(haveCount);
    return needList.map((warframe, index) => {
      if (this.state.appData.warframes[warframe.name]) {
        return <div key={index + haveCount}><Avatar style={{opacity: .6, height: '3em', width: '3em', border: '2.5px dotted grey'}}backgroundColor={'#EDEDED'} className='warframe-img' src={this.state.appData.warframes[warframe.name].image}/>
        <FloatingActionButton id={index + haveCount} onTouchTap={this.handleTouchTap.bind(this)} secondary={true} className={styles.add} mini={true}>
          <EditIcon />
        </FloatingActionButton>
        </div>
      }
      else {
        return <div key={index + haveCount}><Avatar style={{opacity: .6, height: '3em', width: '3em', border: '2.5px dotted grey'}}backgroundColor={'#EDEDED'} className='warframe-img' src={question}/>
        <FloatingActionButton id={index + haveCount} onTouchTap={this.handleTouchTap.bind(this)} secondary={true} className={styles.add} mini={true}>
          <PersonAddIcon />
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
          <MenuItem
            focusState='keyboard-focused'
            onTouchTap={this.handleMenuTouch.bind(this)}
            style={{overflowX: 'hidden'}}
            value='Any'
            primaryText='Any' />
          {this.renderMenuItems()}
        </Popover>
      </div>
    );
  }
}

module.exports = WarframeAdder;
