import client from './restClient'
import {OptionsOfJSONResponseBody} from 'got'

import { User } from './definitions';

export type TUserSearchParams = {
    search?: string,
    propertyKey?: string,
} | {
    search?: string,
    propertyKey: string,
    propertyValue: string
} | undefined;

type TUsersResponse = {
    users: User[]
}



export async function users(searchParams:TUserSearchParams  = undefined):Promise<any> {
    let options: OptionsOfJSONResponseBody = {
        searchParams
    }
    return (await client().get<TUsersResponse>('users', options)).body.users;

}

export async function user(name: string): Promise<User> {
    const resp = await client().get<User>(`users/${name}`);

    console.log(resp.headers, typeof resp.body);
    return resp.body
}