const request = require("supertest");
const app = require("../app");
const { Todo, User, sequelize } = require("../models");
const { sign } = require('jsonwebtoken');

//data preparation
//before execute test, create dummy data (user, token & task) to do query all & find task by id
let token;
let todos;
beforeAll(async () => {
    try {
      // create user & get dummy token 
      const user = await User.create({
        email: "test@mail.com",
        password: "rahasia",
      });
    //   token = user.generateToken();   //generate dummy token
      const payload = {id: user.id, email: user.email}; //init payload
      token = sign(payload, process.env.JWT_SECRET);    //generate token
  
      todos = await Todo.bulkCreate([                   //bulkCreate utk memasukan data dummy sekaligus
        { task: "Belajar nodejs", UserId: user.id },
        { task: "Belajar react", UserId: user.id },
      ]);
    } catch (error) {
      console.log(error);
    }
  });

//after test executed truncate table & reset serial id
afterAll(async () => {                      
    await Todo.destroy({ truncate: true });
    await User.destroy({ truncate: true, cascade: true });
    await sequelize.close();
});

//===TODO logic ====
describe("Todos resource", () => {
    it("Should not be able to get all todos when token is not provided", async () => {
        const response = await request(app)
          .get("/todos")
          .set("Content-Type", "application/json");
    
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Unauthenticated");
    });

    it("Should be able to get all todos", async () => {
        const response = await request(app)
          .get("/todos")
          .set("Content-Type", "application/json")
          .auth(token, { type: "bearer" });
    
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
      });
    
    it("Should be able to get single todo", async () => {
      const response = await request(app)
        .get(`/todos/${todos[0].id}`)
        .set("Content-Type", "application/json")
        .auth(token, { type: "bearer" });
  
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBeDefined();
      expect(response.body.task).toBeDefined();
      expect(response.body.UserId).toBeDefined();
      expect(response.body.createdAt).toBeDefined();
      expect(response.body.updatedAt).toBeDefined();
    });

  it("Should not be able to get single todo when id is invalid", async () => {
    const response = await request(app)
      .get(`/todos/5656`)
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({             //toEqual -> seharusnya mengeluarkan response
      error: "NotfoundError",
      message: "Todo is not found",
    });
  });
 });