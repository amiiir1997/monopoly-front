import React, { Component } from 'react';
import './Move.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class Roll extends Component {

  move = [];
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
  price = [60,60,100,100,120,140,140,160,180,180,200,220,220,240,260,260,280,300,300,320,350,400,200,200,200,200,140,150];
  rent = [[2,4,6,6,8,10,10,12,14,14,16,18,18,20,22,22,24,26,26,28,35,50,25,25,25,25]
  ,[10,20,30,30,40,50,50,60,70,70,80,90,90,100,110,110,120,130,130,150,175,200,50,50,50,50]
  ,[30,60,90,90,100,150,150,180,200,200,220,250,250,300,330,330,360,390,390,450,500,600,100,100,100,100]
  ,[90,180,270,270,300,450,450,500,550,550,600,700,700,750,800,800,850,900,900,1000,1100,1400,200,200,200,200]
  ,[160,320,400,400,450,625,625,700,700,700,800,875,875,925,975,975,1025,1100,1100,1200,1300,1700]
  ,[250,450,550,550,600,750,750,900,900,950,1000,1050,1050,1100,1150,1150,1200,1275,1275,1400,1500,2000]];

	domove(buy , rent){
    if(rent < this.mymoney){
      alert('Not enough Money');
    }
    else{
      const article = { playercode: this.props.playercode , buy : buy};
      axios.post('http://localhost/ws/laravel-websocket/public/domove', article) //window.location.hostname
        .then('')
        .catch(error => alert(error));
      }
	}

  mymoney(){
    let money = 0 ;
    this.props.playersdata.map(playerdata => playerdata['gamenumber'] == this.props.gamenumber ? money = playerdata['money'] :'');
    return money;
  }

  render() {
    this.props.move.map(move => this.move = move);
    return (
      <div className='Move'>
      {this.move['id'] == 1 ?
        <div>
          <div className='title'><img src={'./images/p'+this.move['playernum']+'.png'} className='image'/> Can Buy</div><br />
          <div className='cardname'>{this.name[this.move['cardnum']]}</div><br />
          {this.props.turn == this.props.gamenumber ?
            <div>
              <Button variant="primary" className='Button' onClick={ () => this.domove(1,this.price[this.move['cardnum']])}>Buy For {this.price[this.move['cardnum']]} $</Button>
              <Button variant="primary" className='Button' onClick={ () => this.domove(0,0)}>Skip</Button>
            </div>
            :<div></div>}
        </div>
      : this.move['id'] == 2 ?
        <div>
          <div className='title'><img src={'./images/p'+this.move['playernum']+'.png'} className='image'/> Should Pay 
          <img src={'./images/p'+this.move['owner']+'.png'} className='image'/></div><br />
          <div className='cardname'>{this.name[this.move['cardnum']]}</div><br />
          {this.props.turn == this.props.gamenumber ?
            <div>
          <Button variant="primary" className='Button' onClick={ () => this.domove(0,this.rent[this.move['level']-'0'][this.move['cardnum']])}>Pay Rent {this.rent[this.move['level']-'0'][this.move['cardnum']]} $</Button>
          </div>
            :<div></div>}
        </div>
      :this.move['id'] == 3 ?
        <div>
          <div className='title'><img src={'./images/p'+this.move['playernum']+'.png'} className='image'/> Should Pay 
          <img src={'./images/p'+this.move['owner']+'.png'} className='image'/></div><br />
          <div className='cardname'>{this.name[this.move['cardnum']]}</div><br />
          {this.props.turn == this.props.gamenumber ?
            <div>
          <Button variant="primary" className='Button' onClick={ () => this.domove(0,this.move['level'] == 0 ? parseInt(this.move['dices'])*4 : parseInt(this.move['dices'])*10)}>Pay Rent {this.move['level'] == 0 ? parseInt(this.move['dices'])*4 : parseInt(this.move['dices'])*10} $</Button>
          </div>
            :<div></div>}
        </div>
      :this.move['id'] == 4 ?
        <div>
          <div className='title'><img src={'./images/p'+this.move['playernum']+'.png'} className='image'/> Should Pay Tax
          </div><br />
          {this.props.turn == this.props.gamenumber ?
            <div>
          <Button variant="primary" className='Button' onClick={ () => this.domove(0,this.move['tax'])}>Pay Tax {this.move['tax']} $</Button>
          </div>
            :<div></div>}
        </div>
      :this.move['id'] == 5 ?
        <div>
          <div className='title'><img src={'./images/p'+this.move['playernum']+'.png'} className='image'/> Is In Jail Now
          </div><br />
          {this.props.turn == this.props.gamenumber ?
            <div>
          <Button variant="primary" className='Button' onClick={ () =>this.domove(0,0)}>Skip</Button>
          </div>
            :<div></div>}
        </div>
      :this.move['id'] == 6 ?
        <div>
          <div className='title'><img src={'./images/p'+this.move['playernum']+'.png'} className='image'/> Just Visiting Jail
          </div><br />
          {this.props.turn == this.props.gamenumber ?
            <div>
          <Button variant="primary" className='Button' onClick={ () => this.domove(0,0)}>Skip</Button>
          </div>
            :<div></div>}
        </div>
      :this.move['id'] == 7 ?
        <div>
          <div className='title'><img src={'./images/p'+this.move['playernum']+'.png'} className='image'/> Is In Free Parking
          </div><br />
          {this.props.turn == this.props.gamenumber ?
            <div>
          <Button variant="primary" className='Button' onClick={ () => this.domove(0,0)}>Skip</Button>
          </div>
            :<div></div>}
        </div>
      :this.move['id'] == 8 ?
        <div>
          <div className='title'><img src={'./images/p'+this.move['playernum']+'.png'} className='image'/> Is In Box
          </div><br />
          {this.props.turn == this.props.gamenumber ?
            <div>
          <Button variant="primary" className='Button' onClick={ () => this.domove(0,0)}>Skip</Button>
          </div>
            :<div></div>}
        </div>
      :this.move['id'] == 9 ?
        <div>
          <div className='title'><img src={'./images/p'+this.move['playernum']+'.png'} className='image'/> Is In Chance
          </div><br />
          {this.props.turn == this.props.gamenumber ?
            <div>
          <Button variant="primary" className='Button' onClick={ () => this.domove(0,0)}>Skip</Button>
          </div>
            :<div></div>}
        </div>
      :''
      }
    </div>
    );
  }
}

export default Roll;
