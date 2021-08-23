
import {config} from 'dotenv';
config();

import {users, user} from '../src/user'

console.log('go!');

users().catch(ex => console.log(ex)).then(d => {

    console.log(d, typeof d)
})