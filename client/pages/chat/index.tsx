import React, { PureComponent } from "react";

import io from "socket.io-client";
let socket;
const ENDPOINT = "localhost:5000";

import { ChannelUsers } from "../../src/components";

export default class extends PureComponent {
    // This will return the URL parameters written before by the human
    static getInitialProps({ query }) {
        const { name, channel } = query;

        return { name, channel }
      }


    componentDidMount() {
        const { name, channel } = this.props;

        socket = io(ENDPOINT);
        
        socket.emit("join", { name, channel });
    }


    render() {
        const { channel } = this.props;

        return (
            <div className="h-screen grid grid-cols-2">
                <div className="flex items-center justify-center">
                    <div className="bg-white rounded-lg border-2 border-purple-900 p-4 w-1/2">
                        <h2 className="text-purple-600 p-2 border-b border-gray-400">#{channel}</h2>
                        
                        <div className="h-60 py-4 px-2">
                            Messages here
                        </div>

                        <div className="flex gap-2">
                            <input className="outline-none w-full border-b border-gray-400 focus:border-black px-2" type="text" name="message" placeholder="Say hi!" />
                            <button className="bg-yellow-400 hover:bg-yellow-300 py-2 px-4 border border-black">Send</button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center">
                    <div>
                        <h1 className="text-4xl font-bold mb-4">
                            Real-time chat <span role="img" aria-label="emoji">💬</span>
                        </h1>
                        <h2 className="text-3xl">
                            Try it out! <span role="img" aria-label="emoji">⬅️</span>
                        </h2>
                        
                        <ChannelUsers />
                    </div>
                </div>
            </div>
        )
    }
}