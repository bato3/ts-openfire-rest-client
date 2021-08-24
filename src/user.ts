import client from './restClient.js'
import {OptionsOfJSONResponseBody} from 'got'

import { User, TUserSearchParams } from './definitions.js';



/**
 * Internal type, because response has "header"
 */
type TUsersResponse = {
    users: User[]
}

/**
 * Get list of users
 * @param searchParams?
 * @returns list of usres
 */

export async function users(searchParams:TUserSearchParams  = undefined):Promise<User[]> {
    let options: OptionsOfJSONResponseBody = {
        searchParams
    }
    return (await client().get<TUsersResponse>('users', options)).body.users;

}

/**
 * Get one user
 * @param name
 * @returns
 */
export async function user(name: string): Promise<User> {
    const resp = await client().get<User>(`users/${name}`);

    return resp.body
}

/**
 * Create new `User`.
 * @param user
 * @returns `true` if user created
 * @throws HTTPError if user exists (HTTP 409)
 */
export async function createUser(user: User): Promise<boolean> {
    const resp = await client().post('users',{json: user})
    return resp.statusCode == 201
}

/**
 * Update User
 * @param name
 * @param newData
 * @returns `true` if updated, `false` if user not found
 * @throws HTTPError if playload is wrong (500)
 */
export async function updateUser(name: string, newData:User): Promise<boolean> {
    const resp = await client().put(`users/${name}`,{json: newData})
    return resp.statusCode == 200
}


/**
 *
 * @param name
 * @returns
 */
export async function deleteUser(name: string) {
    const resp = await client().delete(`users/${name}`)
    return resp.statusCode == 200
}