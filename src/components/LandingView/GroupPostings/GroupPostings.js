import React from 'react';
import PostFormModal from '../PostFormModal/PostFormModal';
import GroupPostingsToolbar from './GroupPostingsToolbar/GroupPostingsToolbar';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import GroupPost from './GroupPost/GroupPost';
import styles from './GroupPostings.scss';

import Rebase from 're-base';
const base = Rebase.createClass('https://vivid-fire-8661.firebaseio.com/');

import _ from 'underscore';


class GroupPostings extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      appData: props.appData,
      postFormOpen: false,
      posts: []
    };
  }

  componentDidMount(){
    this.ref = base.syncState('postings', {
      context: this,
      state: 'posts',
      asArray: true,
      queries: {
        orderByChild: 'createdOn',
        startAt: (new Date().getTime() - (3600000))
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      appData : nextProps.appData
    });
  }

  handleCreate(){
    this.setState({postFormOpen: true});
  }

  renderPosts() {
    var posts = this.state.filteredPosts ? this.state.filteredPosts : this.state.posts;
    var postMap = posts.map((post, index) => {
      return <GroupPost post={post} key={index} appData={this.state.appData}/>
    });
    return postMap.length ? postMap.reverse() : <div className={styles.noResults} style={{marginTop: '3em'}}>Sorry! There are no results that meet this criteria in the past hour.</div>
  }

  handleFilterChange(filter) {
    base.removeBinding(this.ref);

    if (filter.mission === '1') {
      this.ref = base.syncState('postings', {
        context: this,
        state: 'posts',
        asArray: true,
        then(){
          this.handleClientFilters(filter);
        }
      });
    } else {
      this.ref = base.syncState('postings', {
        context: this,
        state: 'posts',
        asArray: true,
        queries: {
          orderByChild: 'mission/name',
          equalTo: filter.mission
        },
        then(){
          this.handleClientFilters(filter);
        }
      });
    }
  }

  handleClientFilters(filter) {
    if (filter.mission === '1') {
      base.fetch('postings', {
        context: this,
        asArray: true,
        then (data) {
          let unfilteredPosts = data;
          let filteredPosts =  _.filter(unfilteredPosts, (post) => {
            return (filter.platform === '1' || post.platform === filter.platform) &&
            (filter.region === '1' || post.region === filter.region);
          });
          this.setState({filteredPosts: filteredPosts});
        }
      });
    } else {
      base.fetch('postings', {
        context: this,
        asArray: true,
        queries: {
          orderByChild: 'mission/name',
          equalTo: filter.mission
        },
        then (data) {
          let unfilteredPosts = data;
          let filteredPosts =  _.filter(unfilteredPosts, (post) => {
            return (filter.platform === '1' || post.platform === filter.platform) &&
            (filter.region === '1' || post.region === filter.region);
          });
          this.setState({filteredPosts: filteredPosts});
        }
      });
    }
  }

  render() {
    return (
      <div className='group-posting container'>
        <GroupPostingsToolbar
          onChange={this.handleFilterChange.bind(this)}
          appData={this.state.appData}
          onCreatePost={this.handleCreate.bind(this)}/>
        <Divider/>
        <List>
          {this.renderPosts()}
        </List>
      <PostFormModal
          appData={this.state.appData}
          open={this.state.postFormOpen}
      />
      </div>
    );
  }
}

module.exports = GroupPostings;
