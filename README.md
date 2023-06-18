## About Task
Build an uptime monitoring RESTful API server that allows authenticated users to monitor URLs, and get detailed uptime reports about their availability, average response time, and total uptime/downtime.

## How to Run
First install packages `npm install`

run `npm start` to start the server


## About project

This project built from scratch except some parts like ping-monitor package  I forked it to cover this project features.


## Technologies used

- ExpressJs
- Porstgres SQL
- Knex
- Objectionjs
- Swagger
- jsonwebtoken
- jest
- ping monitor (my fork)
- Docker
  
## Enhancements
- use Type script
- use stacked error handling 
- log enough data
- use kubernetes for deployment in order to use auto scaling
- refactor it to divide monitoring operations on larage scale data
- add test loads
- add more unit testing and some feature testing
- Enable Horizontal scalling through tracking whether url is monitored or not

### Previous node projects
- My jwt implementation from scratch 
- Basic CRUD exploring 
- Next js and vue toturials

### Note !!!

Naming conventions isn't that good due to my little experience in node js and its best practices
