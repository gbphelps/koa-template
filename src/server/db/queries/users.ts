import knex from '../connection';

interface User {
    username: string,
    password: string,
}

function addUser(user: User){
    return knex('users').insert({
        username: user.username,
        password: user.password
    }).returning('*')
}

export {addUser}