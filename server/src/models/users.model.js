const users = new Map();

const user = {
    id: 1,
    name: 'John Doe',
    email: 'john@doe.com',
    password: 'password'
    };
    
users.set(user.id, user);


module.exports = {
    users
}
