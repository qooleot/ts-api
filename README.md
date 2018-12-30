# TS-API

APIs in NodeJS should have a single source of truth for api specs between code and docs, as well as compile time type safety.  Schemas are often duplicated between json schemas for input validation, typescript types, jsdoc comment annotations or  swagger-specific wrappers in your app.  Routes and response status codes also suffer from similar issues where code can get out of sync with documentation.

TS-API solves this by leveraging the typescript parser to generate:

* OpenAPI (Swagger) docs
* Runtime type checks with Json schemas
* ExpressJS routes to be mounted
* Optional correctness verification of status code <-> result type mapping

## Concepts

### Type conversion

TypeScript types are extracted from the source code, such as this example:

```javascript
export interface Account {
    name: string;
    isActive?: boolean;
}
```

and converted to a json schema:

```json
  "Account": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string"
      },
      "isActive": {
        "type": "boolean"
      }
    },
    "required": [
      "name"
    ]
  }
```

### Route Generation

```javascript
@controller('/acount')
export class Account extends ControllerBase {

  @get('/')
  async listAccounts(): Promise<Acccount[]> {
  ...
  return [{ ... }, ...]
  }
```

The controller and Rest verbs (get, post, put, etc.) optionally take a route override, otherwise it uses the class or method name by default.

A router tree is build from all controllers in the typescript path:

```javascript
AccountRouter.get('/', async(req,res,next) => { ... }
```

You can mount this anywhere in your app, use middleware, and treat it like any other ExpressJS router.  The controller gives full access to req/res/next in the constructor.  There's further customizations support, such as hooks to customize input validation, but by default it returns a `400` status.

### OpenAPI (Swagger) docs


```javascript
import { ControllerBase, get, controller } from 'ts-api';

@controller('/acount')
export class Download extends ControllerBase {

  @get('/')
  async listAccounts(accountId: string): Promise<IAcccount[]> {
    return [{ id: 1, name: 'foo' }]
  }

  @get('/:accountId')
  async getAccount(accountId: string): Promise<IAcccount> {
    return { id: 1, name: 'foo' }
  }
  
  @post('/')
  async createAccount(accountId: string): Promise<IAcccount> {
    return { id: 1, name: 'foo' }
  }
}  
```

## Install
    npm install --save-dev ts-api

This will install a program `cg` that can be invoked later to generate source files to enable
the above features. 

## Usage

### Inclue ts-api package in a project

First make this package a dependency.  This will provide the necessary decorators *@controller*,
*@router* *@get* *@post*, etc.  The analyzer will search for those names and generate code that
uses them, but these decorators also do things themselves like invoke the runtime type checker.

### Create appropriately annotated classes and methods.

### Import the router and use in your app

### Run cg

    cg <options> <list of files>
