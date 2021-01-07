import React, {useState, useEffect} from 'react'
import "./Chat.css"
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { IconButton } from "@material-ui/core";
import MicNoneIcon from "@material-ui/icons/MicNone";
import Messages from "./messages/Messages"
import { selectChatName, selectChatId } from '../../features/chatSlice';
import { useSelector } from "react-redux" 
import db from "../../firebase"
import firebase from "firebase"
import { selectUser } from "../../features/userSlice"
import FlipMove from "react-flip-move"

function Chat ()
{
    const [ input, setInput ] = useState( "" )

    // Keep track of all the messages that are coming in 
    const [ messages, setMessages ] = useState( [] )

    // set out chatName to this or pull it from this
    const chatName = useSelector( selectChatName );

    // get the chatId
    const chatId = useSelector( selectChatId )

    // get the user info 9photo, email,displayName all is here 
    const user =useSelector(selectUser)
    
    // useEffect fire when something chnages un our case is the chatId
    useEffect( () =>
    {
        if ( chatId )
        {  // db(our database) ==> go inside of "chats" ==> set the doc to "chatId" ==> go the collection and get access to he messages ==> order by a timestamp and a descending timestamps
            db.collection( "chats" ).doc( chatId ).collection( "messages" ).orderBy( "timestamp", "desc" ).onSnapshot( ( snapshot ) =>
            {
             // setMessage to that above or store our data into our setMessages
            setMessages( snapshot.docs.map( doc => ( {
                id: doc.id,
                data: doc.data(),
            }))) 
            })
            
            
        }
    }, [ chatId ] )
    
    
    const sendMessage = e => {
        e.preventDefault();
        if (input) {
          db.collection("chats")
            .doc(chatId)
            .collection("messages")
            .add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              message: input,
              uid: user.uid,
              photo: user.photo,
              email: user.email,
              displayName: user.displayName
            });
          setInput("");
          
        }
    };
    
    return (
        <div className="chat">
            {/* chat Header */ }
            <div className="chat__header">
                <h4>To: <span className="chat__name">{chatName}</span></h4>
                <strong>Details</strong>
                </div>
            
            {/* chat messages */ }
            <div className="chat__messages">
                    <FlipMove> 
                        {/* render our messages */ }
                        { messages.map( ({id, data}) => (
                            <Messages key={id} contents={data} />
                        ) ) }
                    </FlipMove>
                
                </div>
            
            {/* chat input */ }
            <div className="chat__input">
                <form>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        type="text"
                        placeholder="Send Message"
                    ></input>
                    <button type="submit" onClick={sendMessage} >
                        Send Message
                    </button>
                </form>
                <IconButton>
                    <MicNoneIcon className="chat__mic" />
                </IconButton>
            </div>

        </div>
    )
}

export default Chat
