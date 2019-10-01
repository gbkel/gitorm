# gitorm

[![npm version](https://img.shields.io/npm/v/gitorm.svg?style=flat-square)](https://www.npmjs.org/package/gitorm)
[![install size](https://packagephobia.now.sh/badge?p=gitorm)](https://packagephobia.now.sh/result?p=gitorm)
[![CircleCI](https://circleci.com/gh/gbkel/gitorm/tree/master.svg?style=svg&circle-token=7bc6803f375b9f53b5dc1fd4e80739595caea83d)](https://circleci.com/gh/gbkel/gitorm/tree/master)

A simple ORM to use your Github Repositories as a Data Bucket with Node.js

## Features

- Make CRUD requests on files of your Github Repository
- Use your Github Repository as a Data Bucket

## Installing

```bash
$ npm install gitorm
```

## Getting started

#### gitorm(config)

To use Gitorm, you'll need to generate a token with repo scope on [Github Developer Settings](https://github.com/settings/tokens).

```js
// Creating a connection
import gitorm from 'gitorm'

const Gitorm = new gitorm({
	token: 'generated-token',
	repository: 'repo-name',
	owner: 'repo-owner'
})

await Gitorm.connect()
```
