import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
import { userFixture } from "./helpers/userFixture.js";
describe("User API", () => {
    it("deberia recibir el listado de usuarios",async() => {
        const res = await request(app).get("/api/users")
        expect(res.status).to.equal(200)
        expect(res.body.status).to.equal("success")
        expect(res.body.payload).to.be.an("array")
    })
    it("deberia de crear un usuario", async() => {
        const user = userFixture()
        const res = await request(app).post("/api/users").send(user)
        expect(res.status).to.equal(200)
        expect(res.body.payload._id).to.exist
        expect(res.body.payload.firstName).to.equal(user.firstName)
        expect(res.body.payload.lastName).to.equal(user.lastName)
        expect(res.body.payload.email).to.equal(user.email)
    })
    it("deberia obtener un usuario", async() => {
        const user = userFixture()
        const created = await request(app).post("/api/users").send(user)
        expect(created.status).to.equal(200)
        const id = created.body.payload._id
        const res = await request(app).get(`/api/users/${id}`)
        expect(res.status).to.equal(200)
        expect(res.body.payload._id).to.equal(id)
        expect(res.body.payload.firstName).to.equal(user.firstName)
        expect(res.body.payload.lastName).to.equal(user.lastName)
        expect(res.body.payload.email).to.equal(user.email)
    })
    it("deberia actualizar un usuario", async() => {
        const user = userFixture()
        const created = await request(app).post("/api/users").send(user)
        expect(created.status).to.equal(200)
        const id = created.body.payload._id
        const res = await request(app).put(`/api/users/${id}`).send({
            firstName: "nombre actualizado"
        })
        expect(res.status).to.equal(200)
        expect(res.body.payload._id).to.equal(id)
        expect(res.body.payload.firstName).to.equal("nombre actualizado")
        expect(res.body.payload.lastName).to.equal(user.lastName)
        expect(res.body.payload.email).to.equal(user.email)
    })
    it("responde 400 si el rol es invalido", async() => {
        const user = userFixture()
        const created = await request(app).post("/api/users").send(user)
        expect(created.status).to.equal(200)
        const id = created.body.payload._id
        const res = await request(app).put(`/api/users/${id}`).send({
            role: "rol_invalido"
        })
        expect(res.status).to.equal(400)
        expect(res.body.status).equal("error")
        expect(res.body.message).equal("Rol inválido")
        expect(res.body.code).to.equal("INVALID_USER_ROLE")
    })
    it("responde 400 si faltan campos obligatorios",  async() => {
        const res = await request(app).post("/api/users").send({
            firstName: "nombre",
            lastName: "apellido"
        })
        expect(res.status).to.equal(400)
        expect(res.body.status).equal("error")
        expect(res.body.message).equal("Faltan campos requeridos")
        expect(res.body.code).to.equal("MISSING_REQUIRED_FIELDS")
    })
    it("responde 400 si el email ya existe", async() => {
        const user = userFixture()
        await request(app).post("/api/users").send(user)
        const res = await request(app).post("/api/users").send(user)
        expect(res.status).to.equal(400)
        expect(res.body.status).equal("error")
        expect(res.body.message).equal("El correo electrónico ya está en uso")
        expect(res.body.code).to.equal("EMAIL_EXISTS")
    })
    it("responde 400 si el rol es invalido",async() => {
        const user = userFixture()
        const res = await request(app).post("/api/users").send({
            ...user,
            role: "rol_invalido"
        })
        expect(res.status).to.equal(400)
        expect(res.body.status).equal("error")
        expect(res.body.message).equal("Rol inválido")
        expect(res.body.code).to.equal("INVALID_USER_ROLE")
    })
    it("responde 404 si el usuario no existe", async() => {
        const res = await request(app).get("/api/users/123456789012345678901234")
        expect(res.status).to.equal(404)
        expect(res.body.status).equal("error")
        expect(res.body.message).equal("Usuario no encontrado")
        expect(res.body.code).to.equal("USER_NOT_FOUND")
    })
})