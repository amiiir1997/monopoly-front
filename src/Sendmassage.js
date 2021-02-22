import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import './Sendmassage.css';
import Src from './images/send.png';
import axios from 'axios';

class Sendmassage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text : ''
    };
  }

  sendmassage(){
    const article = { text: this.state.text , playercode : this.props.playercode };
    axios.post('http://localhost/ws/laravel-websocket/public/sendmassage', article) //window.location.hostname
        .then(this.setState({ text: '' }))
        .catch(error => alert(error));
  }

  render() {
    return (
    	<InputGroup className="mb-3">
    		<FormControl
      			placeholder="Send Massage"
      			aria-label="Send Massage"
      			aria-describedby="basic-addon2"
            onChange = {event => this.setState({ text: event.target.value })}
            value = {this.state.text}
            autoFocus
    		/>
    		<InputGroup.Append>
      			<Button style={{padding : '0' ,width : '1.5vw',borderColor : '#cccccc'}} className = 'Sendbutton' variant="outline-secondary"
            onClick={this.state.text == '' ? '' : () => this.sendmassage()}>
            <img src={Src} className='Sendicon'/>
            </Button>
    		</InputGroup.Append>
  </InputGroup>


    );
  }
}

export default Sendmassage;
