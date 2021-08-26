import React from "react";

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from "./Message";

const Messages = ({ messages, currentName }) => 
    <ScrollToBottom>
        <div className="h-60 py-4 px-2">
            {
                messages.map((message, index) =>
                    <Message key={index} message={message} currentName={currentName} />
                )
            }
        </div>
    </ScrollToBottom>

export default Messages;