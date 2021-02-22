import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import './Chatpm.css'

class Chatpm extends Component {
  render() {
    return (
      <div ard className='Chatpm'>
      	<hr className='hr' />
      	{this.props.mypm == 0 ?
      		<div>
      			<div className='name'>{this.props.name}:</div>
      			<div className='pm'>{this.props.pm}</div>
      		</div>
      	:
      		<div>
      			<div className='myname'>:you</div>
      			<div className='mypm'>{this.props.pm}</div>
      		</div>
      	}

      </div>
    );
  }
}

export default Chatpm;
