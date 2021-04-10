<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## CRUD-App ChangeLog in timeline
20 march
- Created exception handlers
- Configured modules
- Added validationPipe
- Npm installed class-validator, class-transformer, mapped-types
- Installed docker compose

23 march
- Created new entity characteristics as a table
- Made relations of ManyToMany between products and characteristics
- Updated service file according to new table - characteristics
- Cascading Inserts 
- Added ids inside of each array item of Characteristics
- Added pagination
- Created transactions using

24 march
- Installed Swagger 
- Configured Swagger on main.ts file
- Configured nest-cli.json
- Updated updateProductDto, changed mapped-types to swagger
- Added ApiTag 

03 april
- Created product-rating encapsulation, created new product-rating module and service
- Added exports to products.module as ProductsService
- Created product_brands constants

06 april
- Learned Custom Providers:
  ○  Value Based,
  ○  Nonclassbased, 
  ○ Class Providers,
  ○ Factory,
  ○ Asynchronous,
- Created Dynamic Module
- Control Providers Scope - Transient, Request-Scoped -> Injection chain

- Installed Config module from @nestjs/config
- Created .env file and hid nonsecured data
- ConfigModule.forRoot tried some props configs
- Added .env schema validation
- Config Service
- Custom Configuration files

07 april
- Configuration namespaces and partial registration
- Async configure dynamic modules, asynchronous factories

08 april
- Binding validation pipes - global-scoped, controller-scoped, method-scoped, param-scoped
- Added Exception filters
- Added guards to routes, api_key validation
- Using metadata to build generic guards and  interceptors (setMetaData)
- Created own custom "Public" decorator
- Created and added Reflector

09 april
- Created module for common folder, especially for guards - that are using DI
- Created interceptor, made wrap-response interceptor
- Wrapped each response in to 'data'

10 april
- Handling timeout interceptors with help of RxJS
- Created Custom ParseInt pipe for validating non-integer route typo
- Added request logging middleware for routes
