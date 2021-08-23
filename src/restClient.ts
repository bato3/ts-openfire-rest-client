
import got, {Got} from 'got';
const pjson = require('../package.json');


let clientInstance: Got;

export default function client():Got {
    if(clientInstance == null) {
        clientInstance = got.extend({
            prefixUrl: process.env.OPENFIRE_REST_BASE_URL,
            headers: {
                'Authorization' : process.env.OPENFIRE_REST_SECRET_KEY ,
                'Content-Type' : 'application/json',
                'Accept': 'application/json',
                'user-agent': process.env.OPENFIRE_REST_USERAGENT || `${pjson.name}/${pjson.version}`
            },
            responseType: 'json'
        });
    }
    return clientInstance;
}
/**
 * Set custom `typed-rest-client/RestClient`
 */

export function setCustomClient(cl: Got): void {
    clientInstance = cl
}
