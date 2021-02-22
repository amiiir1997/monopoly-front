import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import './Joinmember.css'

class Joinmember extends Component {
  render() {
    return (
      <div ard className='Joinmember'>
        <span className='left'>
          {this.props.name}
        </span>
        <span className='right'>
          remove
        </span>
      </div>
    );
  }
}

export default Joinmember;
