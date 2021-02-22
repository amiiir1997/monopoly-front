import React, { Component } from 'react';
import './Playername.css';

class Playername extends Component {

  render() {
    return (
    	<center>
 		<div className='Playername'>
 		 	{this.props.name}
 		</div>
 		</center>
    );
  }
}

export default Playername;
