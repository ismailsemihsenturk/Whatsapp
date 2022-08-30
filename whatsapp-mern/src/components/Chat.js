import React, { useState } from 'react'
import "./Chat.css"
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import MicIcon from '@mui/icons-material/Mic';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import axios from "../axios.js"

function Chat({ messages }) {

    const [input, setInput] = useState('')

    const sendMessage = async (e) => {
        e.preventDefault();

        console.log("geldi: " + input)
        await axios.post("/messages/new", {
            message: input,
            name: "İsmail Semih Şentürk",
            timestamp: Date.now(),
            received: false
        });
        setInput('');
    }

    return (
        <div className='chat'>
            <div className="chat__header">
                <Avatar />

                <div className="chat__headerInfo">
                    <h3>Kullanıcı adı</h3>
                    <p>Son görülme....</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">

                {messages.map((message) => {
                    return (
                        <p className={`chat__message ${message.received && "chat__receiver"}`}>
                            <span className="chat__name">{message.name}</span>
                            {message.message}
                            <span className="chat__timestamp"> {message.timestamp}</span>
                        </p>
                    )
                })}

            </div>


            <div className="chat__footer">
                <IconButton>
                    <SentimentVerySatisfiedIcon />
                </IconButton>
                <form action="">
                    <input type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Bir şeyler yaz" />
                    <button onClick={sendMessage} type="submit">Gönder</button>
                </form>
                <IconButton>
                    <MicIcon />
                </IconButton>
                <IconButton>
                    <CropOriginalIcon />
                </IconButton>
            </div>

        </div>
    )
}

export default Chat
