import client from './restClient.js'
import {OptionsOfJSONResponseBody} from 'got'

import { User, TUserSearchParams, RosterItem } from './definitions.js';



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
 * @param username
 * @returns
 */
export async function user(username: string): Promise<User> {
    const resp = await client().get<User>(`users/${username}`);

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
 * @param username
 * @param newData
 * @returns `true` if updated, `false` if user not found
 * @throws HTTPError if playload is wrong (500)
 */
export async function updateUser(username: string, newData:User): Promise<boolean> {
    const resp = await client().put(`users/${username}`,{json: newData})
    return resp.statusCode == 200
}


/**
 * Delete user
 * @param name
 * @returns bool
 * @throws HTTPError
 */
export async function deleteUser(username: string): Promise<boolean> {
    const resp = await client().delete(`users/${username}`)
    return resp.statusCode == 200
}

type TUserGroups = {
    groupname: string[]
}

/**
 * Retrieve all user groups
 * @param username
 * @returns
 */
export async function userGroups(username: string): Promise<string[]> {
    const resp = await client().get<TUserGroups>(`users/${username}/groups`);

    return resp.body.groupname;
}

/**
 * Add user to groups
 * @param username
 * @param groups
 * @returns
 */
export async function addUserGroups(username: string, groups: string[]): Promise<boolean> {
    const resp = await client().post(`users/${username}/groups`, {json: {groupname:groups}})
    return resp.statusCode == 201;
}

/**
 * Delete a user from a groups
 * @param username
 * @param groups
 * @returns
 */
export async function deleteUserGroups(username: string, groups: string[]): Promise<boolean> {
    const resp = await client().delete(`users/${username}/groups`, {json: {groupname:groups}})
    return resp.statusCode == 200;
}

/**
 * Lockout a user
 * Endpoint to lockout / ban the user from the chat server. The user will be kicked if the user is online.
 * @param username
 * @returns
 */
export async function banUser(username: string): Promise<boolean> {
    const resp = await client().post(`lockouts/${username}`)
    return resp.statusCode == 201;
}
export const lockoutUser = banUser


/**
 * Unlock a user
 * Endpoint to unlock / unban the user
 * @param username
 * @returns
 */
export async function unlockUser(username: string): Promise<boolean> {
    const resp = await client().delete(`lockouts/${username}`)
    return resp.statusCode == 200;
}
export const unbanUser = unlockUser;

type TUserRoster = {
    rosterItem: RosterItem[]
}
/**
 * Retrieve user roster
 * Endpoint to get roster entries (buddies) from a specific user
 * @param username
 * @returns
 */
export async function userRoster(username: string): Promise<RosterItem[]> {
    const resp = await client().get<TUserRoster>(`users/${username}/roster`);

    return resp.body.rosterItem;
}

/**
 * Create a user roster entry
 * @param username
 * @param buddy
 * @returns
 * @throws HTTPError (409) if roster exists
 */
export async function addUserRoster(username: string, buddy: RosterItem): Promise<boolean> {
    const resp = await client().post(`users/${username}/roster`, {json:buddy})
    return resp.statusCode == 201;
}


/**
 * Delete a user roster entry
 * @param username
 * @param buddyJid
 * @returns
 */
export async function deleteUserRoster(username: string, buddyJid: string): Promise<boolean> {
    const resp = await client().delete(`users/${username}/roster/${buddyJid}`)
    return resp.statusCode == 200;
}

/**
 * Update a user roster entry
 * @param username
 * @param buddy
 * @param buddyJid
 * @returns
 */
export async function updateUserRoster(username: string, buddy: RosterItem, buddyJid?: string): Promise<boolean> {
    if(buddyJid == null)
        buddyJid = buddy.jid
    const resp = await client().put(`users/${username}/roster`, {json:buddy})
    return resp.statusCode == 200;
}