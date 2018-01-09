import React, { Component } from 'react';
import '../styles/App.css';
import { stringToCurrency } from '../util/helper-functions.js';

class SubOptionEntry extends Component {
  constructor (props) {
    super (props);

    this.state = {
      eachOptionName: props.eachOption.name,
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
    // check if option is available, if false opacity is 0.2 and unclickable, if ture, run the else statement
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
      // run the below line of code if availability is true
      return (
        // below click handler will return selected price, option name and sub-option name
        <div className="sub-option-entry-container">
          <div className="sub-option-name"
          onClick={() => {
            this.props.addToTotal(
              this.state.subOptionPrice,
              this.state.eachOptionName,
              this.state.subOptionName
              );
            this.addOptionCount();
          }}
          >
            {this.state.subOptionName}
          </div>
          <div className="sub-option-price"
          onClick={() => {
            this.props.minusFromTotal(
              this.state.subOptionPrice,
              this.state.eachOptionName,
              this.state.subOptionName
              );
            this.removeOptionCount();
          }}
          >
            + {this.state.subOptionPrice}
          </div>
          {this.state.optionCount !== 0 ?
            // above line of code check if option count 0, if not, render the count
              <div className="sub-option-count">{this.state.optionCount}</div>
              :
              // otherwise return null and don't render any option count
                null
              }
        </div>
      )
    }
  };
};

export default SubOptionEntry;
