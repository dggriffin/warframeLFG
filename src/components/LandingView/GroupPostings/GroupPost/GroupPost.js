import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import Paper from 'material-ui/lib/paper';
import Avatar from 'material-ui/lib/avatar';
import styles from './GroupPost.scss';

class GroupPost extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      post: props.post,
      appData: props.appData
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      post : nextProps.post,
      appData: nextProps.appData
    });
  }

  getElapsedTime(){
    var date = new Date(this.state.post.createdOn);
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + ' years';
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + ' months';
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + ' days';
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + ' hours';
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + ' minutes';
    }
    return Math.floor(seconds) + ' seconds';
  }

  renderHaveWarframes() {
    return this.state.post.haveWarframes.map((warframe) => {
      if (this.state.appData.warframes[warframe.name].image) {
        return <Avatar style={{height: '3.2em', width: '3.2em', border: '2.5px solid #4CAF50'}}backgroundColor={'#EDEDED'} className='warframe-img' src={this.state.appData.warframes[warframe.name].image}/>
      }
    }, this);
  }

  renderNeedWarframes() {
    return this.state.post.needWarframes.map((warframe) => {
      if (this.state.appData.warframes[warframe.name].image) {
        return <Avatar style={{opacity: .6, height: '3em', width: '3em', border: '2.5px dotted grey'}}backgroundColor={'#EDEDED'} className='warframe-img' src={this.state.appData.warframes[warframe.name].image}/>
      }
    }, this);
  }

  render() {
    return (
      <Paper className={styles.groupPost}>
        <ListItem>
          <div className={styles.rowMaster}>

            <div className={styles.rowWrapper}>

              <div className={styles.column}>
                <div style={{paddingBottom: 20}}><span className={styles.title}>{this.state.post.creator}</span></div>
                <span className={styles.primaryText}>{this.state.post.mission.name +
                    ' - ' + this.state.post.mission.type + ' ' + this.state.post.mission.tier}</span>
                  <div style={{paddingBottom: 20}} className={styles.secondaryText}>{this.state.post.mission.comment}</div>
                <div className={styles.column}>
                  <span className={styles.secondaryText}>{this.state.post.platform}</span>
                  <span className={styles.secondaryText}>{this.state.post.region}</span>
                </div>
              </div>

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

            </div>

            <div className={styles.metaDataColumn}>
              <span className={styles.secondaryText}>{this.getElapsedTime() + ' ago'}</span>
              <span className={styles.secondaryText}>{this.state.post.spotsLeft + ' open spot(s)'}</span>
            </div>

        </div>
        </ListItem>
      </Paper>
    );
  }
}

module.exports = GroupPost;
