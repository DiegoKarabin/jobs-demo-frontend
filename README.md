## Description
Jobs portal App.

Assessment required by Soluciones JM

### Author
Diego Karabin

## Recommended node version
20.10.0

## Installation

```bash
$ npm install
```
## Running the app

First configure the backend API url in the file `next.config.js`
```js
// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: 'your API URL here'
  }
}

module.exports = nextConfig

```

Then you can run one of the following commands:


```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3001](http://localhost:3000) with your browser to see the result.


## Project hosted for tests at
https://jobs-demo-frontend.vercel.app/
