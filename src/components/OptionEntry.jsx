import React, { Component } from 'react';
import '../styles/App.css';
import SubOptionList from './subOptionList.jsx';

class OptionEntry extends Component {
  constructor (props) {
    super (props);

    this.state = {
      eachOptions: props.option,
      subOptions: props.option.items
    };
  };

  render () {
    return (
      <div className="option-entry">
        <div className="option-name">
          {this.state.eachOptions.name}
        </div>
        <div className="sub-option-list">
          <SubOptionList
          subOptions={this.state.subOptions}
          />
        </div>
      </div>
    )
  };
};

export default OptionEntry;