import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Image from 'react-bootstrap/Image';
import './Playerimage.css';

class Playerimage extends Component {

  render() {
    return (
        <Image src={'./images/p'+this.props.number+'.png'} className='Playerimage' />
    );
  }
}
export default Playerimage;
