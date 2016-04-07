import React from 'react';
import HaveWarframesSelect from './HaveWarframesSelect';

class HaveWarframesList extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        warframes: props.warframes,
        warframeList: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        warframes: nextProps.warframes
    });
  }

  handleChange (event, index, value) {
    this.setState({value});
    //this.state.selectHandler(value);
  }

  render() {
    return (
      <HaveWarframesSelect warframes={this.state.warframes}/>
    );
  }
}

module.exports = HaveWarframesList;
