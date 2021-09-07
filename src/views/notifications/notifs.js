/*
{
  "message": "insert",
  "username": "60cca063b036b51e8d33013a",
  "notificationView": {
    "userId": "60cca063b036b51e8d33013a",
    "type": "rdi",
    "id_event": 128,
    "read": false,
    "due_date": null,
    "id_ens_creator": null,
    "id_ens_modifier": null,
    "createdAt": "2021-09-06T15:28:59.475749",
    "modifiedAt": "2021-09-06T15:28:59.475749",
    "deleted": false,
    "followup_id": null
  }
}
import logo from './logo.svg';
import './App.css';
import React, { useState,useEffect } from 'react';
import SockJsClient from 'react-stomp';

const SOCKET_URL = 'http://localhost:8799/ws';

function App() {
  const [message, setMessage] = useState('You server message here.');

  let onConnected = () => {
    console.log("Connected!!")
  }

  const onMessageReceived = (msg) => {
    setMessage(msg.message);
  }
  useEffect(() => {
    console.log(message);
    
  }, [message])

  return (
    <div>
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/message']}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
      />
      <div>{message}</div>
    </div>
  );
}

export default App;
*/




import React from 'react';
import { Client } from '@stomp/stompjs';

const SOCKET_URL = 'ws://localhost:8799/ws';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: ['You server message here.'],
    };
  };

  componentDidMount() {
    let currentComponent = this;
    let onConnected = () => {
      console.log("Connected!!")
      client.subscribe('/users/queue/messages', function (msg) {
        if (msg.body) {
          var jsonBody = JSON.parse(msg.body);
          console.log(jsonBody)
          if (jsonBody) {
            currentComponent.setState({messages : [ jsonBody.message ]})
          }
        }
      });
    }

    let onDisconnected = () => {
      console.log("Disconnected!!")
    }

    const client = new Client({
      brokerURL: SOCKET_URL,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: onConnected,
      onDisconnect: onDisconnected,
      connectHeaders: {username:"60cca063b036b51e8d33013a"}
    });

    client.activate();
  };

  render() {
    return (
      <div>
        <div>{this.state.messages}</div>
      </div>
    );
  }

}

export default App;