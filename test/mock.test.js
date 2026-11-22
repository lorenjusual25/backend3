import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
import { randomUUID } from "node:crypto";
import User from "../src/models/user.model.js";
import { USER_ROLES } from "../src/constants/user.constants.js";
describe("Mock API", () => {
    it("deberia responder con 200 a generar usuarios de prueba sin insertarlos a la DB", async() => {
        const res = await request(app).get("/api/mocks/getMockUsers").query({cant:5})
        expect(res.status).to.equal(200)
        expect(res.body.status).to.equal("success")
        expect(res.body.message).to.equal("Usuarios simulados obtenidos")
        expect(res.body.payload).to.have.lengthOf(5)
    })
    it("deberia rechazar una cantidad negativa o invalida de mocks", async() => {
        const res = await request(app).get("/api/mocks/getMockUsers").query({cant:-1})
        expect(res.status).to.equal(400)
        expect(res.body.status).to.equal("error")
        expect(res.body.message).to.equal("Cantidad de mocks inválida")
        expect(res.body.code).to.equal("INVALID_MOCK_QUANTITY")
    })
    it("deberia rechazar una cantidad mayor al limite permitido", async() => {
        const res = await request(app).get("/api/mocks/getMockUsers").query({cant:200})
        expect(res.status).to.equal(400)
        expect(res.body.status).to.equal("error")
        expect(res.body.message).to.equal("Se alcanzó el máximo de mocks")
        expect(res.body.code).to.equal("MAX_MOCK_REACHED")
    })
    it("deberia insertar usuarios a la base de datos",async() => {
        const res = await request(app).post("/api/mocks/seed").send({
            users: 50
        })
        expect(res.status).to.equal(200)
        expect(res.body.status).to.equal("success")
        expect(res.body.message).to.equal("Datos simulados insertados")
    })
    it("deberia insertar ordenes, entregas y tiendas a la base de datos",async() => {
        //esto es para asegurar de que se generen los usuarios necesarios
        const crearUsuarios = role => ({
            firstName: "Nombre",
            lastName: "Apellido",
            email: `${randomUUID()}@example.com`,
            password: "123",
            role
        })
        await User.create([
            crearUsuarios(USER_ROLES.CUSTOMER),
            crearUsuarios(USER_ROLES.DRIVER),
            crearUsuarios(USER_ROLES.STORE)
        ])
        const res = await request(app).post("/api/mocks/seed").send({
            orders: 5,
            deliveries: 5,
            stores: 5
        })
        expect(res.status).to.equal(200)
        expect(res.body.status).to.equal("success")
        expect(res.body.message).to.equal("Datos simulados insertados")
    })
})