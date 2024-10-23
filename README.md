### K6 Script Load Testing WPGraphQL:

- This script is based on [the Grafana example](https://github.com/grafana/k6/blob/master/examples/graphql.js)

- This K6 script targets a WordPress install on WPE with [WPGraphQL](https://github.com/wp-graphql/wp-graphql) intalled: https://liamsegraphql.wpenginepowered.com/ 

---

### Execution Steps:
- On MacOS install K6 by running `brew install k6` or by following the [K6 Docs](https://grafana.com/docs/k6/latest/set-up/install-k6/).

- To execute the script using your local machines resources run `k6 run WPGraphQL.js`.

- To execute the script using K6 Cloud first authenticate with K6 Cloud by running `k6 login cloud --token token_ID` then to execute the script by running `k6 cloud run WPGraphQL.js`.

- To define the hostname, username, password or authtoken at run time add the following flags:
    - Local Execution: `k6 run -e HOSTNAME=domain.com USERNAME=Your_Username PASSWORD=Your_Password AUTHTOKEN=Your_Token WPGraphQL.js`
    - Cloud Execution: `k6 cloud run -e HOSTNAME=domain.com USERNAME=Your_Username PASSWORD=Your_Password AUTHTOKEN=Your_Token WPGraphQL.js`.