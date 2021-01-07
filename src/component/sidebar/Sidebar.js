import React, {useState, useEffect} from 'react'
import "./Sidebar.css"
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import { withStyles } from "@material-ui/core/styles";
import {Avatar, IconButton} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Tooltip, TextField, Button } from "@material-ui/core";
import RateReviewIcon from '@material-ui/icons/RateReview';
import SidebarChat from "./sidebarChat/SidebarChat"
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice"
import db, {auth} from "../../firebase"


function Sidebar ()
{
    const user = useSelector( selectUser );
    
    // Keep track of the chat
    const [ chat, setChat ] = useState( [] )
    
    // when the side component load we gon a use a useEffect to fire up the peace of code
    useEffect( () =>
    {
        // creat a collection of chats
        db.collection( "chats" ).onSnapshot( snapshot => (
            setChat( snapshot.docs.map( doc => ( {
                id: doc.id,
                data: doc.data()
            })))
        ))
    }, [] )
    
    // Add chat on click
    const addChat = () =>
    {
        // prompt to ask for a chat name  and add it to our sidebar 
        const chatName = prompt( "Please enter a chat name" )

        if ( chatName )
        {
          db.collection( "chats" ).add( {
            chatName: chatName,
        })  
        }
    }


    return (
        <div className="sidebar">

            {/* Header section  */ }
            <div className="sidebar__header">

                <Avatar onClick={() => auth.signOut() } className="sidebar__avatar" src={user.photo} />
                
                <div className="sidebar__input">
                    <SearchIcon />
                    <input type="text" placeholder="Search"/>
                </div>
                <IconButton variant="outlined" className="sidebar__inputButton" > 
                    <RateReviewIcon onClick={addChat} className="sidebar__Icon"/>
                </IconButton>
            </div>

            
            {/* Sidebar chats */ }
            <div className="sidebar__chats">
                {/* we chats being puled from our db, we gon a map through everysinlgle chat and render a sidebarchat  */}
                { chat.map( ({id, data: {chatName}}) => (
                    <SidebarChat key={ id } id={ id } chatName={ chatName}/>
                ))}
                
                
            </div>
        </div>
    )
}

export default Sidebar
