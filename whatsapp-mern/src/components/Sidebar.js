import React from 'react'
import "./Sidebar.css"
import SidebarChat from "./SidebarChat.js"
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';


function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                <Avatar alt="İsmail Semih Şentürk" src='https://media-exp1.licdn.com/dms/image/C4D03AQHEnBP1DNaWdg/profile-displayphoto-shrink_200_200/0/1633086662911?e=1667433600&v=beta&t=1O6oP4eZfTkeMk-navL9B4zfNbBc3q6x9d4rCyQoomo' />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchIcon />
                    <input type="text" placeholder='Yeni bir konuşma başlat' />
                </div>
            </div>

            <div className="sidebar__chat">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>

        </div>
    )
}

export default Sidebar
