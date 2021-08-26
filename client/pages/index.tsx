import React, { PureComponent } from "react";

import Router from "next/router";

export default class extends PureComponent {
  state = {
    name: "",
    channel: "lobby"
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  handleButton = () => {
    const { name, channel } = this.state;

    if(name !== "") {
      const isChannelLobby = channel !== "" ? channel : "lobby";

      Router.push(`/chat?name=${name}&channel=${isChannelLobby}`);
    }
  }

  render() {
    const { name, channel } = this.state;

    return (
      <div className="h-screen bg-purple-900 flex items-center justify-center">
        <div>
          <h1 className="text-white text-4xl pb-6">Hippopotamus chat</h1>

          <div className="bg-white p-6 rounded-lg">
            <div className="grid gap-1 mb-4">
              <p>Your name *</p>
              <input className="p-2 rounded border border-gray-400" type="text" name="name" value={name} 
              onChange={this.handleChange} />
            </div>

            <div className="grid gap-1">
              <p>Channel *</p>
              <input className="p-2 rounded border border-gray-400" type="text" placeholder="lobby by default"
              name="channel" value={channel} onChange={this.handleChange}/>
            </div>

            <button className="bg-yellow-400 hover:bg-yellow-300 py-2 px-4 mt-6 border border-black"
            onClick={this.handleButton}>Join channel</button>
          </div>
        </div>
      </div>
    )
  }
}