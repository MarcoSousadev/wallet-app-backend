# Wallet App API (Back-End)

## Intro

This is an API created using Node.js, Express and PG.
The main goal is create an application that controls user finances

## Requeriments
- Node.js
- Docker


## Steps to run the project

1. Clone the project

```
git clone https://github.com/MarcoSousadev/wallet-app-backend.git
``` 

2. Navigate to project folder and Install Dependencies
```

cd wallet-app-backend
npm install
```

3. Create an PG instance in docker

```
Example: run --name postgres-finances -e POSTGRES_PASSWORD=dkcer -e POSTGRES_USER=docker -p 5423:5432 -d -t postgres
```

4. Creat a .env file following the exemple: 

```
PORT=3000
You can use for database
DB_ULR=you_db_url

or 

DB_USER = docker
DB_PASSWORD = docker
DB_NAME = finances
DB_HOST = localhost
DB_PORT = 5432
```

5. Run config script to create database and tables:

```
npm run config:init
Observation: if don't stop press CTRL + C
```

6. Run the project in dev version:

```
npm run start:dev
```
7. Run the project in final version:

```
npm run start
```

## documentation:

Use insomnia to import the file below: 

```
https://github.com/MarcoSousadev/wallet-app-backend/blob/master/Insomnia.json
```