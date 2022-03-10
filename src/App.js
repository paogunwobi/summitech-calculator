import React, { Component } from 'react'
import './App.css'
import Display from './Display'
import Button from './Button'
import Buttons from './Buttons'

class App extends Component {
  constructor() {
    super()
    this.state = { operations: [], displayOps: [], operators: [], operationsObj: { first: '', operand: '', second: ''} }
  }

  calculateOperations = () => {
    let result = '';
    let first = this.state.operationsObj.first;
    let operand = this.state.operationsObj.operand;
    let second = this.state.operationsObj.second;
    let calVal = {};
    const secVal = parseInt(this.state.operationsObj.second);
    const negSecVal = secVal * -1;
    if (secVal < 0 && this.state.operationsObj.operand === '-') {
      calVal = { first, operand: '+', second: String(negSecVal)}
    } else {
      calVal = { first, operand, second }
    }
    if (calVal !== {}) {
      result = String(this.replaceEval(calVal));
      result = Math.floor(parseInt(result));
      result = String(result)
      if (result === 'NaN') {
        this.setState({
          operations: [],
          displayOps: '',
          operators: [],
          operationsObj: { first: '', operand: '', second: '' }
        })
      } else {
        this.setState({
          operations: [result],
          displayOps: `${result}`,
          operators: [],
          operationsObj: { first: result, operand: '', second: '' }
        })
      }
    }
  }

  newOperator(value) {
    let result = '';
    let first = this.state.operationsObj.first;
    let operand = this.state.operationsObj.operand;
    let second = this.state.operationsObj.second;
    let calVal = { first, operand, second };
    if (calVal !== {}) {
      result = String(this.replaceEval(calVal));
      result = Math.floor(parseInt(result));
      result = String(result)
      if (result === 'NaN') {
        this.setState({
          operations: [],
          displayOps: '',
          operators: [],
          operationsObj: { first: '', operand: '', second: '' }
        })
      } else {
        this.setState({
          operations: [result],
          displayOps: this.state.displayOps + value,
          operators: [...this.state.operators],
          operationsObj: { first: result, operand: value, second: '' }
        })
      }
    }
  }

  replaceEval(obj) {
    let result;
    switch (obj.operand) {
      case '-':
        result = parseInt(obj.first) - parseInt(obj.second);
        break
      case '+':
        result = parseInt(obj.first) + parseInt(obj.second);
        break
      case '*':
        result = parseInt(obj.first) * parseInt(obj.second);
        break
      case '/':
        result = parseInt(obj.first) / parseInt(obj.second);
        break
      default:
        break
    }
    return result;
  }

  checkOperator(value) {
    var format = /[!*+\-\\|/]+/;
    if(format.test(value)){
      return true;
    } else {
      return false;
    }
  }

  getData(value) {
    let first = this.state.operationsObj.first;
    let operand = this.state.operationsObj.operand;
    let second = this.state.operationsObj.second;
    let opState = this.checkOperator(value);
    if (first !== '' && operand !== '' && second !== '' && opState === true) {
      this.newOperator(value);
    } else {
      if ((first === '' || first === '0') && opState === false && second === '' && operand === '') {
        first = value;
      } else if (first === '' && value === '-') {
          first = value;
      } else {
        if (opState === true && first !== '' && first !==  '-') {
          if (value === '-' && operand !== '' && second === '') {
            if (operand === '+') {
              operand = "-"
            } else if (operand === '-') {
              operand = "+"
            } else {
              second = value;
            }
          } else {
            if (second === '') {
              operand = value;
            }
          }
        } else {
          if (operand === '' && opState === false && second === '') {
            if (value !== '0' && first !== '0') {
              first += value;
            }
          } else {
            if (operand !== '' && first !== '' && first !== '-' && opState === false) {
              if (value === '0' && second === '-') {
                second = '-0';
              } else {
                if (second === '-0') {
                  second = '-' + value;
                } else if (second === '0') {
                  second = value;
                } else {
                  second += value;
                }
              }
            } else if (second === '' && value === '-') {
              second = value;  
            }
          }
        }
      }

      let operatorsData = this.state.operators;
      if (operand !== '') {
        operatorsData.push(operand)
      }
  
      this.setState({
        operations: [first, operand, second],
        displayOps: `${first}${operand}${second}`,
        operators: [...operatorsData],
        operationsObj: { 
          first, operand, second 
        }
      })
    }

  }
  handleClick = e => {
    const value = e.target.getAttribute('data-value');
    if (value !== 'clear' && value !== 'equal') {
      this.getData(value);
    } else {
      if (value === 'clear') {
        this.setState({
          operations: [],
          displayOps: '',
          operators: [], 
          operationsObj: { first: '', operand: '', second: '' }
        })
      }
      
      if (value === 'equal' && this.state.operationsObj.second !== '' && this.state.operationsObj.second !== '-') {
        this.calculateOperations();
      }
    }

  }
  render() {
    return (
      <div className="App">
        <Display data={this.state.displayOps} />
        <Buttons>
          <Button onClick={this.handleClick} label="0" value="0" />
          <Button onClick={this.handleClick} label="4" value="4" />
          <Button onClick={this.handleClick} label="8" value="8" />
          <Button onClick={this.handleClick} label="*" value="*" />

          <Button onClick={this.handleClick} label="1" value="1" />
          <Button onClick={this.handleClick} label="5" value="5" />
          <Button onClick={this.handleClick} label="9" value="9" />
          <Button onClick={this.handleClick} label="/" value="/" />

          <Button onClick={this.handleClick} label="2" value="2" />
          <Button onClick={this.handleClick} label="6" value="6" />
          <Button onClick={this.handleClick} label="+" value="+" />
          <Button onClick={this.handleClick} label="=" value="equal" />

          <Button onClick={this.handleClick} label="3" value="3" />
          <Button onClick={this.handleClick} label="7" value="7" />
          <Button onClick={this.handleClick} label="-" value="-" />
          <Button onClick={this.handleClick} label="C" value="clear" />
        </Buttons>
      </div>
    )
  }
}

export default App
