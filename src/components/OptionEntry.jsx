import React, { Component } from 'react';
import '../styles/App.css';
import SubOptionList from './subOptionList.jsx';

class OptionEntry extends Component {
  constructor (props) {
    super (props);

    this.state = {
      eachOption: props.option,
      eachOptionId: props.optionId,
      subOptions: props.option.items
    };
  };

  render () {
    // this component render option name and sub-option list
    return (
      <div className="option-entry">
        <div className="option-name">
          {this.state.eachOption.name}
        </div>
        <div className="sub-option-list">
          <SubOptionList
          eachOption={this.state.eachOption}
          subOptions={this.state.subOptions}
          addToTotal={this.props.addToTotal}
          minusFromTotal={this.props.minusFromTotal}
          />
        </div>
      </div>
    )
  };
};

export default OptionEntry;
