import React, { Component } from 'react';
import Playergamecartsshow from './Playergamecartsshow';
import './Playergamecarts.css'

class Playergamecarts extends Component {

	color = [
		'#996633',
		'#ccffff',
		'#ff1aff',
		'#ff8533',
		'#e60000',
		'#e6e600',
		'#47d147',
		'#0073e6',
		'#daf1e6',
		'#daf1e6',
	];

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
  level = [];
  cards=[];
  test(playercard){
    this.level[playercard['cardnum']]=playercard['level'];
    this.cards[playercard['cardnum']]=1
  }

  render() {
  	this.level = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  	this.cards = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  	this.props.playerscard.map(playercard => playercard['ownernum'] == this.props.number ? this.test(playercard)
  	:''
  	);
    return (
    	<div className='gamecartsdiv'>
    	<table><tr>
    		<td className='gamecartsrow'> <Playergamecartsshow color={this.color[0]} levels={[this.level[0],this.level[1]]} cards={[this.cards[0],this.cards[1]]} name={[this.name[0],this.name[1]]} /></td>
    		<td className='gamecartsrow'> <Playergamecartsshow color={this.color[1]} levels={[this.level[2],this.level[3],this.level[4]]} cards={[this.cards[2],this.cards[3],this.cards[4]]} name={[this.name[2],this.name[3],this.name[4]]} /></td>
    		<td className='gamecartsrow'> <Playergamecartsshow color={this.color[2]} levels={[this.level[5],this.level[6],this.level[7]]} cards={[this.cards[5],this.cards[6],this.cards[7]]} name={[this.name[5],this.name[6],this.name[7]]} /></td>
    		<td className='gamecartsrow'> <Playergamecartsshow color={this.color[3]} levels={[this.level[8],this.level[9],this.level[10]]} cards={[this.cards[8],this.cards[9],this.cards[10]]} name={[this.name[8],this.name[9],this.name[10]]} /></td>
    		<td className='gamecartsrow'> <Playergamecartsshow color={this.color[4]} levels={[this.level[11],this.level[12],this.level[13]]} cards={[this.cards[11],this.cards[12],this.cards[13]]} name={[this.name[11],this.name[12],this.name[13]]} /></td>
    		<td className='gamecartsrow'> <Playergamecartsshow color={this.color[5]} levels={[this.level[14],this.level[15],this.level[16]]} cards={[this.cards[14],this.cards[15],this.cards[16]]} name={[this.name[14],this.name[15],this.name[16]]} /></td>
    		<td className='gamecartsrow'> <Playergamecartsshow color={this.color[6]} levels={[this.level[17],this.level[18],this.level[19]]} cards={[this.cards[17],this.cards[18],this.cards[19]]} name={[this.name[17],this.name[18],this.name[19]]} /></td>
    		<td className='gamecartsrow'> <Playergamecartsshow color={this.color[7]} levels={[this.level[20],this.level[21]]} cards={[this.cards[20],this.cards[21]]} name={[this.name[20],this.name[21]]} /></td>
    		<td className='gamecartsrow'> <Playergamecartsshow color={this.color[8]} levels={[this.level[22],this.level[23],this.level[24]],this.level[25]} cards={[this.cards[22],this.cards[23],this.cards[24],this.cards[25]]} name={[this.name[22],this.name[23],this.name[24],this.name[25]]} /></td>
    		<td className='gamecartsrow'> <Playergamecartsshow color={this.color[9]} levels={[this.level[26],this.level[27]]} cards={[this.cards[26],this.cards[27]]} name={[this.name[26],this.name[27]]} /></td>
    	</tr></table>
    	</div>
    );
  }
}

export default Playergamecarts;
