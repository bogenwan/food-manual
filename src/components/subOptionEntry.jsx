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
      subOptId: props.subOptId,
      optionCount: 0
    };

    // bind the method to this same scope
    this.addOptionCount = this.addOptionCount.bind(this);
    this.removeOptionCount = this.removeOptionCount.bind(this);
  };

  // this function adds counts of how many options selected
  addOptionCount () {
    this.setState({
      optionCount: this.state.optionCount + 1
    });
  };

  // this function remove counts of how many options selected
  removeOptionCount () {
    this.setState({
      optionCount: this.state.optionCount - 1
    });
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
          onClick={() => {
            this.props.addToTotal(this.state.subOptionPrice);
            this.addOptionCount();
          }}
          >
            {this.state.subOptionName}
          </div>
          <div className="sub-option-price"
          onClick={() => {
            this.props.minusFromTotal(this.state.subOptionPrice);
            this.removeOptionCount();
          }}
          >
            + {this.state.subOptionPrice}
          </div>
          {this.state.optionCount !== 0 ?
              <div className="sub-option-count">{this.state.optionCount}</div>
              :
                null
              }
        </div>
      )
    }
  };
};

export default SubOptionEntry;
