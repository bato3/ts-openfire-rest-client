import { HTTPError } from 'got';
import { config } from 'dotenv';
config();
import { users, user, createUser, updateUser, deleteUser } from './index.js'
import { addUserGroups, addUserRoster, deleteUserRoster, userGroups, userRoster } from './user.js';
import { Subscription } from './definitions.js';

export function main() {
    console.log('go!');
    /*
    let a = createUser({
        name: 'Monika Łukaszów',
        username: 'mlukaszow',
        password: 'test'
    });
    */
   /*
    let a = addUserRoster('mkaczmarek',{
        jid:'alao@intradok.local',
        nickname:'Aleksandra Lao',
        groups: ['GK'],
        subscriptionType: Subscription.both
    })
     //*/

    //*
    let a = addUserRoster('alao',{
        jid:'adanczak@intradok.local',
        //nickname:'Michał Kaczmarek',
        groups: ['RI'],
        subscriptionType: Subscription.both
    })
    //*/

    //let a = deleteUserRoster('mlukaszow', 'adanczak')
    a.then((d:any) => {

        console.log(d, typeof d);
    }).catch((ex: HTTPError) => {
        //console.log(ex)
        console.log({ 'ex.code': ex.code, 'ex.response.statusCode': ex.response.statusCode, msg: ex.message })
    });
}

main();