- create schema
- install package 
    - npm i express pg sequelize
    - npm init -y
- install sequelize
    - npm install --save-dev sequelize-cli
    - npx sequelize-cli init  
    - configure config.json of DB postgres project
- create database
    - npx sequelize db:create
- migrate db
    - npx sequelize-cli model:generate --name User --attributes email:string,password:string
    - npx sequelize-cli model:generate --name Todo --attributes task:string,UserId:integer
    - configure migration dir with constraint
    - npx sequelize db:migrate
- install test package
    - npm i -D jest
    - npm i -D supertest : to test http request
- create apps & tdd_test apps

Notes:
- configure db & migrate for test env  
    npx sequelize db:create --env test
    npx sequelize db:migrate --env test
- configure package.json @ script key param to 
- npm test


npm i jsonwebtoken
npm i dotenv
npm i bcrypt
npm test __test__/auth.test.js