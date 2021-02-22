import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Echo from 'laravel-echo';

class App2 extends Component {

  test(){
    window.Pusher = require ('pusher-js');
    window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '123456',
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
});
  }

  test2() {
        window.Echo.channel('my-channel').listen('Newmassage', (e) => {
        alert(e.message)
        })
  }

  render() {
    return (
      <h1>
      {
        Cookies.set('playercode','8nygVsG9Uavz32wDHYFv', { expires: 1 , path: '' })
      }
      </h1>
    );
  }


}

export default App2;
