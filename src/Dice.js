import React, { Component } from 'react';
import './Dice.css';

class Playercard extends Component {


  render() {
    return (
      <div className='dice'>
        {this.props.dice[0]}&{this.props.dice[1]}
      </div>
    );
  }
}

export default Playercard;
