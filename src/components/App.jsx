import React, { Component } from 'react';
import '../styles/App.css';
import OptionList from './OptionList.jsx';
import { stringToCurrency, numberCurrency } from '../util/helper-functions.js';
import Queue from '../util/queue.js';

class App extends Component {
  constructor (props) {
    super (props);

    this.state = {
      itemOptions: props.foodData.options,
      name: props.foodData.name,
      price: stringToCurrency(props.foodData.price),
      selectionStorage: {}
    };

    // bind all function to this current scope so we don't loose context as we pass it down to child component
    this.addToTotal = this.addToTotal.bind(this);
    this.minusFromTotal = this.minusFromTotal.bind(this);
  };

  // this function will update state with option price added to the total amount once option name is clicked in child component
  addToTotal (price, optionName, subOptionName) {
    let newStorage = Object.assign({}, this.state.selectionStorage);
    if (!this.state.selectionStorage[optionName]) {
      newStorage[optionName] = new Queue();
      newStorage[optionName].enqueue(subOptionName);
      this.setState({
        selectionStorage: newStorage
      });
    } else if (newStorage[optionName].length < this.state.itemOptions.max) {
      newStorage[optionName].enqueue(subOptionName);
      this.setState({
        selectionStorage: newStorage
      });
    } else {
      newStorage[optionName].dequeue();
      newStorage[optionName].enqueue(subOptionName);
      this.setState({
        selectionStorage: newStorage
      })
    }
    this.setState({
      price: numberCurrency(this.state.price, 2) + numberCurrency(price, 2)
    });
  };

  // similar to addToTotal this function will subtract the selected option price from total amount
  minusFromTotal (price, optionName, subOptionName) {
    this.setState({
      price: numberCurrency(this.state.price, 2) - numberCurrency(price, 2)
    });
  };

  render () {
    console.log(this.state.selectionStorage)
    // pass down options state, add and minus function to child component
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
          minusFromTotal={this.minusFromTotal}
          />
        </div>
      </div>
    );
  };
};

export default App;
