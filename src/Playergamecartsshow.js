import React, { Component } from 'react';

class Playergamecartsshow extends Component {

	makecards(index){
		return (			
				<div style={{backgroundColor :this.props.color, height : '1.5vw' , overflow: 'hidden', margin : '10px' ,padding : '5px'}}>
				{this.props.name[index]}
				</div>
			);
	}

	cards(){
		return this.props.cards.map((cards,index) => 	
					cards ==1 ?			
					this.makecards(index): ''				
			);
	}


  render() {
    return (
    	this.cards()
    );
  }
}

export default Playergamecartsshow;
