import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import './Info.css';
import axios from 'axios';
import Joinmember from './Joinmember'

class Info extends Component {


  constructor(props) {
    let temp = '';
    props.waiting == 1 ?
    temp = 'waiting' :
    temp = 'name' ;
    super(props);
      this.state = {
      state: temp,
      value : 0 ,
      name : '',
      gamecode :this.props.gamecode,
      playercode : this.props.playercode,
      startingmoney : '',
      error : '',
      creater : this.props.creater,
    };
    this.rerenderparent=this.rerenderparent.bind(this);
  }

  rerenderparent(){
    this.setState({ value: this.state.value + 1 });
    this.props.rerenderp();
  }


  towaiting(){
    const article = { name: this.state.name , startingmoney : this.state.startingmoney };
    axios.post('http://localhost/ws/laravel-websocket/public/creategame', article) //window.location.hostname
        .then(response => this.setupgameresponse (response))
        .catch(error => this.gameerror(error));
  }

  joingame(){
    const article = { name: this.state.name , gamecode : this.state.gamecode };
    axios.post('http://localhost/ws/laravel-websocket/public/joingame', article) //window.location.hostname
        .then(response => this.joingameresponse (response))
        .catch(error => this.gameerror(error));
  }

  setupgameresponse(response){
    Cookies.set('playercode', response.data['playercode'], { expires: 1 , path: '' })
    this.rerenderparent();
  }

  joingameresponse(response){
    Cookies.set('playercode', response.data['playercode'], { expires: 1 , path: '' })
    this.rerenderparent();
  }

  gameerror(error){
    if (error.response.status == 450){
      this.setState({
        error : 'Game Not Found!'
      })
    }
  }

  tosearchgame(){
    this.setState(
      {      
        state: 'searchgame'
      }
    );
  }

  startgame(){
    const article = { playercode: this.state.playercode };
    axios.post('http://localhost/ws/laravel-websocket/public/startgame', article) //window.location.hostname
        .then()
        .catch(error => alert(error));
    this.rerenderparent();
  }

  joinmemberfunc(){
    if(this.props.waitingdata != ' '){
      let temp = this.props.waitingdata.map(data => < Joinmember name = {data['name']} id={data['id']} creater={this.state.creater} /> );  
      return temp;    
    }
  }

  render() {
      return (
      <center><div className='Infobackground'>
      {this.state.state == 'name' ?
      <div>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default">Your Name :</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange = {event => this.setState({ name: event.target.value })}
          />
        </InputGroup>
        <Button variant="primary" className='Button' onClick={this.state.name == '' ?'':() => this.setState({ state: 'setgame' })}>Create Game!</Button>
        <Button variant="success" className='Button' onClick={this.state.name == '' ?'':() => this.setState({ state: 'searchgame'})}>Join Game!</Button>
        </div>
        : this.state.state == 'searchgame' ?
        <div>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Game ID :</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange = {event => this.setState({ gamecode: event.target.value })}
            value = {this.state.gamecode}
          />
        </InputGroup>
        <Button variant="primary" className='Button' onClick={this.state.gameid == '' ? '' : () => this.joingame()}>Join</Button>
        </div>
        : this.state.state == 'setgame' ?
        <div>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Starting Money :</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange = {event => this.setState({ startingmoney: event.target.value })}
            value={this.state.startingmoney}
          />
        </InputGroup>
        <Button variant="primary" className='Button' onClick={this.state.startingmoney == '' ? '' : () => this.towaiting()}>SetGame</Button>
        </div>
      :this.state.state == 'waiting' ?
        <div>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default" >Game ID :</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={this.state.gamecode} readOnly
          />
        </InputGroup>
        {this.joinmemberfunc()}
        {this.state.creater ? 
          <Button variant="primary" className='Button' onClick={ () => this.startgame()}>Start</Button>: ''
        }
        </div>
      :''}
      <span className='error'>
        {this.state.error}
      </span>
      </div></center>
    );
  }
}

export default Info;
