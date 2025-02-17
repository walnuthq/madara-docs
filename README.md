# Madara documentation contents

This repository contains material used to generate the [Madara documentation](https://docs.madara.build) website.

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Overview

Madara is an official implementation of the [SN Stack](https://www.starknet.io/sn-stack/). It allows anyone to start a new appchain that settles either to Ethereum or to Starknet.

The documentation is still under development: new sections get added all the time and existing ones get appended to.

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

The main branch of the repository is automatically deployed to [docs.madara.build](https://docs.madara.build/). Additionally, previews are deployed automatically for all PRs, allowing you to review changes before they are merged.

## Updating search index

The search bar utilizes a local search index with [a plugin ](https://github.com/praveenn77/docusaurus-lunr-search).

Whenever needed, the index can be manually updated by: `npm run build`. To see the changes in local development, use `npm run serve`.

## 🤝 Contributions

Contributions from the community are warmly welcomed!

If you find an issue with the documentation, please open an issue in the [repo](https://github.com/walnuthq/madara-docs). You are also welcome to open a PR to fix any found issues.
