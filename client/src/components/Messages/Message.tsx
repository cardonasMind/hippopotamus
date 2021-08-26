import React from "react";

import ReactEmoji from 'react-emoji';

const Message = ({ message: { user, text }, currentName }) => {
    const isSentByCurrentName = user === currentName;

    return (isSentByCurrentName ?
        <div className="w-max bg-blue-200 my-1 ml-auto flex items-center gap-1">
            {ReactEmoji.emojify(text)} <small>(you)</small>
        </div>

    :
        <p className="my-1 flex items-center gap-1">
            <small className="text-blue-600">@{user}</small> {ReactEmoji.emojify(text)}
        </p>
    );
}

export default Message;