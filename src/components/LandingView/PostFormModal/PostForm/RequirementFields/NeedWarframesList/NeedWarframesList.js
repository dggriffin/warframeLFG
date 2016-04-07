import React from 'react';
import NeedWarframesSelect from './NeedWarframesSelect';

class NeedWarframesList extends React.Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        warframes: props.warframes,
        value: null
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
        <NeedWarframesSelect warframes={this.state.warframes}/>
    );
  }
}

module.exports = NeedWarframesList;
