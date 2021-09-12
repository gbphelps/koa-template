import knex from 'knex';
import configs from '../../../knexfile';
import {Environment} from '../types';


const environment: Environment = (process.env.NODE_ENV as any) || 'development';

[environment];

export default knex(configs[environment]);