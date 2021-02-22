import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import './Dealsuggestmodal.css';
import axios from 'axios';

class Dealsuggestmodal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dealmoney : 0,
      playermoney : 0,
      dealcards:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      playercards:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    }
  }

  name =[
    'MEDITERRANEAN AVENUE','BALTIC AVENUE',
    'ORIENTAL AVENUE','VERMONT AVENUE','CONNECTICUT AVENUE',
    'ST. CHARLES PLACE','STATES AVENUE','VIRGINIA AVENUE',
    'ST. JAMES PLACE','TENNESSEE AVENUE','NEW YORK AVENUE',
    'KENTUCKY AVENUE','IDIANA AVENUE','ILLINOIS AVENUE',
    'ATLANTIC AVENUE','VENTNOR AVENUE','MARVIN GARDENS',
    'PACIFIC AVANUE','NORTH CAROLINA AVANUE','PENNSYLVANIA AVENUE',
    'PARK PLACE','BOARDWALK',
    'READING RAILROAD','PENNSYVANIA RAILROAD','B. & O. RAILROAD','SHORT LINE',
    'ELECTRIC COMPANY','WATER WORKS'
  ];

  changebuy(cardnum){
    let temp = this.state.dealcards;
    temp[cardnum] = this.state.dealcards[cardnum] == 0 ? 1 : 0 ;
    this.setState({
      dealcards : temp
    })
  }

  changesell(cardnum){
    let temp = this.state.playercards;
    temp[cardnum] = this.state.playercards[cardnum] == 0 ? 1 : 0 ;
    this.setState({
      playercards : temp
    })
  }

  suggest(){
    
    const article = { dealcards: this.state.dealcards , playercards : this.state.playercards ,dealmoney : this.state.dealmoney , playermoney:this.state.playermoney , playercode : this.props.playercode , dealnum : this.props.dealgamenumber};
    axios.post('http://localhost/ws/laravel-websocket/public/dealsuggest', article) //window.location.hostname
        .then( this.props.onHide)
        .catch(error => this.gameerror(error));
  }

  render(props=this.props) {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Deal suggest
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Deal With</h4>
        <div className='div1'>
        <img src={'./images/p'+this.props.dealgamenumber+'.png'} className='image'/><br/>
        {this.props.playerscard.map(playercard => playercard['ownernum'] == this.props.dealgamenumber ? <span className={this.state.dealcards[playercard['cardnum']] == 1 ?'red' : ''} onClick={ () => this.changebuy(playercard['cardnum'])}>{this.name[playercard['cardnum']]}<br /></span> : '')}
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>$</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl aria-label="Amount (to the nearest dollar)" value={this.state.dealmoney} onChange = {event => this.setState({ dealmoney: event.target.value })} />
        </InputGroup>
        </div>
        <div className='div2'>
        <img src={'./images/p'+this.props.dealgamenumber+'.png'} className='image'/><br/>
        {this.props.playerscard.map(playercard => playercard['ownernum'] == this.props.gamenumber ? <span className={this.state.playercards[playercard['cardnum']] == 1 ?'red' : ''} onClick={ () => this.changesell(playercard['cardnum'])} >{this.name[playercard['cardnum']]}<br /></span> : '')}
         <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>$</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl aria-label="Amount (to the nearest dollar)" value={this.state.playermoney} onChange = {event => this.setState({ playermoney: event.target.value })} />
        </InputGroup>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={ () => this.suggest()}>Suggest!</Button>
      </Modal.Footer>
      </Modal>
    );
  }
}

export default Dealsuggestmodal;
