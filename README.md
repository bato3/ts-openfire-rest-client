# ts-openfire-rest-client
A Node client for the [Openfire REST API Plugin](https://www.igniterealtime.org/projects/openfire/plugins/1.3.10/restAPI/readme.html).

It cover 1.3.10 version, because my server can't use never version xD.

## Install
```sh
npm install https://github.com/bato3/ts-openfire-rest-client
```

Set env variables:
```
OPENFIRE_REST_BASE_URL = http://example.com:9090/plugins/restapi/v1/
OPENFIRE_REST_SECRET_KEY = SUPER-SECRET
```

## Advanced Usage

```js
const {setCustomClient} = require('ts-openfire-restapi')
const got = require('got')

const instance = got.extend({
            prefixUrl: process.env.OPENFIRE_REST_BASE_URL,
            headers: {
                'Authorization' : process.env.OPENFIRE_REST_SECRET_KEY ,
                'Content-Type' : 'application/json',
                'Accept': 'application/json',
                'user-agent': process.env.OPENFIRE_REST_USERAGENT || `${pjson.name}/${pjson.version}`
            },
            responseType: 'json',
        });

setCustomClient(instance);

```

## TODO:
[x] User related REST Endpoints
[ ] Chat room related REST Endpoints
[ ] System related REST Endpoints
[ ] Group related REST Endpoints
[ ] Session related REST Endpoints
[ ] Message related REST Endpoints
[ ] Security Audit related REST Endpoints
[x] Data types
[ ] Tests
[ ] publish npm/yarn module



## About transport

This lib uses https://github.com/sindresorhus/got
