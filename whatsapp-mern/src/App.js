import { useEffect, useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import Pusher from "pusher-js"
import axios from "./axios.js"

function App() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function getMessages() {
      let res = await axios.get("/messages")
      setMessages(res.data)
    }
    getMessages()

  }, [])


  useEffect(() => {

    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function (newMessage) {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }


  }, [messages])

  console.log(messages)

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
