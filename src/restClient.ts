import {IRequestOptions, RestClient, IRestResponse} from 'typed-rest-client/RestClient';
import {IHttpClient, IHttpClientResponse, IRequestHandler, IRequestInfo} from 'typed-rest-client/Interfaces'


let clientInstance:RestClient|null = null;

export class SecretKeyCredentialHandler implements IRequestHandler {
    token: string;
    allowCrossOriginAuthentication: boolean;
    //@ts-expect-error
    origin: string;

    constructor(token: string, allowCrossOriginAuthentication?: boolean) {
        this.token = token;
        this.allowCrossOriginAuthentication = !!allowCrossOriginAuthentication;
    }

    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options:any): void {
        if (!this.origin) {
            this.origin = options.host;
        }
        // If this is a redirection, don't set the Authorization header
        if (this.origin === options.host || this.allowCrossOriginAuthentication) {
            //options.headers['Authorization'] = `Bearer ${this.token}`;
            options.headers['Authorization'] = `${this.token}`;
        }
        options.headers['X-TFS-FedAuthRedirect'] = 'Suppress';
    }

    // This handler cannot handle 401
    canHandleAuthentication(response: IHttpClientResponse): boolean {
        return false;
    }

    handleAuthentication(httpClient: IHttpClient, requestInfo: IRequestInfo, objs :any): Promise<IHttpClientResponse> {
        //@ts-expect-error
        return null;
    }
}


export default function client():RestClient {
    if(clientInstance == null) {

        const cfg = {
            headers: {
                'Authorization' : process.env.OPENFIRE_REST_SECRET_KEY ,
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            },
            ignoreSslError: /^(?:y|yes|true|1|on)$/i.test(process.env.OPENFIRE_REST_IGNORE_SSL_ERRORS || 'false')
        };
        clientInstance = new RestClient(
            process.env.OPENFIRE_REST_USERAGENT || 'ts-openfire-rest-client',
            process.env.OPENFIRE_REST_BASE_URL,
            [new SecretKeyCredentialHandler(process.env.OPENFIRE_REST_SECRET_KEY)]
        );
    }
    return clientInstance;
}
/**
 * Set custom `typed-rest-client/RestClient`
 */

export function setCustomClient(cl: RestClient): void {
    clientInstance = cl
}

export { IRestResponse, IRequestOptions };