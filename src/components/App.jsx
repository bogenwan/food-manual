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

  // this function will update state with option price added to the total amount once option name is clicked in child component also queue our option selection
  addToTotal (price, optionName, subOptionName) {
    // create new object and copy all properties from state object to avoid manual modifying state
    let newStorage = Object.assign({}, this.state.selectionStorage);
    if (!this.state.selectionStorage[optionName]) {
      // use Queue for O(1) data insert and remove and for First In First Out
      // create new queue if no such property exist
      newStorage[optionName] = new Queue();
      newStorage[optionName].enqueue(subOptionName);
      this.setState({
        selectionStorage: newStorage
      });
    } else if (newStorage[optionName].length < this.state.itemOptions.max) {
      // if property exist and less then option max allowence then add to queue
      newStorage[optionName].enqueue(subOptionName);
      this.setState({
        selectionStorage: newStorage
      });
    } else {
      // otherwise dequeue the previous option and keep the current option
      newStorage[optionName].dequeue();
      newStorage[optionName].enqueue(subOptionName);
      this.setState({
        selectionStorage: newStorage
      })
    }
    // set price to render as grand total
    this.setState({
      price: numberCurrency(this.state.price, 2) + numberCurrency(price, 2)
    });
  };

  // similar to addToTotal this function will subtract the selected option price from total amount and dequeue options
  minusFromTotal (price, optionName, subOptionName) {
    let newStorage = Object.assign({}, this.state.selectionStorage);
    if (newStorage[optionName].isEmpty()) {
      console.log('you have no selection in this catagory!')
    } else if (newStorage[optionName].length <= this.state.itemOptions.min) {
      console.log(newStorage[optionName].length)
      console.loh(this.state.itemOptions.min)
      console.log('you need to add at lease one option from this catagory.')
    } else {
      newStorage[optionName].dequeue();
      this.setState({
        selectionStorage: newStorage
      });
    }
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
