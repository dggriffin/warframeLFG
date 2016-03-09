// App component - represents the whole app
App = React.createClass({

   // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      missions: Missions.find({}).fetch()
    }
  },

  render() {
    return (
        <div>
          <header>
            <div className="navbar-fixed">
              <nav>
                <div className="nav-wrapper white">
                  <a href="#!" className="brand-logo center thin grey-text">WarframeLFG</a>
                </div>
              </nav>
            </div>
          </header>
          <div className="container">
            <PostForm missions={this.data.missions} />
          </div>
        </div>
    );
  }
});