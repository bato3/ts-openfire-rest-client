import client from './restClient'
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import { User } from './definitions';

export type TUserSearchParams = {
    search?: string,
    propertyKey?: string,
} | {
    search?: string,
    propertyKey: string,
    propertyValue: string
} | undefined;

export async function users(searchParams:TUserSearchParams  = undefined):Promise<IRestResponse<any>> {
    let options: IRequestOptions = {
        queryParameters: {
            params: searchParams || {}
        }
    }
    return await client().get('users', options);

}

export async function user(name: string) {
    return await client().get(`users/${name}`);
}