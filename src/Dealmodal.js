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
     //
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

  accept(){   
    const article = {playercode : this.props.playercode};
    axios.post('http://localhost/ws/laravel-websocket/public/dealaccept', article) //window.location.hostname
        .then( this.props.onHide)
        .catch(error => this.gameerror(error));
  }

  render() {
    let dealcards = this.props.suggestdata['dealcards'];
    let suggestcards = this.props.suggestdata['suggestcards'];
    if(this.props.suggest){
      dealcards = dealcards.substring(1,dealcards.length-2);
      suggestcards = suggestcards.substring(1,suggestcards.length-2);
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Deal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Deal With</h4>
        <div className='div1'>
        <img src={'./images/p'+this.props.suggestdata['dealnum']+'.png'} className='image'/><br/>
        {dealcards.length >= 2 ? dealcards.split(',').map(a => <span>{this.name[a]}<br /></span> ) : <span>{this.name[parseInt(dealcards)]}<br /></span>}
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>$</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl aria-label="Amount (to the nearest dollar)" value={this.props.suggestdata['dealmoney']} readonly />
        </InputGroup>
        </div>
        <div className='div2'>
        <img src={'./images/p'+this.props.suggestdata['suggestnum']+'.png'} className='image'/><br/>
        {suggestcards.length >= 2 ? suggestcards.split(',').map(a => <span>{this.name[a]}<br /></span> ) : <span>{this.name[parseInt(suggestcards)]}<br /></span>}
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>$</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl aria-label="Amount (to the nearest dollar)" value={this.props.suggestdata['suggestmoney']} readonly />
        </InputGroup>
        </div>
      </Modal.Body>
      <Modal.Footer>
      { this.props.suggestdata['dealnum'] == this.props.gamenumber ?
        <div>
          <Button onClick={ () => this.accept()}>Accept!</Button>&nbsp;
          <Button variant="danger" onClick={ () => this.props.onHide}>Reject!</Button>
        </div>
      :
        <Button onClick={ () => this.props.onHide}>Close</Button>
      }
      </Modal.Footer>
      </Modal>
    );
  }
  else{
    return (
    ''
    )
  }
  }
}

export default Dealsuggestmodal;
