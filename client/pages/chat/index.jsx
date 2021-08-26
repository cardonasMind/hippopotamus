import React, { PureComponent } from "react";

import io from "socket.io-client";
const ENDPOINT = "localhost:5000";
let socket = io(ENDPOINT);

import { Messages, ChannelUsers } from "../../src/components";

export default class extends PureComponent {
    state = {
        message: "",
        messages: [],
        users: []
    };

    // This will return the URL parameters written before by the human
    static getInitialProps({ query }) {
        const { name, channel } = query;

        return { name, channel }
    }



    componentDidMount() {
        const { name, channel } = this.props;
        
        socket.emit("join", { name, channel }, error => {
            error && alert(error);
        });

        socket.on("message", message => {
            this.setState(prevState => ({ messages: [...prevState.messages, message] }) );
        });

        socket.on("channelData", users => {
            this.setState(users);
        });
    }

    componentWillUnmount() {
        socket.disconnect();
    }



    handleChange = e => this.setState({ message: e.target.value });

    handleEnterKeyPress = e => e.key === "Enter" && this.sendMessage();
    
    sendMessage = () => {
        const { message } = this.state;
    
        if(message !== "") {
            socket.emit("sendMessage", message, () => this.setState({ message: "" }) );
        }
    }

    render() {
        const { message, messages, users } = this.state;
        const { name, channel } = this.props;

        return (
            <div className="h-screen grid md:grid-cols-2 my-4">
                <div className="flex items-center justify-center">
                    <div className="bg-white rounded-lg border-2 border-purple-900 p-4">
                        <h2 className="text-purple-600 p-2 border-b border-gray-400">#{channel}</h2>
                        
                        <Messages messages={messages} currentName={name} />

                        <div className="flex gap-2">
                            <input className="outline-none w-full border-b border-gray-400 focus:border-black px-2" 
                            type="text" name="message" placeholder="Say hi!" value={message} onChange={this.handleChange} 
                            onKeyPress={this.handleEnterKeyPress} />
                            <button className="bg-yellow-400 hover:bg-yellow-300 py-2 px-4 border border-black" 
                            onClick={this.sendMessage}>Send</button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center mt-10 md:mt-0 mx-auto md:mx-0">
                    <div>
                        <h1 className="text-4xl font-bold mb-4">
                            Real-time chat <span role="img" aria-label="emoji">💬</span>
                        </h1>
                        <h2 className="text-3xl">
                            Try it out! <span role="img" aria-label="emoji">⬅️</span>
                        </h2>

                        <p className="mt-2">Emojis are supported! (Try with :D | :wink: | :100: )</p>
                        
                        <ChannelUsers users={users} currentName={name} />
                    </div>
                </div>
            </div>
        )
    }
}