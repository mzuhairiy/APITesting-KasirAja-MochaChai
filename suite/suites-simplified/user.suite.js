const request = require("supertest");
const { expect } = require("chai");
// const fs = require("fs");
// const jsonPath = 'D:/zuhair-sanbercode/js-automation/data/data-test/user.data.json'
const config = require("../../data/config.json");
const auth = require("../../data/data-test/auth.json");
const userData = require("../../data/data-test/user.data.json");

// Global var
let token;
let userId;
let name;

describe("User feature", () => {
    const response = request(config.baseUrlKA).post("/authentications").send(auth);
    it("should get a token", async() => {
        token = (await response).body.data.accessToken;
    });

    it("should create a new user", async() => {
        const response = request(config.baseUrlKA).post("/users").send(userData).set("Authorization", `Bearer ${token}`);
        // console.log((await response).status);
        // console.log((await response).body);
        userId = (await response).body.data.userId;
        expect((await response).status).to.eql(201);
        expect((await response).body.message).to.eql("User berhasil ditambahkan");
    });

    it("should get a user", async() => {
        const response = request(config.baseUrlKA).get(`/users/${userId}`).send(userData).set("Authorization", `Bearer ${token}`);
        //console.log((await response).status);
        //console.log((await response).body);
        expect((await response).status).to.eql(200);
        expect((await response).body.data.user.id).to.eql(userId);
        expect((await response).body.data.user.name).to.be.a('string').and.to.have.lengthOf.at.least(1, "value should not be empty!")
    });

    it("should update a user", async() => {
        const payload = { "name": "kasir baru", "email": "qwerty@exx.com" }
        const response = request(config.baseUrlKA).put(`/users/${userId}`).send(payload).set("Authorization", `Bearer ${token}`);
        name = (await response).body.data.name;
        // const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        // const name = await response.body.data.name;
        // jsonData.data.name = name;
        // fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2))

        expect((await response).status).to.eql(200);
        expect((await response).body.data.name).to.eql(name);
        expect((await response).body.data.name).to.be.a('string').and.to.have.lengthOf.at.least(1, "value should not be empty!")
    });

    it("should delete a user", async() => {
        const response = request(config.baseUrlKA).del(`/users/${userId}`).set("Authorization", `Bearer ${token}`);
        // console.log((await response).status);
        // console.log((await response).body);

        expect((await response).body.message).to.eql("User berhasil dihapus");
    });
});
