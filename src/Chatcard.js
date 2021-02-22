import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Sendmassage from './Sendmassage';
import Chatpm from './Chatpm';
import './Chatcard.css';

class Chatcard extends Component {

	chats(){
		return this.props.chats.map(chat => 
			<Chatpm name={chat['name']} pm={chat['pm']} mypm={chat['mypm']}/>
	);}

  render() {
    return (
      <Card className='Chatcard'>
      		<Card.Header>Chatbox</Card.Header>
      		<div className='pmbox'>
      		{this.chats()}
      		</div>
      		<div style={{height : '4vw'}}></div>
        	<Card.Footer style={{height : '3vw' , top : '36.5vw' , position : 'absolute'}}><Sendmassage playercode={this.props.playercode} /></Card.Footer>
      </Card>
    );
  }
}

export default Chatcard;
