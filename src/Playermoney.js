import React, { Component } from 'react';
import './Playermoney.css';

class Playermoney extends Component {

  render() {
    return (
    	<center>
 		<div className='Playermoney'>
 		 	{this.props.money}
 		</div>
 		</center>
    );
  }
}

export default Playermoney;
