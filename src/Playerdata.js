import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import './Playerdata.css';
import Playeridcard from './Playeridcard';
import Playergamecarts from './Playergamecarts';

class Playerdata extends Component {

  render() {
    return (
    	<Card border='primary' className='Playerdata'>
    		<table><tr>
    		<td><Playeridcard playerdata={this.props.playerdata} playerscard={this.props.playerscard} gamenumber={this.props.gamenumber} playercode={this.props.playercode}/></td>
    		<td><Playergamecarts playerscard={this.props.playerscard} number={this.props.playerdata['gamenumber']}/></td>
    		</tr></table>
    	</Card>
    );
  }
}

export default Playerdata;
