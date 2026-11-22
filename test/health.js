import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
describe("Health API", () => {
    it("deberia responder con 200", async() => {
        const res = await request(app).get("/api/health")
        expect(res.status).to.equal(200)
        expect(res.body.status).to.equal("ok")
        expect(res.body).to.have.property("timestamp")
    })
})