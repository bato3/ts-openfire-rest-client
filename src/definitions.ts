/**
 * Us used by: User, ...
 * https://www.igniterealtime.org/projects/openfire/plugins/1.3.10/restAPI/readme.html#system-property
 */
export type Property = {
    key: string,
    value: string,
}



export type User = {
    /**
     * The username of the user
     */
    username: string,
    /**
     * The name of the user
     */
    name?: string,
    /**
     * The email of the user
     */
    email?: string,
    /**
     * The password of the user
     */
    password: string,
    /**
     * List of properties. Property is a key / value object. The key must to be per user unique
     */
    properties?: Property[]
};

/**
 * The subscription type
 * Possible numeric values are: -1 (remove), 0 (none), 1 (to), 2 (from), 3 (both)
 */
export enum Subscription {
    remove = "-1",
    none = "0",
    to = "1",
    from= "2",
    both= "3"
}
/**
 * The subscription type
 */
export type SubscriptionType = `${Subscription}`


export type RosterItem = {
    /**
     * The JID of the roster item, eg.: peter@pan.de
     */
    jid: string,
    /**
     * The nickname for the user when used in this roster
     */
    nickname?: string,
    /**
     * The subscription type
     * Possible numeric values are: -1 (remove), 0 (none), 1 (to), 2 (from), 3 (both)
     */
    subscriptionType?: SubscriptionType,
    /**
     * ```xml
     * 	<groups>
	 *  	<group>Support</group>
	 *  </groups>
    ```
     */
    groups:string[]
};




export type Chatroom = {
    /**
     * The name/id of the room. Can only contains lowercase and alphanumeric characters.
     */
    roomName: string,
    /**
     * Also the name of the room, but can contains non alphanumeric characters. It’s mainly used for users while discovering rooms hosted by the Multi-User Chat service.
     */
    naturalName: string,
    /**
     * Description text of the room.
     */
    description: string,
    /**
     * Subject of the room.
     */
    subject?: string,
    /**
     * The password that the user must provide to enter the room
     */
    password?: string,
    /**
     * The date when the room was created. Will be automatically set by creation. Example: 2014-07-10T09:49:12.411+02:00
     */
    creationDate?: string,
    /**
     * The last date when the room’s configuration was modified. If the room’s configuration was never modified then the initial value will be the same as the creation date. Will be automatically set by update. Example: 2014-07-10T09:49:12.411+02:00
     */
    modificationDate?: string,
    /**
     * The maximum number of occupants that can be simultaneously in the room. 0 means unlimited number of occupants.
     */
    maxUsers?: number,
    /**
     * Can be “true” or “false”. Persistent rooms are saved to the database to make their configurations persistent together with the affiliation of the users. Otherwise the room will be destroyed if the last occupant leave the room.
     */
    persistent?: boolean,
    /**
     * Can be “true” or “false”. True if the room is searchable and visible through service discovery.
     */
    publicRoom?: boolean,
    /**
     * Can be “true” or “false”. True if users are allowed to register with the room. By default, room registration is enabled.
     */
    registrationEnabled?: boolean,
    /**
     * Can be “true” or “false”. True if every presence packet will include the JID of every occupant.
     */
    canAnyoneDiscoverJID?: boolean,
    /**
     * Can be “true” or “false”. True if participants are allowed to change the room’s subject.
     */
    canOccupantsChangeSubject?: boolean,
    /**
     * Can be “true” or “false”. True if occupants can invite other users to the room. If the room does not require an invitation to enter (i.e. is not members-only) then any occupant can send invitations. On the other hand, if the room is members-only and occupants cannot send invitation then only the room owners and admins are allowed to send invitations.
     */
    canOccupantsInvite?: boolean,
    /**
     *  	Can be “true” or “false”. True if room occupants are allowed to change their nicknames in the room. By default, occupants are allowed to change their nicknames.
     */
    canChangeNickname?: boolean,
    /**
     * Can be “true” or “false”. True if the room’s conversation is being logged. If logging is activated the room conversation will be saved to the database every couple of minutes. The saving frequency is the same for all the rooms and can be configured by changing the property “xmpp.muc.tasks.log.timeout”.
     */
    logEnabled?: boolean,
    /**
     * Can be “true” or “false”. True if registered users can only join the room using their registered nickname. By default, registered users can join the room using any nickname.
     */
    loginRestrictedToNickname?: boolean,
    /**
     * Can be “true” or “false”. True if the room requires an invitation to enter. That is if the room is members-only.
     */
    membersOnly?: boolean,
    /**
     * Can be “true” or “false”. True if the room in which only those with “voice” may send messages to all occupants.
     */
    moderated?: boolean,
    /**
     * The list of roles of which presence will be broadcasted to the rest of the occupants.
     * ```xml
    <broadcastPresenceRoles>
        <broadcastPresenceRole>moderator</broadcastPresenceRole>
        <broadcastPresenceRole>participant</broadcastPresenceRole>
        <broadcastPresenceRole>visitor</broadcastPresenceRole>
    </broadcastPresenceRoles>
    ```
     */
    broadcastPresenceRoles?: string[],
    /**
     * A collection with the current list of owners. The collection contains the bareJID of the users with owner affiliation.
     */
    owners?: string[],
    /**
     * A collection with the current list of admins. The collection contains the bareJID of the users with admin affiliation.
     */
    admins?: string[],
    /**
     * A collection with the current list of room members. The collection contains the bareJID of the users with member affiliation. If the room is not members-only then the list will contain the users that registered with the room and therefore they may have reserved a nickname.
     */
    members?: string[],
    /**
     * A collection with the current list of outcast users. An outcast user is not allowed to join the room again. The collection contains the bareJID of the users with outcast affiliation.
     */
    outcasts?: string[],
    /**
     * A collection with the current list of groups with owner affiliation. The collection contains the name only.
     */
    ownerGroups?: string[],
    /**
     * A collection with the current list of groups with admin affiliation. The collection contains the name only.
     */
    adminGroups?: string[],
    /**
     * A collection with the current list of groups with member affiliation. The collection contains the name only.
     */
    memberGroups?: string[],
    /**
     *  	A collection with the current list of groups with outcast affiliation. The collection contains the name only.
     */
    outcastGroups?: string[]
};

export type Group = {

    /**
     * The name of the group
     */
    name: string,

    /**
     * The description of the group
     */
    description: string,

    /**
     * A collection with current admins of the group
     */
    admins?: string[],

    /**
     * A collection with current members of the group
     */
    members?: string
}