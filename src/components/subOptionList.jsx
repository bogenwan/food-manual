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
          key={index}
          addToTotal={props.addToTotal}
          />
          <br/>
        </artical>
      )
    }
  </div>
)

export default SubOptionList;
