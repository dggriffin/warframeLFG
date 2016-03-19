require('normalize.css');
require('styles/App.css');
require('styles/css/materialize.css');
var Rebase = require('re-base');
//var AddItem = require('./AddItem');
var PostForm = require('./CreateModal/PostForm');
var base = Rebase.createClass('https://vivid-fire-8661.firebaseio.com/');

import React from 'react';

class AppComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      list: [],
      loading: true
    }
  }
  componentDidMount(){
    this.ref = base.syncState('missions', {
      context: this,
      state: 'list',
      asArray: true,
      then(){
        this.setState({loading: false})
      }
    });
  }
  componentWillUnmount(){
    base.removeBinding(this.ref);
  }
  handleAddItem(newItem){
    this.setState({
      list: this.state.list.concat([newItem])
    });
  }
  handleRemoveItem(index){
    var newList = this.state.list;
    newList.splice(index, 1);
    this.setState({
      list: newList
    })
  }

  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-offset-3">
            <div className="col-sm-12">
              <h3 className="text-center">WarframeLFG</h3>
              <a className="waves-effect waves-light btn modal-trigger cyan" href="#modal1">Post</a>
            </div>
          </div>
        </div>
        <div id="modal1" className="modal">
          <div className="modal-content">
              <PostForm missions={this.state.list} />
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat cyan white-text">Agree</a>
          </div>
        </div>
      </div>
    )
  }
}

AppComponent.defaultProps = {
};

module.exports = AppComponent;
