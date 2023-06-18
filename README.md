## About Task
Build an uptime monitoring RESTful API server that allows authenticated users to monitor URLs, and get detailed uptime reports about their availability, average response time, and total uptime/downtime.

## What I did
I created a demo project ExpressJs and learnt the tools, after deciding what tools to work with after research of 1 day

I found ping-monitor package that covers a lot of monitoring process, I read the package code to make sure it works fine ( performance and design ) and provides me what I need

I had to fork this package due to that bug I found and fixing it would take many days.
I added missed features in my task.

Build the API project and refine it.

## How to Run
First install packages `npm i`

run `npm start` to start the server

don't forget to set value in `.env` see `.env.example`

run `npx knex migrate:latest` to migrate database tables

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

## Things I learned 

- Things I learnt in this project 
- Node JS 😁
- Swagger 
- cursor pagination implementation
- real use case of node js events and async feature
- Forking a real package and republishing it
- Reading node js code and understanding it
- Postgres JSONB type and its operators and how its - indexes work
- How node is different from php, Go lang other language


## Enhancements
- use Type script
- Use dependency injection & mocking
- use stacked error handling 
- log enough data
- use kubernetes for deployment in order to use auto scaling
- refactor it to divide monitoring operations on larage scale data
- add test loads
- add more unit testing and some feature testing
- Enable Horizontal scalling through tracking whether url is monitored or not
- use objection-authorize like packages for ACLs
- make functions more abstract

### Previous node projects
- My jwt implementation from scratch  2 years go
- Basic CRUD exploring 3 years ago
- Next js and vue toturials 3 years ago

### Note !!!

Naming conventions isn't that good due to my little experience in node js and its best practices
