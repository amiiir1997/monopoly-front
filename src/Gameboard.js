import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Image from 'react-bootstrap/Image';
import './Gameboard.css';
import Playerplace from './Playerplace'
import Src from './images/gameboard2000.jpg'

class Gameboard extends Component {

	playerplace(){
		return this.props.playersplace.map(playerplace => <Playerplace number={playerplace['gamenumber']} place={playerplace['place']} />);
	}



  render() {
    return (
    	<div className='gameboarddiv'>
        <Image src={Src} className='gameboard' rounded />
        {this.playerplace()}
      </div>
    );
  }
}
export default Gameboard;
