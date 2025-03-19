# Digital University Admin Portal

The Admin Portal includes public facing content for Digital University and protected content for authenticated (signed in) users.

## Development

In order to develop locally, the easist approach is to run the Admin Portal locally, but point at the STAGING instance of the API, and point at the STAGING instance of our authentication server Keycloak. That is what this approach describes. It is possible to run the Admin Portal locally, pointing at a local version of the API, but that is not covered in these instructions. For more information read the CONTRIBUTING.md.

1. Configure the Admin Portal.

This repository should run, out of the box. If you need to override environment variables or add secret environment variables, add a file at the root level of the project named ".env.local". Get the correct settings from another developer if you do not already have them. Make sure you set the Keycloak information to the STAGING instance, and point the API at the STAGING instance for the API.

2. Start the Admin Portal in DEV mode.

`npm run dev`

You should now be able to view the Admin Portal at the following URL...

http://localhost:8080/admin

## Linting

`npm run lint`

## Testing

`npm run test`

## GQL Codegen

In our frontend project, we use GraphQL Code Generator to streamline our development process. The code generator scans for `gql()`-called template literals within our API hooks to dynamically build out TypeScript types based on the fields queried. This ensures type safety and autocompletion in our development environment, tailored to our specific GraphQL queries.

### Setting up the Environment for GQL Codegen

To begin, you'll need to set up a couple of environment variables in your `.env` file:

Your `.env` file should include the following lines. The BEARER_TOKEN is the authorization token required by the GraphQL API. You can obtain it by inspecting the network tab in your browser during an authenticated.

```
API_URL=your_graphql_api_endpoint
BEARER_TOKEN=your_bearer_token
```

### Running for GQL Codegen

With your environment variables set, run the following command to download the schema from your api endpoint and generate the necessary types:

```
npm run codegen
```

### Codegen Workflow

When creating a new feature, the typical workflow is as follows:

1. **Create the Hook**: Start by setting up the frontend API hook that will interact with your GraphQL backend.
2. **Define the Query**: Within the hook, you only need to write your GraphQL query inside the `gql` template literal. This defines what data you're requesting. (again, it isn't necessary to write the useQuery or useMutation code, the codegen only looks at the `gql()` calls.)
3. **Run Codegen**: Execute `npm run codegen` to generate the corresponding TypeScript types based on your query.
4. **Develop with Confidence; go team!**: Now, with up-to-date schema and TS types, you can develop your frontend with the assurance that you're working with the correct data structure.
