import React from 'react';
import '../styles/App.css';
import OptionEntry from './OptionEntry.jsx';

const OptionList = (props) => (
  <div className="option-list">
    {
      // map out and render each options to the option entry component
      props.options.map((eachOption, index) =>
        <article className="option-container" key={index}>
          <OptionEntry
          option={eachOption}
          optionId={index}
          key={index}
          addToTotal={props.addToTotal}
          minusFromTotal={props.minusFromTotal}
          />
        </article>
      )
    }
  </div>
);

export default OptionList;
