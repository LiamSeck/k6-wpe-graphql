// The base_url, username and password variables can be modified at run time by passing the -e HOSTNAME flag e.g k6 run -e HOSTNAME=domain.com USERNAME=Your_Username PASSWORD=Your_Password WPGraphQL.js
export const base_url = __ENV.HOSTNAME || 'liamsegraphql.wpenginepowered.com';

export const username = __ENV.USERNAME || 'xxxxxxxxxxxx';

export const password = __ENV.PASSWORD || 'xxxxxxxxxxxx';

export const authToken = __ENV.AUTHTOKEN || 'xxxxxxxxxxxx';