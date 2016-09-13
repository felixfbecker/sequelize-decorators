
# Sequelize + Decorators = ❤

[![Version](https://img.shields.io/npm/v/sequelize-decorators.svg?maxAge=2592000)](https://www.npmjs.com/package/sequelize-decorators)
[![Downloads](https://img.shields.io/npm/dt/sequelize-decorators.svg?maxAge=2592000)](https://www.npmjs.com/package/sequelize-decorators)
[![Build Status](https://travis-ci.org/felixfbecker/sequelize-decorators.svg?branch=master)](https://travis-ci.org/felixfbecker/sequelize-decorators)
[![codecov](https://codecov.io/gh/felixfbecker/sequelize-decorators/branch/master/graph/badge.svg)](https://codecov.io/gh/felixfbecker/sequelize-decorators)
[![Dependency Status](https://gemnasium.com/badges/github.com/felixfbecker/sequelize-decorators.svg)](https://gemnasium.com/github.com/felixfbecker/sequelize-decorators)
[![License](https://img.shields.io/npm/l/sql-template-strings.svg?maxAge=2592000)](https://github.com/felixfbecker/node-sql-template-strings/blob/master/LICENSE.txt)

A proof of concept for using Sequelize with decorators.

 - [Usage with TypeScript](#usage-with-typescript)
 - [Usage with Babel](#usage-with-babel)

## Usage with TypeScript

### Installation

```
typings install sequelize@4.0.0-1
npm install --save sequelize@4.0.0-1 sequelize-decorators
```

Add to your `tsconfig.json`:
```json
"experimentalDecorators": true,
"emitDecoratorMetadata": true
```
The second setting lets sequelize-decorators infer the type of attributes from the type declaration.

### Example:

```js
import {Sequelize, Model, DataTypes} from 'sequelize'
import {Options, Attribute} from 'sequelize-decorators'

const sequelize = new Sequelize(process.env.DB)

@Options({
    sequelize,
    tableName: 'users'
})
export class User extends Model {

    @Attribute({
        type: DataTypes.STRING,
        primaryKey: true
    })
    public username: string;

    @Attribute(DataTypes.STRING)
    public firstName: string;

    @Attribute() // Type is inferred as DataTypes.STRING
    public lastName: string;

    get fullName(): string {
        return this.firstName + ' ' + this.lastName;
    }

    set fullName(fullName: string) {
        const names = fullName.split(' ');
        this.lastName = names.pop();
        this.firstName = names.join(' ');
    }
}
```

The `@Options` decorator is required and must include the `sequelize` option (the connection to use).

### Type inference

 TypeScript type | Sequelize data type
-----------------|---------------------
 `string`        | `STRING`
 `number`        | `INTEGER`
 `Date`          | `DATE`
 `Buffer`        | `BLOB`


## Usage with Babel


### Installation

```
npm install --save sequelize@4.0.0-1 sequelize-decorators
npm install --save-dev babel-plugin-transform-decorators-legacy
```

Add to your `.babelrc`:
```json
"plugins": ["transform-decorators-legacy"]
```

### Example:

```js
import {Sequelize, Model, DataTypes} from 'sequelize'
import {Options, Attributes} from 'sequelize-decorators'

const sequelize = new Sequelize(process.env.DB)

@Options({
    sequelize,
    tableName: 'users'
})
@Attributes({
    username: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    lastName: DataTypes.STRING,
    firstName: DataTypes.STRING,
})
export class User extends Model {

    get fullName(): string {
        return this.firstName + ' ' + this.lastName;
    }

    set fullName(fullName: string) {
        const names = fullName.split(' ');
        this.lastName = names.pop();
        this.firstName = names.join(' ');
    }
}
```

The `@Options` decorator is required and must include the `sequelize` option (the connection to use).
