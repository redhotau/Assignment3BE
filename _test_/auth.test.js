const request = require("supertest");
const app = require("../app");
const { sequelize, User } = require("../models");

afterAll (async() => {
    await User.destroy({truncate: true, cascade:true}); //setelah melakukan test akan truncate table agar bisa insert data dgn user yang sama berulang2, dikarenakan column yang digunakan adalah unique constraint
    sequelize.close();                                  //setelah melakukan test akan menclose session db connection agar segera completed
});

describe("Authentication test", () => {
    it("It should be able to register", async () => {
    //TODO: register test logic
    const response = await request(app)
        .post("/register")
        .set("Content-Type", "application/json")
        .send({ email: "test@mail.com", password: "secrettest"});

    expect(response.statusCode).toBe(201);
    expect(response.body.email).toBe("test@mail.com");
    });

    it("It should be able to login", async() => {
        //TODO: login test
        const response = await request(app)
        .post("/login")
        .set("Content-Type", "application/json")
        .send({ email: "test@mail.com", password: "secrettest"});

        expect(response.statusCode).toBe(201);
        expect(response.body.token).toBeDefined();
    });

    it("It should not be able to login when email is invalid", async() => {
        //TODO: login test with wrong user
        const response = await request(app)
        .post("/login")
        .set("Content-Type", "application/json")
        .send({ email: "testlalala@mail.com", password: "secrettest"});

        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Unauthenticated");
        expect(response.body.message).toBe("Invalid email or password");
    });

    it("It should not be able to login when password is invalid", async() => {
        //TODO: login test with wrong password
        const response = await request(app)
        .post("/login")
        .set("Content-Type", "application/json")
        .send({ email: "test@mail.com", password: "secrettestlalala"});

        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Unauthenticated");
        expect(response.body.message).toBe("Invalid email or password");
    });
});
