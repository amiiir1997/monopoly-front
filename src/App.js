import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Echo from 'laravel-echo';
import Roll from './Roll';
import axios from 'axios';
import './App.css';
import Card from 'react-bootstrap/Card';
import './index.css';
import Gameboard from './Gameboard';
import Chatcard from './Chatcard';
import Playercard from './Playercard';
import Info from './Info';
import Dice from './Dice';
import Button from 'react-bootstrap/Button';
import Move from './Move';
import Dealmodal from './Dealmodal';
import './Gameboard.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.state = {
      joinwaiting : 0 ,
      playercode : '',
      gamestep : '',
      joinwaitingdata:' ',
      step:-1,
      update : 0,
      gamenumber : -1,
      suggest : 0,
      suggestdata : {
        suggestcards :[],
        dealcarsd : []
      },
      chats : [],
      playersdata :[],
      playerscard : [],
      turn : -1,
      dice : [3,6],
      move : [],
      gamecode : '',
      creater :false,
    };
  }

  savemassage(massage){
      this.setState({
      chats : this.state.chats.concat(JSON.parse(massage)),
    })
  }

  playersdata(massage){
      this.setState({
      playersdata : JSON.parse(massage),
    });
  }
  playerscard(massage){
      this.setState({
      playerscard : JSON.parse(massage),
    });
  }
  dice(massage){
      this.setState({
      dice : JSON.parse(massage),
    });
  }
  turn(massage){
      this.setState({
      turn : parseInt(massage),
    });
  }
  move(massage){
      this.setState({
      move : JSON.parse(massage),
    });
  }
  step(massage){
      this.setState({
      step : parseInt(massage),
    });
  }
  suggest(massage){
      this.setState({
      suggest : 1,
      suggestdata : JSON.parse(massage),
    });
  }
  joinwaiting(massage){
      this.setState({
      joinwaitingdata: JSON.parse(massage),
    });
  }

  checkmassage(massage){
      if(massage[0] == '9'){
        massage=massage.substring(2);
        return this.savemassage(massage);
      }
      else if(massage[0] == '8'){
        massage=massage.substring(2);
        return this.playersdata(massage);
      }
      else if(massage[0] == '7'){
        massage=massage.substring(2);
        return this.playerscard(massage);
      }
      else if(massage[0] == '6'){
        massage=massage.substring(2);
        return this.dice(massage);
      }
      else if(massage[0] == '5'){
        massage=massage.substring(2);
        return this.turn(massage);
      }
      else if(massage[0] == '4'){
        massage=massage.substring(2);
        return this.move(massage);
      }
      else if(massage[0] == '3'){
        massage=massage.substring(2);
        return this.step(massage);
      }
      else if(massage[0] == '2'){
        massage=massage.substring(2);
        return this.suggest(massage);
      }
      else if(massage[0] == 'a'){
        massage=massage.substring(2);
        return this.joinwaiting(massage);
      }
  }

  handler() {
    this.forceUpdate();
  }

  startws(playercode){
    window.Pusher = require ('pusher-js');
    window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '123456',
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
    });
    window.Echo.channel('ws.'+playercode).listen('Newmassage', (e) => {
      this.checkmassage(e.message)
    });
    const article = { playercode: playercode };
    axios.post('http://localhost/ws/laravel-websocket/public/enterws', article) //window.location.hostname
        .then('')
        .catch(error => alert(error));
  }

  initialdata(playercode){
    const article = { playercode: playercode };
    axios.post('http://localhost/ws/laravel-websocket/public/initialdata', article) //window.location.hostname
        .then(
          res => res.data['join']==1 ?
          this.setState({
            gamenumber : res.data['gamenumber'],
            creater : res.data['creater'],
            joinwaiting :1,
            gamecode:res.data['gamecode']
          }):
          this.setState({
            gamenumber : res.data['gamenumber'],
            joinwaiting :0
          })
          )
        .catch(error => alert(error));
  }

  setModalShow($e){
    this.setState({
      suggest : $e
    })
  }

  render() {
    if(this.state.playercode == ''){
      let playercode = Cookies.get('playercode');
      if(typeof (playercode)=='undefined'){ 
         playercode = '';
        }
        else{
          this.setState({playercode : playercode})
          this.startws(playercode)
          this.initialdata(playercode);
        }
      }
    return (
      <Card className='bodycard' border='primary'>
      {this.state.step == 0 ?
        <Roll playercode={this.state.playercode} turn={this.state.turn} gamenumber={this.state.gamenumber}/>
      :
        <Move move={this.state.move} turn={this.state.turn} playersdata={this.state.playersdata} gamenumber={this.state.gamenumber} playercode={this.state.playercode}/>
      }
        <table><tr>
          <td><Gameboard playersplace={this.state.playersdata} /></td>
          <td><Chatcard chats={this.state.chats} playercode={this.state.playercode} /></td>
          <td><Playercard playersdata={this.state.playersdata} playerscard={this.state.playerscard} gamenumber={this.state.gamenumber} playercode={this.state.playercode}/></td>
        </tr></table>
        {this.state.playercode == '' || this.state.joinwaiting == 1?
        <div className='Setupbackground'>
          <Info rerenderp={this.handler} waiting={this.state.joinwaiting} waitingdata={this.state.joinwaitingdata} gamecode={this.state.gamecode} creater={this.state.creater} playercode={this.state.playercode}/>
        </div>
        : ''
        }
        <Dealmodal
            show={this.state.suggest}
            onHide={() => this.setModalShow(false)}
            suggestdata = {this.state.suggestdata}
            gamenumber={this.state.gamenumber}
            playercode= {this.state.playercode}
            suggest = {this.state.suggest}
          />
      </Card>
    );
  }
}

export default App;
