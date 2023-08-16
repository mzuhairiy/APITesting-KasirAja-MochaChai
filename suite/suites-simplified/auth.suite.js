const request = require("supertest");
const { expect } = require("chai");
const fs = require("fs");
const jsonPath = 'D:/zuhair-sanbercode/js-automation/data/data-test/user.data.json'
const config = require("../../data/config.json");
const auth = require("../../data/data-test/auth.json");
const userData = require("../../data/data-test/user.data.json");

// Global var
let email;
let token;
let userId;

describe("Authentication feature", () => {
        const response = request(config.baseUrlKA).post("/registration").send(userData);
        it("should get status and body response", async() => {
            email = (await response).body.data.email;
        });

        it("should get 201 status", async() => {
            expect((await response).status).to.eql(201);
        });

        it("should get 'Toko berhasil didaftarkan' message and valid feedback", async() => {
            expect((await response).body.status).to.eql("success");
            expect((await response).body.message).to.eql("Toko berhasil didaftarkan");
            expect((await response).body.data.name).to.be.a('string').and.to.have.lengthOf.at.least(1, "value should not be empty!")
            expect((await response).body.data.email).to.be.a('string').and.to.have.lengthOf.at.least(1, "value should not be empty!")
        });

        it("should get the same email and name values as user.data.json -Data Driven Testing-", async() => {
            const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
            expect((await response).body.data.name).to.eql(jsonData.name);
            expect((await response).body.data.email).to.eql(jsonData.email);
        });

        it("should success login and get token", async() => {
            const response = request(config.baseUrlKA).post("/authentications").send(auth);
            token = (await response).body.data.accessToken;
            userId = (await response).body.data.user.id;
            expect((await response).status).to.eql(201);
            expect((await response).body.message).to.eql("Authentication berhasil ditambahkan");
            expect((await response).body.data.user.name).to.be.a('string').and.to.have.lengthOf.at.least(1, "value should not be empty!")
        });
});