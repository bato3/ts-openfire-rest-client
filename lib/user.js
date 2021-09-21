var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import client from './restClient.js';
/**
 * Get list of users
 * @param searchParams?
 * @returns list of usres
 */
export function users(searchParams = undefined) {
    return __awaiter(this, void 0, void 0, function* () {
        let options = {
            searchParams
        };
        return (yield client().get('users', options)).body.users;
    });
}
/**
 * Get one user
 * @param username
 * @returns
 */
export function user(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield client().get(`users/${username}`);
        return resp.body;
    });
}
/**
 * Create new `User`.
 * @param user
 * @returns `true` if user created
 * @throws HTTPError if user exists (HTTP 409)
 */
export function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield client().post('users', { json: user });
        return resp.statusCode == 201;
    });
}
/**
 * Update User
 * @param username
 * @param newData
 * @returns `true` if updated, `false` if user not found
 * @throws HTTPError if playload is wrong (500)
 */
export function updateUser(username, newData) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield client().put(`users/${username}`, { json: newData });
        return resp.statusCode == 200;
    });
}
/**
 * Delete user
 * @param name
 * @returns bool
 * @throws HTTPError
 */
export function deleteUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield client().delete(`users/${username}`);
        return resp.statusCode == 200;
    });
}
/**
 * Retrieve all user groups
 * @param username
 * @returns
 */
export function userGroups(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield client().get(`users/${username}/groups`);
        return resp.body.groupname;
    });
}
/**
 * Add user to groups
 * @param username
 * @param groups
 * @returns
 */
export function addUserGroups(username, groups) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield client().post(`users/${username}/groups`, { json: { groupname: groups } });
        return resp.statusCode == 201;
    });
}
/**
 * Delete a user from a groups
 * @param username
 * @param groups
 * @returns
 */
export function deleteUserGroups(username, groups) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield client().delete(`users/${username}/groups`, { json: { groupname: groups } });
        return resp.statusCode == 200;
    });
}
/**
 * Lockout a user
 * Endpoint to lockout / ban the user from the chat server. The user will be kicked if the user is online.
 * @param username
 * @returns
 */
export function banUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield client().post(`lockouts/${username}`);
        return resp.statusCode == 201;
    });
}
export const lockoutUser = banUser;
/**
 * Unlock a user
 * Endpoint to unlock / unban the user
 * @param username
 * @returns
 */
export function unlockUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield client().delete(`lockouts/${username}`);
        return resp.statusCode == 200;
    });
}
export const unbanUser = unlockUser;
/**
 * Retrieve user roster
 * Endpoint to get roster entries (buddies) from a specific user
 * @param username
 * @returns
 */
export function userRoster(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield client().get(`users/${username}/roster`);
        return resp.body.rosterItem;
    });
}
/**
 * Create a user roster entry
 * @param username
 * @param buddy
 * @returns
 * @throws HTTPError (409) if roster exists
 */
export function addUserRoster(username, buddy) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield client().post(`users/${username}/roster`, { json: buddy });
        return resp.statusCode == 201;
    });
}
/**
 * Delete a user roster entry
 * @param username
 * @param buddyJid
 * @returns
 */
export function deleteUserRoster(username, buddyJid) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield client().delete(`users/${username}/roster/${buddyJid}`);
        return resp.statusCode == 200;
    });
}
/**
 * Update a user roster entry
 * @param username
 * @param buddy
 * @param buddyJid
 * @returns
 */
export function updateUserRoster(username, buddy, buddyJid) {
    return __awaiter(this, void 0, void 0, function* () {
        if (buddyJid == null)
            buddyJid = buddy.jid;
        const resp = yield client().put(`users/${username}/roster`, { json: buddy });
        return resp.statusCode == 200;
    });
}
