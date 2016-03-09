PostForm = React.createClass({
  propTypes: {
    missions: React.PropTypes.array.isRequired
  },
  render() {
    return (
      <div className="card padding-6">
        <div className="row">
          <div className="col s6">
            <h5 className="cyan-text">1) Looking For...</h5>
            <MissionTypeSelect missions={this.props.missions}/>
          </div>
          <div className="col s6">
            <h5 className="cyan-text">2) Of Type...</h5>
            <MissionDetailSelect className="col s6"/>
          </div>
        </div>
      </div>
    );
  }
});
