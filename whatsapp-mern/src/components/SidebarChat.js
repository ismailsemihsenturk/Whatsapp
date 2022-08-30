import React from 'react'
import "./SidebarChat.css"
import Avatar from '@mui/material/Avatar';

function SidebarChat() {
    return (
        <div className='sidebarChat'>
            <Avatar alt='Mete Han' src='https://imgs.search.brave.com/DEmYd2U6Ias6AIyx9vhX73u-TlY6Pn-XwTSTg8nHdHs/rs:fit:290:298:1/g:ce/aHR0cHM6Ly91c2Vy/c2NvbnRlbnQyLmVt/YXplLmNvbS9pbWFn/ZXMvYmRmMmI5MjIt/MTMyZS00NDY1LWJh/OTYtMGFiZDE1ZTEw/NGYyLzc1Mzk2ODVi/LTAwNDUtNGNhYS1h/M2QxLTA5OTk0N2Y2/MTZjNC5qcGc'/>
            <div className="sidebarChat__info">
                <h2>MeteHan Temel</h2>
                <p>En son mesaj</p>
            </div>
        </div>
    )
}

export default SidebarChat
