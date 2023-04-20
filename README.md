# node-ts-starter

A simple Nodejs starter project which uses typescrip &amp; express

## Scripts

1. Install dependencies

```
npm i
```

2. To build

```
npm run build
```

3. To run development

```
npm run start
```

4. To run production

```
npm run prod
```

5. To test

```
npm run test
```

6. To code format

```
npm run prettier
```

7. To check format

```
npm run prettier-check
```

8. For linting

```
npm run eslint
```

## Working Endpoint

http://localhost:3000/api/v0/feeds

## migration

It uses db-migrate & db-migrate-pg packages.

You must install db-migrate globally to use the commands.
Also you should create a database.json config file.

### Commands:

```
eg: db-migrate create feeds-table --sql-file
up: db-migrate up
down: db-migrate down
```

### sample database.json

```
{
  "defaultEnv": "development",
  "dev": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "your_db_name",
    "user": "user_name",
    "password": "db_password"
  }
}
```
