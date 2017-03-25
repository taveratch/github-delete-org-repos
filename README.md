### Remove specific repositories in organization
----

###### Requirements
- Node.js

###### How to use
```
$ npm install
$ npm run start
```

###### Settings
Change the settings in `/settings/settings.json`

- `token` : Github personal access token (https://github.com/settings/tokens).
- `repo` : Repository name (The repositories that start with `repo` will be deleted from organization).
- `organization` : Organization name.
- `api_url` : Github api url.
- `limit` : Number of repository per request (Default 1000).
