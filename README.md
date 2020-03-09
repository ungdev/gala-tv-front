# TV-Front

## Requirements

* [Node.js](https://nodejs.org/)
* [yarn](https://yarnpkg.com/)

## Installation

```
git clone git@github.com:ungdev/TV-Front.git
# or
git clone https://github.com/ungdev/TV-Front.git

cd TV-Front
yarn
```

## Configuration

```
# copy env file for all environments
cp .env .env.local
# makes your changes in .env.local, which will not be pushed
nano .env.local

```

## Commands

```
yarn dev    # development server
yarn build  # build production assets
yarn start  # static server
yarn serve  # pm2 static server (load balancing)
yarn reload # pm2 hot reload
yarn lint   # prettier lint
```

## Structure
