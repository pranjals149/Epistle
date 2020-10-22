import MicNoneIcon from '@material-ui/icons/MicNone';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import React, { useEffect, useState } from 'react';
import FlipMove from 'react-flip-move';

import '../Chat/Chat.css';
import { IconButton } from '@material-ui/core';
import Message from '../Message/Message';
import { selectChatId, selectChatName } from '../../features/chatSlice';
import { useSelector } from 'react-redux';
import db from '../../firebase';
import firebase from 'firebase';
import { selectUser } from '../../features/userSlice';

const Chat = () => {

    const user = useSelector(selectUser);
    const [input, setInput] = useState("")
    const chatName = useSelector(selectChatName)
    const chatId = useSelector(selectChatId);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (chatId) {
            db.collection('chats')
                .doc(chatId)
                .collection('messages')
                .orderBy('timestamp')
                .onSnapshot(snapshot => {
                    setMessages(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                });
        }
    }, [chatId])

    const sendMessage = (e) => {
        e.preventDefault();

        //Firebase
        db.collection('chats').doc(chatId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName
        })

        setInput("");
    }

    return (
        <div className="chat">
            {/* Header */}
            <div className="chat__header">
                <h4><span className="chat__name">{chatName}</span></h4>
                <AccountBoxRoundedIcon />
            </div>

            {/* Chat messages */}
            <div className="chat_messages">
                <FlipMove>
                    {messages.map(({ id, data }) => (
                        <Message key={id} contents={data} />
                    ))}
                </FlipMove>
            </div>

            {/* chat input */}
            <div className="chat__input">
                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        placeholder="Send message"
                    />

                    <button onClick={sendMessage}>Send Message</button>
                </form>

                <IconButton>
                    <MicNoneIcon className="chat__mic" />
                </IconButton>

            </div>
        </div>
    )
}

export default Chat;