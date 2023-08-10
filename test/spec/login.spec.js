const request = require("supertest");
const { expect } = require("chai");

const baseUrlKA = "https://kasir-api.belajarqa.com"

async function getToken(payload){
    const response = await request(baseUrlKA)
    .post("/authentications")
    .send(payload)
    return response
}

describe('Login Feature', () => {
    it('Success Login', async () => {
        const payload = {
            /* --This is Payload-- */
            "email": "next@ex.com",
            "password": "123@ad", 
        }
        const response = await getToken(payload)
        /* --This is Assertion-- */
        expect((await response).status).to.equal(201);
        expect((await response).body.message).to.equal('Authentication berhasil ditambahkan');
    })

    it('Failed Login', async () => {
        const payload = {
            "email": "next@ex.com",
            "password": "123@ads",
        }
        const response = await getToken(payload)
        /* --This is Assertion-- */
        expect((await response).status).to.equal(401);
        expect((await response).body.message).to.equal('Kredensial yang Anda berikan salah');
    })
})  
