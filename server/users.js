const users = [];

const addUser = ({ id, name, channel }) => {
    const userExistsInChannel = users.find(user => user.name === name && user.channel === channel);

    if(userExistsInChannel) return { error: "Username is taken." }
    
    const user = { id, name, channel };
    users.push(user);

    return { user };
}



const removeUser = id => {
    const userIndex = users.findIndex(user => user.id === id);

    if(userIndex !== -1) return users.splice(userIndex, 1)[0];
}



const getUser = id => users.find(user => user.id === id);



const getUsersInChannel = channel => users.filter(user => user.channel === channel);

module.exports = { addUser, removeUser, getUser, getUsersInChannel };