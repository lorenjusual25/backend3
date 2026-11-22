import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
import { USER_ROLES } from "../src/constants/user.constants.js";
describe("Order API", () => {
    let customerId; 
    it("deberia crear un customer", async () => {
        const res = await request(app).post("/api/users").send({
            firstName: "Nombre",
            lastName: "Apellido",
            email: "test1@example.com",
            password: "123",
            role: USER_ROLES.CUSTOMER
        })
        expect(res.status).to.equal(200)
        expect(res.body.payload).to.have.property("_id")
        customerId = res.body.payload._id
    })
    it("deberia crear un order", async () => {
        const res = await request(app).post("/api/orders").send({
            customer: customerId,
            items: [
                {
                    name: "Producto",
                    quantity: 2,
                    price: 100
                }
            ],
            deliveryAddress: "calle 123"
        })
        expect(res.status).to.equal(200)
        expect(res.body.payload.declaredValue).to.equal(200)
    })
    it("deberia obtener un order", async () => {

    })
    it("deberia actualizar un order", async () => {

    })
})