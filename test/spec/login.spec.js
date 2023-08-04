const request = require("supertest");
const { expect } = require("chai");

describe('Login Feature', () => {
    it('Success Login', async () => {
        const response = await request("https://kasir-api.belajarqa.com")
        .post("/authentications")
        .send({
            "email": "next@ex.com",
            "password": "123@ad",
        })
        // console.log((await response).status);
        // console.log((await response).body);

        //ASSERTION
        expect((await response).status).to.equal(201);
        expect((await response).body.message).to.equal('Authentication berhasil ditambahkan');
    });

    it('Failed Login', async () => {
        const response = await request("https://kasir-api.belajarqa.com")
        .post("/authentications")
        .send({
            "email": "next@ex.com",
            "password": "123@asd",
        })
        // console.log((await response).status);
        // console.log((await response).body);

        //ASSERTION
        expect((await response).status).to.equal(401);
        expect((await response).body.message).to.equal('Kredensial yang Anda berikan salah');
    })
})  
