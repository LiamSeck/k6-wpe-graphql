import { base_url, password, username, authToken } from "./config.js";
import http from "k6/http";
import { check } from 'k6';
import { sleep } from "k6";

let accessToken = `${authToken}`;

export const options = {
  // K6 bills in VUh 
  // (Maximum number of VUs x test execution duration in minutes) / 60 minutes = VUh
  // E.g (10 VUs x 5 mins)/60 = 0.83 VUh
  
  cloud: {
    // Project: WpGraphQL Load Testing
    projectID: 3720540,
    // Test runs with the same name groups test runs together.
    name: 'Load Testing of WPGraphQL',
    // Adding Load Zone so that traffic routes from amazon:gb:london over the default location
    distribution: {
      AWSLondon: { loadZone: 'amazon:gb:london', percent: 100 },
    },
  },
    // Adding thresholds for error rates and request duration  
    thresholds: {
      http_req_failed: ['rate<0.01'], // http errors should be less than 1%
      http_req_duration: ['p(95)<400'], // 95% of requests should be below 500ms
    },

    scenarios: {
      PostRequestToWPGraphQL: {
        executor: 'constant-vus',
        gracefulStop: '30s',
        // Duration 
        duration: '1m',
        // Number of Virtual Users
        vus: 1,
        exec: 'WPGraphQL',
        },  
      },
};

export function WPGraphQL() {
// List Post Titles Query
let query = `query ListPostTitles {
    posts(where: {}) {
      edges {
        node {
          id
          title
        }
      }
    }
  }`;

let headers = {
  // 'Authorization': `Bearer ${accessToken}`,
  "Content-Type": "application/json"
};
// Make POST request listing 
let res = http.post(`https://${base_url}/graphql`,
  JSON.stringify({ query: query }),
  {headers: headers}
);

if (res.status === 200) {
  console.log(JSON.stringify(res.body));
  let body = JSON.parse(res.body);
  let posts = body.data.posts.edges[0].node;
  console.log(posts.id, posts.title);

  // Create a new post as a logged in user 
  let mutation = `mutation CreateNewPost {
    login( input: {
    clientMutationId: "uniqueId",
    username: "${username}",
    password: "${password}"
  } ) {
    authToken
    user {
      id
      name
    }
  }
  createPost(
    input: {authorId: "3", content: "Test Post", title: "Creating Post using WPGraphQL Mutation via K6", excerpt: "Test Post", status: PUBLISH}
  ) {
    clientMutationId
  }
}`;
  // Make POST request with mutation query 
  res = http.post(`https://${base_url}/graphql`,
    JSON.stringify({query: mutation}),
    {headers: headers}
  );
  // Adding check for 200 response code
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}
// Added sleep for 0.3 seconds if required
// sleep(0.3);
}