import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import './Playeridcard.css';
import Playerimage from './Playerimage';
import Playername from './Playername';
import Playermoney from './Playermoney';
import Dealsuggestmodal from './Dealsuggestmodal';
import Button from 'react-bootstrap/Button';


class Playeridcard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalShow : false,
    };
  }

  setModalShow($e){
    this.setState({
      modalShow : $e
    })
  }

  render() {
    return (
      <div>
    	<Card className='Playeridcard' onClick={ () => this.setModalShow(true)}>
    		<Playerimage number={this.props.playerdata['gamenumber']} />
    		<Playername name={this.props.playerdata['name']}/>
    		<Playermoney money={this.props.playerdata['money']}/>
      </Card>
      		<Dealsuggestmodal
        		show={this.state.modalShow}
        		onHide={() => this.setModalShow(false)}
            dealgamenumber={this.props.playerdata['gamenumber']}
            playerscard={this.props.playerscard}
            gamenumber={this.props.gamenumber}
            playercode= {this.props.playercode}
      		/>
      </div>
    );
  }
}

export default Playeridcard;