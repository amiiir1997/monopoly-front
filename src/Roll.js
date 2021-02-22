import React, { Component } from 'react';
import './Roll.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class Roll extends Component {

	roll(){
	const article = { playercode: this.props.playercode };
    axios.post('http://localhost/ws/laravel-websocket/public/roll', article) //window.location.hostname
        .then('')
        .catch(error => alert(error));
	}

  render() {
    return (
      <div className='Roll'>
        <div className='title'>Waiting For <img src={'./images/p'+this.props.turn+'.png'} className='image'/> To Roll.</div><br />
        {this.props.turn == this.props.gamenumber ?
          <Button variant="primary" className='Button' onClick={ () => this.roll()}> Roll </Button>
        :
          ''
        }
      </div>
    );
  }
}

export default Roll;
