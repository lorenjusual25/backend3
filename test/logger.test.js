import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
describe("Logger API", () => {
    it("deberia responder con 200", async() => {
        const res = await request(app).get("/api/logger-test")
        expect(res.status).to.equal(200)
        expect(res.body.status).to.equal("success")
        expect(res.body.message).to.equal("Logs de prueba generados")
    })
})