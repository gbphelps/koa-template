import knex from '../connection';


function addUser(user){
    return knex('users').insert({
        username: user.username,
        password: user.password
    }).returning('*')
}

export {addUser}