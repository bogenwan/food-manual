import React, { Component } from 'react';
import '../styles/App.css';
import SubOptionEntry from './subOptionEntry.jsx';

const SubOptionList = (props) => (
  <div className="sub-option-list-container">
    {
      props.subOptions.map((eachSubOption, index) =>
        <artical className="sub-option-container">
          <SubOptionEntry
          subOption={eachSubOption}
          subOptId={index}
          key={index}
          addToTotal={props.addToTotal}
          minusFromTotal={props.minusFromTotal}
          />
          <br/>
        </artical>
      )
    }
  </div>
)

export default SubOptionList;
