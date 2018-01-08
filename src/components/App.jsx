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
      price: stringToCurrency(props.foodData.price),
    };

    // bind all function to this current scope so we don't loose context as we pass it down to child component
    this.addToTotal = this.addToTotal.bind(this);
  };

  // this function will update state with option price added to the total amount once option name is clicked in child component
  addToTotal (e) {
    this.setState({
      price: this.state.price + e
    });
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
          addToTotal={this.addToTotal}
          />
        </div>
      </div>
    );
  };
};

export default App;
