import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import './Playercard.css'
import Playerdata from './Playerdata';

class Playercard extends Component {

	playerdata(){
		return this.props.playersdata.map(playerdata => <Playerdata playerdata= {playerdata} playerscard={this.props.playerscard} gamenumber={this.props.gamenumber} playercode={this.props.playercode} />);
	}

  render() {
    return (
    	<Card className='Playercard'>
      	{this.playerdata()}
    	</Card>
    );
  }
}

export default Playercard;
