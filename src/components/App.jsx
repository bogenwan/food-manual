import React, { Component } from 'react';
import '../styles/App.css';
import OptionList from './OptionList.jsx';
import { stringToCurrency, numberCurrency } from '../util/helper-functions.js';
import Queue from '../util/queue.js';
import axios from 'axios';
import _ from 'lodash';

class App extends Component {
  constructor (props) {
    super (props);

    this.state = {
      itemOptions: '',
      name: '',
      price: 0,
      selectionStorage: {},
      inRangeItemList: []
    };

    // bind all function to this current scope so we don't loose context as we pass it down to child component
    this.addToTotal = this.addToTotal.bind(this);
    this.minusFromTotal = this.minusFromTotal.bind(this);
    this.checkOptionsWithinRange = this.checkOptionsWithinRange.bind(this);
  };

  // this function will start getting data from api before component render
  componentWillMount () {
    // assign this to context to retain scope when being excecute bt axios
    let context = this;
    axios.get('/getData')
    .then(function(response) {
      context.setState({
        itemOptions: response.data.options,
        name: response.data.name,
        price: stringToCurrency(response.data.price)
      });
    })
    .catch((err) => console.log(err));
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
    // if selection queue is empty don't dequeue
    if (!newStorage[optionName] || newStorage[optionName].isEmpty()) {
      console.log('you have no selection in this catagory!')
      // if selection queue is with limit dont dequeue
    } else if (newStorage[optionName].length <= this.state.itemOptions.min) {
      console.log('you need to add at lease one option from this catagory.')
      // otherwise dequeue the item
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

  // function to handle total selection manager
  checkOptionsWithinRange (e) {
    // helper function to create our of range list of options and it's min and max value
    let maxAndMinInput = (option) => {
      let currOptionIndex = _.findIndex(this.state.itemOptions, {'name': `${option}`});
      return ` ${option}: min = ${this.state.itemOptions[currOptionIndex].min} max = ${this.state.itemOptions[currOptionIndex].max}`;
    };

    let copySelectionStorage = Object.assign({}, this.state.selectionStorage);
    let inRangeItemList = [];
    let outOfRangeOptionList = [];
    for (let key in copySelectionStorage) {
      let currMainOption = this.state.itemOptions[_.findIndex(this.state.itemOptions, {'name': `${key}`})];
      // check each option selection if it is with-in range
      if (copySelectionStorage[key].length <= currMainOption.max && copySelectionStorage[key].length >= currMainOption.min) {
        // if with-in rage, create the items list
        while (!copySelectionStorage[key].isEmpty()) {
          inRangeItemList.push(copySelectionStorage[key].dequeue());
        }
        // otherwise create the out of range item list
      } else {
        outOfRangeOptionList.push(key);
      }
    }
    // if there are items in the out of range list, aleart out of range options, otherwise log all option's item list
    return outOfRangeOptionList.length === 0 ? window.alert(`These are your selected items: [${inRangeItemList.toString()}]`) : window.alert(`You are not with-in rage for these options: [${_.map(outOfRangeOptionList, maxAndMinInput)}]`);
  };


  render () {
    // check if data from API returned and set to state yet, if yes render elements otherwise render null
    return this.state.itemOptions ?
    // pass down options state, add and minus function to child component
      <div className="App">
        <header className="header">
          <h1 className="food-name">
            {this.state.name}
          </h1>
          <span className="total-price" onClick={() =>{this.checkOptionsWithinRange(this.state.price)}}>
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
    : null;
  };
};

export default App;
