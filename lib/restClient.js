import got from 'got';
import { readFileSync } from 'fs';
const pjson = JSON.parse(readFileSync('package.json', 'utf8'));
//console.log(pjson)
import debugModule from 'debug';
const printBody = debugModule('openfire:body');
const printHeaders = debugModule('openfire:headres');
const printInfo = debugModule('openfire:info');
let clientInstance;
export default function client() {
    if (clientInstance == null) {
        clientInstance = got.extend({
            prefixUrl: process.env.OPENFIRE_REST_BASE_URL,
            headers: {
                'Authorization': process.env.OPENFIRE_REST_SECRET_KEY,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'user-agent': process.env.OPENFIRE_REST_USERAGENT || `${pjson.name}/${pjson.version}`
            },
            responseType: 'json',
            /*
                    handlers: [
                        (options, next) => {
            
                            //console.log(options);
                            console.log(`Sending ${options.method} to ${options.url}`);
                            return next(options);
                        }
                    ],
                    */
            hooks: {
                afterResponse: [
                    (response) => {
                        let t = `${response.timings.phases.total}ms`;
                        //@ts-expect-error
                        if (response.timings.phases.total > 300) //@ts-expect-error
                            t = (response.timings.phases.total / 1000) + 's';
                        printInfo(`${response.request.options.method}(${response.statusCode}) ${t} ${response.request.options.url}`);
                        printHeaders(response.headers);
                        printBody('' + response.rawBody);
                        printInfo(response.headers, { body: '' + response.rawBody });
                        return response;
                    }
                ]
            }
        });
    }
    return clientInstance;
}
/**
 * Set custom `typed-rest-client/RestClient`
 */
export function setCustomClient(cl) {
    clientInstance = cl;
}
