import React, { Component } from 'react';
import '../styles/App.css';
import OptionEntry from './OptionEntry.jsx';

const OptionList = (props) => (
  <div className="option-list">
    {
      props.options.map((eachOption, index) =>
        <article className="option-container">
          <OptionEntry
          option={eachOption}
          key={index}
          />
        </article>
      )
    }
  </div>
);

export default OptionList;
