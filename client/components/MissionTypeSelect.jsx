MissionTypeSelect = React.createClass({
  // propTypes: {
  //   track: React.PropTypes.object.isRequired
  // },
  render() {
    return (
        <form action="#">
            <p>
              <input name="group1" type="radio" />
              <label>Void</label>
            </p>
            <p>
              <input name="group1" type="radio" />
              <label>Trials</label>
            </p>
            <p>
              <input name="group1" type="radio" />
              <label>Sorties</label>
            </p>
            <p>
              <input name="group1" type="radio" />
              <label >Orokin Derelict</label>
            </p>
            <p>
              <input name="group1" type="radio" />
              <label>Farming</label>
            </p>
            <p>
              <input name="group1" type="radio" />
              <label>Alerts/Invasions</label>
            </p>
            <p>
              <input name="group1" type="radio" />
              <label>Syndicate</label>
            </p>
            <p>
              <input name="group1" type="radio" />
              <label>Starchart Progression</label>
            </p>
          </form>
    );
  }
});
