# TV-Front

## Requirements

* [Node.js](https://nodejs.org/)
* [yarn](https://yarnpkg.com/)

## Installation

```
git clone git@github.com:ungdev/gala-tv-front.git
# or
git clone https://github.com/ungdev/gala-tv-front.git

cd gala-tv-front
yarn
```

## Configuration

```
# copy env file for all environments
cp .env.example .env
# makes your changes in .env.local, which will not be pushed
nano .env

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
