import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
import { orderFixture } from "./helpers/orderFixture.js";
describe("Order API", () => {
    it("deberia crear un order", async () => {
        const order = await orderFixture()
        const res = await request(app).post("/api/orders").send(order)
        expect(res.status).to.equal(200)
        expect(res.body.payload.customer).to.exist
        expect(res.body.payload.customer).to.be.a("string")
        expect(res.body.payload.declaredValue).to.equal(200)
        expect(res.body.payload.shippingCost).to.equal(20)
        expect(res.body.payload.total).to.equal(220)
        expect(res.body.payload.items).to.have.lengthOf(1)
        expect(res.body.payload.items[0].name).to.equal("Producto")
        expect(res.body.payload.items[0].quantity).to.equal(2)
        expect(res.body.payload.items[0].price).to.equal(100)
        expect(res.body.payload.deliveryAddress).to.equal("Calle 123")
    })
    it("deberia obtener un order", async () => {
        const order = await orderFixture()
        const created = await request(app).post("/api/orders").send(order)
        expect(created.status).to.equal(200)
        const id = created.body.payload._id
        const res = await request(app).get(`/api/orders/${id}`)
        expect(res.status).to.equal(200)
        expect(res.body.payload._id).to.equal(id)
        expect(res.body.payload.customer).to.exist
        expect(res.body.payload.customer._id).to.be.a("string")
        expect(res.body.payload.declaredValue).to.equal(200)
        expect(res.body.payload.shippingCost).to.equal(20)
        expect(res.body.payload.total).to.equal(220)
        expect(res.body.payload.items).to.have.lengthOf(1)
        expect(res.body.payload.items[0].name).to.equal("Producto")
        expect(res.body.payload.items[0].quantity).to.equal(2)
        expect(res.body.payload.items[0].price).to.equal(100)
        expect(res.body.payload.deliveryAddress).to.equal("Calle 123")
    })
    it("deberia actualizar un order", async () => {
        const order = await orderFixture()
        const created = await request(app).post("/api/orders").send(order)
        expect(created.status).to.equal(200)
        const id = created.body.payload._id
        const res = await request(app).put(`/api/orders/${id}`).send({
            deliveryAddress: "Calle 456"
        })
        expect(res.status).to.equal(200)
        expect(res.body.payload._id).to.equal(id)
        expect(res.body.payload.deliveryAddress).to.equal("Calle 456")
    })
    it("responde 400 si el id del pedido es invalido", async () => {
        const idInvalido = "abc123"
        const res = await request(app).get(`/api/orders/${idInvalido}`)
        expect(res.status).to.equal(400)
        expect(res.body.status).to.equal("error")
        expect(res.body.message).to.equal("ID invalido")
        expect(res.body.code).to.equal("ID_ERROR")
    })
    it("responde 400 si los datos son invalidos",async () => {
        const res = await request(app).post("/api/orders").send({
            customer: "",
            items: [],
            deliveryAddress: 123
        })
        expect(res.status).to.equal(400)
        expect(res.body.status).to.equal("error")
        expect(res.body.message).to.equal("Datos invalidos")
        expect(res.body.code).to.equal("VALIDATION_ERROR")
    })
    it("responde 404 si el pedido no existe", async () => {
        const id = "64b7f8f8f8f8f8f8f8f8f8f8"
        const res = await request(app).get(`/api/orders/${id}`)
        expect(res.status).to.equal(404)
        expect(res.body.status).to.equal("error")
        expect(res.body.message).to.equal("Orden no encontrada")
        expect(res.body.code).to.equal("ORDER_NOT_FOUND")
    })
})