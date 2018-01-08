import React, { Component } from 'react';
import '../styles/App.css';
import OptionList from './OptionList.jsx';
import { stringToCurrency } from '../util/helper-functions.js';

class App extends Component {
  constructor (props) {
    super (props);

    this.state = {
      itemOptions: props.foodData.options,
      name: props.foodData.name,
      price: stringToCurrency(props.foodData.price)
    };
  };

  render () {
    return (
      <div className="App">
        <header className="header">
          <h1 className="food-name">
            {this.state.name}
          </h1>
          <span className="total-price">
            {this.state.price}
          </span>
        </header>
        <div className="content-box">
          <OptionList
          options={this.state.itemOptions}
          />
        </div>
      </div>
    );
  };
};

export default App;
