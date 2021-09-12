import knex from 'knex';
import configs from '../../../knexfile.js';
 
const environment = process.env.NODE_ENV || 'development';
[environment];

export default knex(configs[environment]);