# This is Mini eCommerce API, Built using AdonisJs version 5, for the full documentation on how to use this API visit the documentation page below

## [Documentation page, Click here](https://documenter.getpostman.com/view/12234489/UVJcnHCT)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Mini eCommerce API is a crud API that has the following features.

## Features

- **User Authenication**
- **Perform Category CRUD**
- **Perform Sub Category CRUD**
- **Perform Product CRUD**

## Technologies

This Mini eCommerce API was built with the following Technologies:

- **[NodeJs](https://nodejs.org/en/) - Nodejs is a JavaScript runtime built on Chrome's V8 JavaScript engine.**
- **[AdonisJs](https://adonisjs.com/) - A fully featured web framework for Node.js!**
- **[TypeScript](https://www.typescriptlang.org/) - TypeScript is JavaScript with syntax for types.**
- **[PostgreSQL](https://www.postgresql.org/) - PostgreSQL is a powerful, open source object-relational database system.**
- **[Postman](https://www.postman.com/) - Postman is an API platform for building and using APIs.**

## Installation

This API requires [Node.js](https://nodejs.org/) v12+ to run.
You need git install on your PC
Install the dependencies and devDependencies and start the server.

### Run the following command on your

```sh
git clone git@github.com:OfficialOzioma/ecommerce-api.git
```
```sh
cd ecommerce-api
```
```sh
npm install
```
```sh
node ace migration:run
```
```sh
node ace serve --watch
```

## API End points

For a complete documentation of this API visit the documentation page. **[Click here](https://documenter.getpostman.com/view/12234489/UVJcnHCT)**

> ### Note: `category and sub category` is required for for creating a product

table
| Details                | Method | API End points            |
| ---------------------- | ------ | ------------------------- |
| Register               | POST   | [api/register](#)         |
| Login                  | POST   | [api/login](#)            |
| Create Category        | POST   | [api/category](#)         |
| Get All Categories     | GET    | [api/category](#)         |
| Find a category        | GET    | [api/category/:id](#)     |
| Update a Category      | PUT    | [api/category/:id](#)     |
| Delete a Category      | DELETE | [api/category/:id](#)     |
| Create Sub Category    | POST   | [api/sub-category/](#)    |
| Get all Sub Categories | GET    | [api/sub-category/](#)    |
| Find a Sub category    | GET    | [api/sub-category/:id](#) |
| Update a Sub Category  | PUT    | [api/sub-category/:id](#) |
| Delete a Sub Category  | DELETE | [api/sub-category/:id](#) |
| Create Product         | POST   | [api/product](#)          |
| Get all Product        | GET    | [api/product](#)          |
| Find a Product         | GET    | [api/product/:id](#)      |
| Update a Product       | PUT    | [api/product/:id](#)      |
| Delete a Product       | DELETE | [api/product/:id](#)      |

## License

MIT
