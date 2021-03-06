import React from "react";

const ChannelUsers = ({ users, currentName }) => 
    <div className="bg-gray-100 mt-10 p-4">
        <p className="border-b border-gray-400 mb-4">Humans in channel</p>

        <div className="h-32 overflow-y-auto">
            {
                users.map((user, index) => 
                    <div key={index} className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded bg-green-400"/> {user.name} {currentName === user.name && "(you)"}
                    </div>
                )
            }
        </div>
    </div>

export default ChannelUsers;