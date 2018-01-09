import React, { Component } from 'react';
import '../styles/App.css';
import SubOptionEntry from './subOptionEntry.jsx';

const SubOptionList = (props) => (
  <div className="sub-option-list-container">
    {
      // map out and render to each sub-option entry
      props.subOptions.map((eachSubOption, index) =>
        <div className="sub-option-container">
          <SubOptionEntry
          eachOption={props.eachOption}
          subOption={eachSubOption}
          subOptId={index}
          key={index}
          addToTotal={props.addToTotal}
          minusFromTotal={props.minusFromTotal}
          />
          <br/>
        </div>
      )
    }
  </div>
)

export default SubOptionList;
