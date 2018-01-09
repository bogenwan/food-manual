import React, { Component } from 'react';
import '../styles/App.css';
import { stringToCurrency } from '../util/helper-functions.js';

class SubOptionEntry extends Component {
  constructor (props) {
    super (props);

    this.state = {
      subOptionName: props.subOption.name,
      subOptionPrice: stringToCurrency(props.subOption.price),
      subOptionavAvailable: props.subOption.available,
      subOptId: props.subOptId
    };
  };

  render () {
    if (this.state.subOptionavAvailable === false) {
      return (
        <div className="sub-option-entry-container-fade">
          <div className="sub-option-name-fade">
            {this.state.subOptionName}
          </div>
          <div className="sub-option-price">
            {this.state.subOptionPrice}
          </div>
        </div>
      )
    } else {
      return (
        <div className="sub-option-entry-container">
          <div className="sub-option-name"
          onClick={() => {this.props.addToTotal(this.state.subOptionPrice)}}
          >
            {this.state.subOptionName}
          </div>
          <div className="sub-option-price"
          onClick={() => {this.props.minusFromTotal(this.state.subOptionPrice)}}
          >
            {this.state.subOptionPrice}
          </div>
        </div>
      )
    }
  };
};

export default SubOptionEntry;
