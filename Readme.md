# Smart Gas

## Table of Contents

- [Install](#install)
- [Introduction](#introduction)
- [API](#api)
- [Contributing](#contributing)
- [SecurityVulnerabilities](#security-vulnerabilities)



## Install
Smart Gas is a server which allows gas retailers to manage their sales and customers to order gas using a digital platform.  

Before downloading and running this server, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 8.* or higher is required as well as [mysql server](https://dev.mysql.com/downloads/).

Installation is done by first using the `npm clone` command to get the repo then copying the contents of db.sql and creating the database 

```sh
$ git clone https://github.com/efenstakes/smart-gas
$ cd smart-gas
$ npm install
$ npm start
```


## Introduction 
Smart Gas is a server which allows gas retailers to manage their sales and customers to order gas using a digital platform. 


## API
The server runs on port 4444 and follows REST API best practices. 
 

## Contributing
Contributions to the server are welcome. Contributions are accepted using GitHub pull requests. If you're not familiar with making GitHub pull requests, please refer to the GitHub documentation "Creating a pull request".

For a good pull request, we ask you provide the following:

* Try to include a clear description of your pull request in the description. It should include the basic "what" and "why"s for the request.  

* Follow the same code formatting model used in the existing code base


# Security Vulnerabilities
If you discover a security vulnerability within Laravel, please send an e-mail to Efen via efenstakes101@gmail.com. All security vulnerabilities will be promptly addressed.

