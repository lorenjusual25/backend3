import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
describe("Docs API", () => {
    it("deberia responder con 200", async() => {
        const res = await request(app).get("/api/docs/")
        expect(res.status).to.equal(200)
    })
})