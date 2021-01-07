import React from 'react'
import "./Imessage.css"
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Sidebar from "../component/sidebar/Sidebar"
import Chat from "./chat/Chat"
function Imessage() {
    return (
        <div className="iMessage">
            {/* Sidebar */ }
            <Sidebar />

            {/* Chat */ }
            <Chat />
        </div>
    )
}

export default Imessage
