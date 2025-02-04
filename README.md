# Madara documentation contents

This repository contains material used to generate the [Madara documentation](https://docs.madara.build) website.

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Overview

Madara is both a Starknet full node and an appchain (L3).

The documentation explains all of the functionality of Madara, both from full node perspective and appchain perspective. The documentation is still under development: new sections get added all the time and existing ones get appended to.

## Installation

```
npm i
```

## Local Development

```
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Deployment

Note that you will need push access to the [repository](https://github.com/walnuthq/madara-docs) to deploy to a live environment (dev or prod).

### To dev site

First create a [personal access token](https://github.com/settings/tokens). Either a fine-grained one (if you have access to create one for the repository) or a global one. The token needs access only to public repositories.

After that, you can deploy the site to a development site with:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

This will:
1. Build the site
1. Push the changes to GitHub branch `gh-pages`
1. Publish the generated contents to the development site at https://walnuthq.github.io/madara-docs

### To production

TODO

## Updating search index

The search bar utilizes a local search index with [a plugin ](https://github.com/praveenn77/docusaurus-lunr-search).

Whenever needed, the index can be manually updated by: `npm run build`. To see the changes in local development, use `npm run serve`.

## 🤝 Contributions

Contributions from the community are warmly welcomed!

If you find an issue with the documentation, please open an issue in the [repo](https://github.com/walnuthq/madara-docs). You are also welcome to open a PR to fix any found issues.